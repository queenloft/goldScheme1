import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  StatusBar,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {
  FONTS,
  FONT_SIZES,
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
  widthPercentageToDP,
  heightPercentageToDP,
  COLORS,
  normalize,
} from '@src/config/index';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import Header from '@src/components/header';
import RenderIcon from '@src/components/icon';
import useLanguageStore from '@src/hooks/useLanguageStore';

const EditProfile = () => {
  const navigation = useNavigation();
  const {language} = useLanguageStore();
  const { t, i18n } = useTranslation();

  const isTamil = language === 'ta';
  const styles = getStyles(isTamil);
  console.log(language, isTamil)
  const [formData, setFormData] = useState({
    firstName: 'Sathish',
    lastName: 'Shalini',
    mobileNo: '9786252624',
    email: 'Sakthivel9393@gmail.com',
    dateOfBirth: '',
    dateOfAnniversary: '',
  });

  const [focusedInput, setFocusedInput] = useState(null);

  const handleInputChange = (field, value) => {
    setFormData(prevState => ({ ...prevState, [field]: value }));
  };

  const handleDatePress = field => {
    console.log(`Open date picker for ${field}`);
  };

  const handleUpdateProfile = () => {
    console.log('Update profile:', formData);
  };

  const renderInput = (
    labelKey,
    field,
    placeholderKey,
    keyboardType = 'default',
    isDate = false,
  ) => (
    <View style={styles.inputContainer}>
      <Text style={styles.inputLabel}>{t(labelKey)}</Text>
      {isDate ? (
        <TouchableOpacity
          style={[
            styles.dateInput,
            focusedInput === field && styles.inputFocused,
          ]}
          onPress={() => handleDatePress(field)}
          activeOpacity={0.7}
        >
          <Text
            style={[
              styles.dateInputText,
              !formData[field] && styles.placeholderText,
            ]}
          >
            {formData[field] || t(placeholderKey)}
          </Text>
          <RenderIcon
            name="calendar"
            size={normalize(20)}
            color={COLORS.theme}
          />
        </TouchableOpacity>
      ) : (
        <TextInput
          style={[
            styles.textInput,
            focusedInput === field && styles.inputFocused,
          ]}
          value={formData[field]}
          onChangeText={value => handleInputChange(field, value)}
          placeholder={t(placeholderKey)}
          placeholderTextColor={COLORS.textPlaceholder}
          keyboardType={keyboardType}
          onFocus={() => setFocusedInput(field)}
          onBlur={() => setFocusedInput(null)}
          autoCapitalize={field === 'email' ? 'none' : 'words'}
          autoCorrect={false}
        />
      )}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={COLORS.theme} barStyle="light-content" />

           <Header
           isBack={true}
           title={t("editProfile")}
           />
   

      <KeyboardAvoidingView
        style={styles.keyboardContainer}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView
          style={styles.whiteCard}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {renderInput('firstName', 'firstName', 'enterFirstName')}
          {renderInput('lastName', 'lastName', 'enterLastName')}
          {renderInput('mobileNo', 'mobileNo', 'enterMobileNo', 'phone-pad')}
          {renderInput('email', 'email', 'enterEmail', 'email-address')}
          {renderInput('dob', 'dateOfBirth', 'dob', 'default', true)}
          {renderInput(
            'anniversary',
            'dateOfAnniversary',
            'anniversary',
            'default',
            true,
          )}

          <TouchableOpacity
            style={styles.updateButton}
            onPress={handleUpdateProfile}
            activeOpacity={0.8}
          >
            <Text style={styles.updateButtonText}>{t('updateProfile')}</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
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
  const fontBold = {
    fontFamily: isTamil ? FONTS.NotoSansTamilBold : FONTS.PoppinsBold,
  };

  return StyleSheet.create({
    container: { flex: 1, backgroundColor: COLORS.primary },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: widthPercentageToDP('4%'),
      height: heightPercentageToDP('10%'),
      backgroundColor: COLORS.theme,
      borderBottomLeftRadius: 30,
      borderBottomRightRadius: 30,
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
    keyboardContainer: { flex: 1, padding: widthPercentageToDP('4%') },
    whiteCard: {
      flex: 1,
      backgroundColor: COLORS.secondary,
      borderRadius: 20,
      padding: widthPercentageToDP('4%'),
    },
    scrollContent: { paddingBottom: heightPercentageToDP('2%') },
    inputContainer: { marginBottom: heightPercentageToDP('2.5%') },
    inputLabel: {
      color: COLORS.textSecondary,
      fontSize: FONT_SIZES.caption,
      ...fontMedium,
      marginBottom: heightPercentageToDP('1%'),
      marginLeft: widthPercentageToDP('2%'),
    },
    textInput: {
      backgroundColor: COLORS.inputBackground,
      borderWidth: 1.5,
      borderColor: COLORS.inputBorder,
      borderRadius: 15,
      paddingHorizontal: widthPercentageToDP('4%'),
      paddingVertical: heightPercentageToDP('1.8%'),
      fontSize: FONT_SIZES.body,
      color: COLORS.textDark,
      minHeight: heightPercentageToDP('6.5%'),
      ...fontRegular,
    },
    dateInput: {
      backgroundColor: COLORS.inputBackground,
      borderWidth: 1.5,
      borderColor: COLORS.inputBorder,
      borderRadius: 15,
      paddingHorizontal: widthPercentageToDP('4%'),
      paddingVertical: heightPercentageToDP('1.8%'),
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      minHeight: heightPercentageToDP('6.5%'),
    },
    dateInputText: {
      fontSize: FONT_SIZES.body,
      color: COLORS.textDark,
      flex: 1,
      ...fontRegular,
    },
    placeholderText: { color: COLORS.textPlaceholder },
    inputFocused: { borderColor: COLORS.inputFocus, borderWidth: 2 },
    updateButton: {
      backgroundColor: COLORS.theme,
      borderRadius: 15,
      paddingVertical: heightPercentageToDP('2%'),
      alignItems: 'center',
      marginTop: heightPercentageToDP('2%'),
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 5,
      elevation: 5,
    },
    updateButtonText: {
      color: COLORS.textLight,
      fontSize: FONT_SIZES.body,
      ...fontBold,
      letterSpacing: 1,
    },
  });
};

export default EditProfile;
