import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Image,
  Modal,
  Dimensions
} from 'react-native';
// --- MOCK: In your project, you would import these from your actual files ---
import {FONTS, FONT_SIZES, SCREEN_HEIGHT, SCREEN_WIDTH, widthPercentageToDP, heightPercentageToDP, COLORS} from '@src/config/index'
import useAuthStore from '@src/hooks/useAuthStore';
import { useTranslation } from 'react-i18next';
import useLanguageStore from '@src/hooks/useLanguageStore';

// NOTE: Firebase imports are commented out as they can't run in this environment, but they are correct for your project.
import { signInWithPhoneNumber, getAuth } from '@react-native-firebase/auth';
// import firestore from '@react-native-firebase/firestore';
// --- END MOCK ---

const MOCK_USER = {
  name: 'Sanjay Kumar',
  totalInvestment: 150000.0,
  totalGoldGrams: 20.68,
};



// A simple custom modal to replace Alert.alert
const CustomAlert = ({ visible, title, message, onClose }) => (
  <Modal
    transparent={true}
    animationType="fade"
    visible={visible}
    onRequestClose={onClose}
  >
    <View style={alertStyles.centeredView}>
      <View style={alertStyles.modalView}>
        <Text style={alertStyles.modalTitle}>{title}</Text>
        <Text style={alertStyles.modalText}>{message}</Text>
        <TouchableOpacity
          style={alertStyles.button}
          onPress={onClose}
        >
          <Text style={alertStyles.buttonText}>OK</Text>
        </TouchableOpacity>
      </View>
    </View>
  </Modal>
);


const LoginScreen = ({ navigation }) => {
  const [mobileNumber, setMobileNumber] = useState('');
  const { t, i18n } = useTranslation(); // In your app, use the real useTranslation()
  const { login } = useAuthStore();
  const { language, setLanguage } = useLanguageStore();

  const [alertInfo, setAlertInfo] = useState({ visible: false, title: '', message: '' });

  const showAlert = (title, message) => {
    setAlertInfo({ visible: true, title, message });
  };

  const handleLogin = () => {
    if (mobileNumber.length !== 10) {
      showAlert(t('invalidInputTitle'), t('invalidInputMessage'));
      return;
    }
    console.log('Login attempt with:', mobileNumber);
    login(MOCK_USER, "some_mock_token"); 
    navigation.replace('MainApp');
  };

  const handleOTPLogin = async () => {
    if (mobileNumber.length !== 10) {
      showAlert(t('invalidInputTitle'), t('invalidInputMessage'));
      return;
    }
    try {
      console.log('Attempting to send OTP to +91' + mobileNumber);
      // In your real app, the Firebase logic would be here
      const authInstance = getAuth();
      const otpSentResponse = await signInWithPhoneNumber(authInstance, '+91' + mobileNumber);
      if (otpSentResponse) {
        navigation.navigate('OTPScreen', { otpSentResponse,mobileNumber });
      } else {
        showAlert(t('otpFailedTitle'), 'Failed to send OTP. Please try again.');
      }
      console.log("Simulating OTP sent successfully.");
      // Simulating navigation for demo
      // navigation.navigate('OTPScreen', { otpSentResponse: { verificationId: 'mock_verification_id' } });

    } catch (error) {
      console.log('Error in handleOTPLogin:', error);
      showAlert(t('otpFailedTitle'), error.message);
    }
  };

  const isTamil = language === 'ta';
  const styles = getStyles(isTamil);

  return (
    <SafeAreaView style={styles.loginRoot}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.theme} />
      
      <CustomAlert 
        visible={alertInfo.visible}
        title={alertInfo.title}
        message={alertInfo.message}
        onClose={() => setAlertInfo({ visible: false, title: '', message: '' })}
      />

      <View style={styles.loginHeader}>
        <Image
          source={{ uri: 'https://subraa.com/there/wp-content/uploads/2020/01/logo.png' }}
          style={styles.logo}
          resizeMode="contain"
          onError={(e) => console.log(e.nativeEvent.error)}
        />
        <Text style={styles.loginHeaderText}>{t('saveGoldWithUs')}</Text>
      </View>

      <ScrollView style={styles.loginScrollView} keyboardShouldPersistTaps="handled">
        <View style={styles.loginContainer}>
          <Text style={styles.loginTitle}>{t('signIn')}</Text>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>{t('mobileNumber')}</Text>
            <TextInput
              style={styles.input}
              placeholder={t('enterMobileNumber')}
              placeholderTextColor={COLORS.textSecondary}
              keyboardType="phone-pad"
              maxLength={10}
              value={mobileNumber}
              onChangeText={setMobileNumber}
            />
          </View>
          <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
            <Text style={styles.loginButtonText}>{t('login')}</Text>
          </TouchableOpacity>
          <Text style={styles.orText}>{t('or')}</Text>
          <TouchableOpacity style={[styles.loginButton, styles.otpButton]} onPress={handleOTPLogin}>
            <Text style={styles.otpButtonText}>{t('loginWithOtp')}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => console.log('Navigate to ChangeMpin')}>
            <Text style={styles.forgotPasswordText}>{t('forgotMpin')}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <View style={styles.signUpContainer}>
        <Text style={styles.signUpText}>{t('dontHaveAccount')}</Text>
        <TouchableOpacity>
          <Text style={[styles.signUpText, { color: COLORS.theme, fontFamily: isTamil ? FONTS.NotoSansTamilMedium : FONTS.PoppinsMedium }]}>{t('signUp')}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

// --- Styles ---
const getStyles = (isTamil) => {
    // Define base font styles dynamically
    const fontRegular = { fontFamily: isTamil ? FONTS.NotoSansTamilRegular : FONTS.PoppinsRegular };
    const fontMedium = { fontFamily: isTamil ? FONTS.NotoSansTamilMedium : FONTS.PoppinsMedium };
    const fontBold = { fontFamily: isTamil ? FONTS.NotoSansTamilBold : FONTS.PoppinsBold };

    return StyleSheet.create({
        loginRoot: { flex: 1, backgroundColor: COLORS.secondary },
        loginScrollView: { flex: 1 },
        loginHeader: {
            backgroundColor: COLORS.theme,
            height: heightPercentageToDP('25%'),
            justifyContent: 'center',
            alignItems: 'center',
            borderBottomLeftRadius: widthPercentageToDP('15%'),
            borderBottomRightRadius: widthPercentageToDP('15%'),
            paddingTop: heightPercentageToDP('2%'),
        },
        logo: {
            width: widthPercentageToDP('40%'),
            height: widthPercentageToDP('20%'),
            marginBottom: heightPercentageToDP('1%'),
        },
        loginHeaderText: {
            color: COLORS.textLight,
            fontSize: FONT_SIZES.subtitle,
            ...fontBold,
        },
        langSwitcherContainer: {
            flexDirection: 'row',
            justifyContent: 'center',
            paddingVertical: 10,
            backgroundColor: COLORS.primary,
        },
        langButton: {
            paddingHorizontal: 20,
            paddingVertical: 8,
            marginHorizontal: 5,
            borderRadius: 20,
            borderWidth: 1,
            borderColor: COLORS.theme,
        },
        langButtonActive: {
            backgroundColor: COLORS.theme,
        },
        langButtonText: {
            fontSize: 14,
            color: COLORS.theme,
            ...fontMedium,
        },
        loginContainer: {
            flex: 1,
            justifyContent: 'flex-start',
            paddingHorizontal: widthPercentageToDP('8%'),
            paddingTop: heightPercentageToDP('3%'),
        },
        loginTitle: {
            fontSize: FONT_SIZES.title,
            color: COLORS.text,
            textAlign: 'center',
            marginBottom: heightPercentageToDP('3%'),
            ...fontBold,
        },
        inputGroup: {
            marginBottom: heightPercentageToDP('2%'),
        },
        label: {
            color: COLORS.textSecondary,
            fontSize: FONT_SIZES.caption,
            marginBottom: 5,
            ...fontRegular,
        },
        input: {
            backgroundColor: COLORS.primary,
            color: COLORS.text,
            paddingHorizontal: widthPercentageToDP('4%'),
            height: heightPercentageToDP('6.5%'),
            borderRadius: 10,
            fontSize: FONT_SIZES.body,
            borderWidth: 1,
            borderColor: '#ddd',
            ...fontRegular,
        },
        loginButton: {
            backgroundColor: COLORS.theme,
            paddingVertical: heightPercentageToDP('1.8%'),
            borderRadius: 10,
            alignItems: 'center',
            marginTop: heightPercentageToDP('1%'),
            elevation: 2,
        },
        otpButton: {
            backgroundColor: COLORS.secondary,
            borderWidth: 1,
            borderColor: COLORS.theme,
        },
        loginButtonText: {
            color: COLORS.textLight,
            fontSize: FONT_SIZES.body,
            ...fontMedium,
        },
        otpButtonText: {
            color: COLORS.theme,
            fontSize: FONT_SIZES.body,
            ...fontMedium,
        },
        orText: {
            textAlign: 'center',
            color: COLORS.textSecondary,
            marginVertical: heightPercentageToDP('2%'),
            fontSize: FONT_SIZES.body,
            ...fontRegular,
        },
        forgotPasswordText: {
            color: COLORS.theme,
            textAlign: 'center',
            marginTop: heightPercentageToDP('2%'),
            fontSize: FONT_SIZES.caption,
            ...fontMedium,
        },
        signUpContainer: {
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            paddingVertical: heightPercentageToDP('2%'),
            borderTopWidth: 1,
            borderTopColor: '#eee',
        },
        signUpText: {
            color: COLORS.textSecondary,
            fontSize: FONT_SIZES.body,
            ...fontRegular,
        },
    });
};

// Styles for the custom alert modal
const alertStyles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: COLORS.modalBackdrop,
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        width: '80%',
    },
    modalTitle: {
        marginBottom: 15,
        textAlign: "center",
        fontSize: 20,
        fontWeight: "bold",
        color: COLORS.textPrimary,
    },
    modalText: {
        marginBottom: 25,
        textAlign: "center",
        fontSize: 16,
        color: COLORS.textSecondary,
    },
    button: {
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 20,
        elevation: 2,
        backgroundColor: COLORS.theme,
        minWidth: 100,
        alignItems: 'center',
    },
    buttonText: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center",
        fontSize: 16,
    }
});

export default LoginScreen;
