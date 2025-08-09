import React, { useState, useRef, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Image,
  TextInput,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {
  FONTS,
  FONT_SIZES,
  widthPercentageToDP,
  heightPercentageToDP,
  COLORS,
  CONSTANTS,
} from '@src/config/index';
import RenderIcon from '@src/components/icon';
import auth from '@react-native-firebase/auth';
import firestore ,{ getDoc } from '@react-native-firebase/firestore';
import useAuthStore from '@src/hooks/useAuthStore';
import Header from '@src/components/header';

// --- Custom MPIN Input Component ---
// This component now manages its own internal state and calls `onComplete` when all 6 digits are entered.
const MpinInput = ({ onComplete }) => {
  const [pin, setPin] = useState(['', '', '', '', '', '']);
  const inputs = useRef([]);

  const handleChange = (text, index) => {
    // Only allow numbers
    if (!/^\d*$/.test(text)) return;

    const newPin = [...pin];
    newPin[index] = text;
    setPin(newPin);

    // If a digit is entered, move to the next box
    if (text && index < 5) {
      inputs.current[index + 1].focus();
    }

    // If all digits are filled, call the onComplete callback
    if (newPin.every(digit => digit !== '')) {
      onComplete(newPin.join(''));
    }
  };

  const handleKeyPress = (e, index) => {
    // If backspace is pressed on an empty box, move to the previous box
    if (e.nativeEvent.key === 'Backspace' && pin[index] === '' && index > 0) {
      inputs.current[index - 1].focus();
    }
  };

  return (
    <View style={styles.mpinContainer}>
      {[0, 1, 2, 3, 4, 5].map(i => (
        <TextInput
          key={i}
          ref={ref => (inputs.current[i] = ref)}
          style={styles.mpinBox}
          value={pin[i]}
          onChangeText={text => handleChange(text, i)}
          onKeyPress={e => handleKeyPress(e, i)}
          keyboardType="number-pad"
          maxLength={1}
          returnKeyType="next"
          blurOnSubmit={false}
          // secureTextEntry // Usually OTPs are not secured, but you can enable if needed
        />
      ))}
    </View>
  );
};


const OTPScreen = ({
  route: {
    params: { mobileNumber:phone, otpSentResponse: initialOtpSentResponse },
  },
}) => {
  const { login } = useAuthStore();
  const navigation = useNavigation();

  // State for the OTP confirmation object, allowing it to be updated on resend
  const [otpSentResponse, setOtpSentResponse] = useState(initialOtpSentResponse);
  const [mpin, setMpin] = useState('');

  // State for the timer and resend functionality
  const [timer, setTimer] = useState(120);
  const [canResend, setCanResend] = useState(false);

  // Effect to handle the countdown timer
  useEffect(() => {
    const interval = setInterval(() => {
      setTimer(prevTimer => {
        if (prevTimer <= 1) {
          clearInterval(interval);
          setCanResend(true); // Enable the resend button
          return 0;
        }
        return prevTimer - 1;
      });
    }, 1000);

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, [canResend]); // Rerun the effect if the user resends the code

  // Function to handle resending the OTP
  const handleResendOTP = async () => {
    try {
      setCanResend(false); // Disable the button immediately
      // The `true` parameter forces a resend of the SMS
      const newConfirmation = await auth().signInWithPhoneNumber("+91"+phone, true);
      setOtpSentResponse(newConfirmation); // Update the confirmation object
      setTimer(120); // Reset the timer
      Alert.alert('Success', 'A new OTP has been sent to your phone.');
    } catch (error) {
      console.error('Error resending OTP:', error);
      Alert.alert('Error', 'Failed to resend OTP. Please try again later.');
      setCanResend(true); // Re-enable the button on failure
    }
  };

  // Function to confirm the code and log the user in
  // Function to confirm the code and log the user in
const handleVerifyOTP = async () => {
  if (!mpin || mpin.length !== 6) {
    Alert.alert('Invalid Input', 'Please enter the complete 6-digit OTP.');
    return;
  }

  try {
    // Step 1: Confirm the OTP with Firebase Auth
    const result = await otpSentResponse.confirm(mpin);
    const user = result.user;
    const __app_id = CONSTANTS.__app_id;

    // Step 2: Define Firestore document paths
    const userDocRef = firestore().doc(
      `artifacts/${__app_id}/users/${user.uid}/userData/userModel`,
    );
    const publicUserDocRef = firestore().doc(
      `artifacts/${__app_id}/public/data/users/${user.uid}`,
    );

    // Step 3: Check for and create user documents in Firestore
    const userDoc = await getDoc(userDocRef);

    console.log(userDoc)
    if (!userDoc._exists) {
      console.log(`Creating private user document for UID: ${user.uid}`);
      await userDocRef.set({
        name: '',
        email: '',
        mobile: phone,
        active: true,
        role: 'user',
        created_at: firestore.FieldValue.serverTimestamp(),
        updated_at: firestore.FieldValue.serverTimestamp(),
      });
    }

    const publicDoc = await getDoc(publicUserDocRef);
    if (!publicDoc._exists) {
      console.log(`Creating public user document for UID: ${user.uid}`);
      await publicUserDocRef.set({
        name: '',
        email: '',
        mobile: phone,
        active: true,
        userId: user.uid,
        updated_at: firestore.FieldValue.serverTimestamp(),
      });
    }

    // Step 4: Update the global state. This will automatically trigger the navigator to change screens.
    console.log("Login state updated. Navigator should now switch to MainApp.");
    // login(user, 'YOUR_TOKEN_HERE'); // Replace with actual token logic

  } catch (error) {
    // Step 5: Differentiate between Auth and Firestore errors for better debugging
    if (error.code && error.code.startsWith('auth/')) {
      // This is an authentication error (e.g., invalid code, session expired)
      console.error('Firebase Auth Error:', error);
      Alert.alert('Authentication Failed', 'The OTP you entered is invalid or has expired. Please try again.');
    } else {
      // This is likely a Firestore error (e.g., permission denied)
      console.error('Firestore Error:', error);
      Alert.alert('Error', 'Could not save your profile. Please check your Firestore security rules.');
    }
  }
};

  return (
    <SafeAreaView style={styles.root}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.theme} />
      <Header 
      isBack={true}
      title={"Verify OTP"}
      />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.mpinCard}>
          <Image
            source={{
              uri: 'https://t4.ftcdn.net/jpg/05/54/22/69/360_F_554226902_eaFqOYLyeTMXY1RLHcVi6psKYdkSv4cF.jpg',
            }}
            style={styles.mpinIllustration}
          />

          <Text style={styles.mpinLabel}>Enter the OTP sent to {phone}</Text>

          <MpinInput onComplete={setMpin} />

          <View style={styles.resendContainer}>
            {canResend ? (
              <TouchableOpacity onPress={handleResendOTP}>
                <Text style={styles.resendButtonText}>Resend OTP</Text>
              </TouchableOpacity>
            ) : (
              <Text style={styles.timerText}>Resend OTP in {timer}s</Text>
            )}
          </View>

          <TouchableOpacity style={styles.verifyButton} onPress={handleVerifyOTP}>
            <Text style={styles.verifyButtonText}>Verify</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: COLORS.secondary },
  scrollContainer: {
    flexGrow: 1,
  },
  mpinCard: {
    backgroundColor: COLORS.secondary,
    marginHorizontal: widthPercentageToDP('4%'),
    borderRadius: 25,
    paddingHorizontal: widthPercentageToDP('4%'),
    paddingVertical: heightPercentageToDP('3%'),
    alignItems: 'center',
  },
  mpinIllustration: {
    width: widthPercentageToDP('70%'),
    height: heightPercentageToDP('25%'),
    marginBottom: heightPercentageToDP('3%'),
  },
  mpinLabel: {
    fontFamily: FONTS.PoppinsSemiBold,
    fontSize: FONT_SIZES.body,
    color: COLORS.text,
    marginBottom: heightPercentageToDP('2%'),
    textAlign: 'center',
  },
  mpinContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: heightPercentageToDP('2%'),
    gap:6
  },
  mpinBox: {
    width: widthPercentageToDP('13%'),
    height: widthPercentageToDP('13%'),
    borderWidth: 1,
    borderColor: COLORS.textSecondary,
    borderRadius: 15,
    textAlign: 'center',
    fontSize: FONT_SIZES.title,
    fontFamily: FONTS.PoppinsBold,
    color: COLORS.text,
  },
  verifyButton: {
    backgroundColor: COLORS.theme,
    borderRadius: 15,
    paddingVertical: heightPercentageToDP('2%'),
    alignItems: 'center',
    width: '100%',
    marginTop: heightPercentageToDP('2%'),
  },
  verifyButtonText: {
    color: COLORS.textLight,
    fontFamily: FONTS.PoppinsBold,
    fontSize: FONT_SIZES.body,
  },
  loginHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.theme,
    height: heightPercentageToDP('12%'),
    borderBottomLeftRadius: widthPercentageToDP('15%'),
    borderBottomRightRadius: widthPercentageToDP('15%'),
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    paddingHorizontal: widthPercentageToDP('5%'),
  },
  loginHeaderText: {
    color: COLORS.textLight,
    fontSize: FONT_SIZES.subtitle,
    fontFamily: FONTS.PoppinsBold,
    textAlign: 'center',
    flex: 1, // Allows text to center itself properly
    marginRight: widthPercentageToDP('12%'), // Offset for the back button space
  },
  resendContainer: {
    marginTop: heightPercentageToDP('2%'),
    height: 20, // Reserve space to prevent layout shift
    alignItems: 'center',
    justifyContent: 'center',
  },
  timerText: {
    fontFamily: FONTS.PoppinsRegular,
    fontSize: FONT_SIZES.small,
    color: COLORS.textSecondary,
  },
  resendButtonText: {
    fontFamily: FONTS.PoppinsSemiBold,
    fontSize: FONT_SIZES.small,
    color: COLORS.theme,
  },
});

export default OTPScreen;
