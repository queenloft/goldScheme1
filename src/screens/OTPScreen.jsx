import React, { useState, useRef, useCallback } from 'react';
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
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {
  FONTS,
  FONT_SIZES,
  widthPercentageToDP,
  heightPercentageToDP,
  COLORS,
} from '@src/config/index';
import RenderIcon from '@src/components/icon';

const OTPScreen = () => {
  const navigation = useNavigation();
  const [mpin, setMpin] = useState(null);
  const [confirmMpin, setConfirmMpin] = useState(['', '', '', '']);
  // --- Custom MPIN Input Component ---
  const MpinInput = ({ setMpin }) => {
    const [pin, setPin] = useState(['', '', '', '']);
    const inputs = useRef([]);

    const handleChange = (text, index) => {
      if (!/^\d*$/.test(text)) return; // Only allow numbers

      const updatedPin = [...pin];
      updatedPin[index] = text;
      setPin(updatedPin);

      if (text && index < 3) {
        inputs.current[index + 1].focus();
      } else if (index == 3 && text) {
        setMpin(pin);
      }
    };

    const handleKeyPress = (e, index) => {
      if (e.nativeEvent.key === 'Backspace' && pin[index] === '') {
        if (index > 0) {
          inputs.current[index - 1].focus();
        }
      }
    };

    return (
      <View style={styles.mpinContainer}>
        {[0, 1, 2, 3].map(i => (
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
            secureTextEntry
          />
        ))}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.root}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.theme} />
      <View style={styles.loginHeader}>
        <RenderIcon
          name="arrow-left"
          color={COLORS.secondary}
          size={22}
          onPress={() => navigation.goBack()}
          style={{
            paddingLeft: 32,
          }}
        />
        <Text style={styles.loginHeaderText}>Verify OTP</Text>
      </View>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.mpinCard}>
          <Image
            source={{
              uri: 'https://t4.ftcdn.net/jpg/05/54/22/69/360_F_554226902_eaFqOYLyeTMXY1RLHcVi6psKYdkSv4cF.jpg',
            }}
            style={styles.mpinIllustration}
          />

          <Text style={styles.mpinLabel}>Enter OTP</Text>

          <MpinInput pin={mpin} setMpin={setMpin} />

          <TouchableOpacity style={styles.changeButton}>
            <Text style={styles.changeButtonText}>Verify</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: COLORS.secondary },
  mpinCard: {
    backgroundColor: COLORS.secondary,
    margin: widthPercentageToDP('4%'),
    borderRadius: 25,
    padding: widthPercentageToDP('6%'),
    alignItems: 'center',
  },
  mpinIllustration: {
    width: widthPercentageToDP('70%'),
    height: heightPercentageToDP('25%'),
    marginBottom: heightPercentageToDP('3%'),
  },
  mpinLabel: {
    fontFamily: FONTS.PoppinsSemiBold,
    fontSize: FONT_SIZES.subtitle,
    color: COLORS.text,
    marginBottom: heightPercentageToDP('2%'),
  },
  mpinContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: heightPercentageToDP('3%'),
  },
  mpinBox: {
    width: widthPercentageToDP('16%'),
    height: widthPercentageToDP('16%'),
    borderWidth: 1,
    borderColor: COLORS.textSecondary,
    borderRadius: 15,
    textAlign: 'center',
    fontSize: FONT_SIZES.title,
    fontFamily: FONTS.PoppinsBold,
    color: COLORS.text,
  },
  changeButton: {
    backgroundColor: COLORS.theme,
    borderRadius: 15,
    paddingVertical: heightPercentageToDP('2%'),
    alignItems: 'center',
    width: '100%',
    marginTop: heightPercentageToDP('2%'),
  },
  loginHeader: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: COLORS.theme,
    height: heightPercentageToDP('12%'),
    borderBottomLeftRadius: widthPercentageToDP('15%'),
    borderBottomRightRadius: widthPercentageToDP('15%'),
    paddingTop: heightPercentageToDP('5%'),
    gap: widthPercentageToDP('26%'),
  },
  logo: {
    width: widthPercentageToDP('40%'),
    height: widthPercentageToDP('20%'),
    marginBottom: heightPercentageToDP('1%'),
  },
  loginHeaderText: {
    color: COLORS.textLight,
    fontSize: FONT_SIZES.subtitle,
    fontFamily: FONTS.PoppinsBold,
    alignSelf: 'center',
  },
  changeButtonText: {
    color: COLORS.textLight,
    fontFamily: FONTS.PoppinsBold,
    fontSize: FONT_SIZES.body,
  },
});

export default OTPScreen;
