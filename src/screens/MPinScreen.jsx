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
  Pressable,
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
import { useTranslation } from 'react-i18next';
import Header from '@src/components/header';

const ChangeMpinScreen = ({ route }) => {
  const navigation = useNavigation();
  const { t, i18n } = useTranslation();
  const isTamil = i18n.language === 'ta';
  const styles = getStyles(isTamil);

  const { titleKey = 'forgotMpinTitle' } = route?.params || {};
  const [mpin, setMpin] = useState(null);
  const [confirmMpin, setConfirmMpin] = useState(null);

  const MpinInput = ({ onMpinSet }) => {
    const [pin, setPin] = useState(['', '', '', '']);
    const inputs = useRef([]);

    const handleChange = (text, index) => {
      if (!/^\d*$/.test(text)) return;

      const newPin = [...pin];
      newPin[index] = text;
      setPin(newPin);

      if (text && index < 3) {
        inputs.current[index + 1].focus();
      } else if (text && index === 3) {
        onMpinSet(newPin.join(''));
        inputs.current[index].blur();
      }
    };

    const handleKeyPress = (e, index) => {
      if (e.nativeEvent.key === 'Backspace' && pin[index] === '' && index > 0) {
        inputs.current[index - 1].focus();
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
            secureTextEntry
          />
        ))}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.root}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.theme} />
      <Header isBack={true} title={t('forgotMpinTitle')} />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.mpinCard}>
          <Image
            source={{
              uri: 'https://t4.ftcdn.net/jpg/05/54/22/69/360_F_554226902_eaFqOYLyeTMXY1RLHcVi6psKYdkSv4cF.jpg',
            }}
            style={styles.mpinIllustration}
          />
          <Text style={styles.mpinLabel}>
            {mpin ? t('confirmMpin') : t('enterMpin')}
          </Text>
          {mpin === null ? (
            <MpinInput onMpinSet={setMpin} />
          ) : (
            <MpinInput onMpinSet={setConfirmMpin} />
          )}
          <TouchableOpacity style={styles.changeButton}>
            <Text style={styles.changeButtonText}>
              {mpin ? t('submit') : t('change')}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const getStyles = isTamil => {
  const fontRegular = {
    fontFamily: isTamil ? FONTS.NotoSansTamilRegular : FONTS.PoppinsRegular,
  };
  const fontMedium = {
    fontFamily: isTamil ? FONTS.NotoSansTamilMedium : FONTS.PoppinsMedium,
  };
  const fontSemiBold = {
    fontFamily: isTamil ? FONTS.NotoSansTamilSemiBold : FONTS.PoppinsSemiBold,
  };
  const fontBold = {
    fontFamily: isTamil ? FONTS.NotoSansTamilBold : FONTS.PoppinsBold,
  };

  return StyleSheet.create({
    root: { flex: 1, backgroundColor: COLORS.secondary },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: COLORS.theme,
      height: heightPercentageToDP('12%'),
      borderBottomLeftRadius: 30,
      borderBottomRightRadius: 30,
      paddingHorizontal: widthPercentageToDP('4%'),
    },
    headerText: {
      color: COLORS.textLight,
      fontSize: FONT_SIZES.subtitle,
      ...fontBold,
    },
    langButton: {
      borderWidth: 1,
      borderColor: COLORS.white,
      borderRadius: 5,
      paddingHorizontal: 8,
      paddingVertical: 4,
    },
    langButtonText: { color: COLORS.white, ...fontMedium },
    scrollContainer: { flexGrow: 1, },
    mpinCard: {
      backgroundColor: COLORS.secondary,
      margin: widthPercentageToDP('4%'),
      borderRadius: 25,
      padding: widthPercentageToDP('6%'),
      alignItems: 'center'
    },
    mpinIllustration: {
      width: widthPercentageToDP('60%'),
      height: heightPercentageToDP('20%'),
      marginBottom: heightPercentageToDP('3%'),
      resizeMode: 'contain',
    },
    mpinLabel: {
      ...fontSemiBold,
      fontSize: FONT_SIZES.subtitle,
      color: COLORS.text,
      marginBottom: heightPercentageToDP('3%'),
    },
    mpinContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      width: '90%',
      marginBottom: heightPercentageToDP('4%'),
    },
    mpinBox: {
      width: widthPercentageToDP('15%'),
      height: widthPercentageToDP('15%'),
      borderWidth: 1.5,
      borderColor: COLORS.textSecondary,
      borderRadius: 15,
      textAlign: 'center',
      fontSize: FONT_SIZES.title,
      ...fontBold,
      color: COLORS.text,
    },
    changeButton: {
      backgroundColor: COLORS.theme,
      borderRadius: 15,
      paddingVertical: heightPercentageToDP('2%'),
      alignItems: 'center',
      width: '100%',
    },
    changeButtonText: {
      color: COLORS.textLight,
      ...fontBold,
      fontSize: FONT_SIZES.body,
    },
  });
};

export default ChangeMpinScreen;
