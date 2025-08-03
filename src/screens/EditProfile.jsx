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
import {FontAwesome } from '@react-native-vector-icons/fontawesome';
import {FONTS,FONT_SIZES,SCREEN_HEIGHT,SCREEN_WIDTH,widthPercentageToDP, heightPercentageToDP, COLORS, normalize} from '@src/config/index'
import RenderIcon from '@src/components/icon';


const EditProfile = ({navigation}) => {
  const [formData, setFormData] = useState({
    firstName: 'Sathish',
    lastName: 'Shalini',
    mobileNo: '9786252624',
    email: 'Sakthivel9393@gmail.com',
    dateOfBirth: '',
    dateOfAnniversary: ''
  });

  const [focusedInput, setFocusedInput] = useState(null);

  const handleInputChange = (field, value) => {
    setFormData(prevState => ({
      ...prevState,
      [field]: value
    }));
  };

  const handleDatePress = (field) => {
    // In a real app, you would open a date picker here
    console.log(`Open date picker for ${field}`);
  };

  const handleUpdateProfile = () => {
    // Handle profile update logic here
    console.log('Update profile:', formData);
  };

  const renderInput = (label, field, placeholder, keyboardType = 'default', isDate = false) => (
    <View style={styles.inputContainer}>
      <Text style={styles.inputLabel}>{label}</Text>
      {isDate ? (
        <TouchableOpacity 
          style={[
            styles.dateInput,
            focusedInput === field && styles.inputFocused
          ]}
          onPress={() => handleDatePress(field)}
          activeOpacity={0.7}
        >
          <Text style={[
            styles.dateInputText,
            !formData[field] && styles.placeholderText
          ]}>
            {formData[field] || placeholder}
          </Text>
          <FontAwesome 
            name="calendar" 
            size={normalize(20)} 
            color={COLORS.primary} 
          />
        </TouchableOpacity>
      ) : (
        <TextInput
          style={[
            styles.textInput,
            focusedInput === field && styles.inputFocused
          ]}
          value={formData[field]}
          onChangeText={(value) => handleInputChange(field, value)}
          placeholder={placeholder}
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
      <StatusBar backgroundColor={COLORS.primary} barStyle="light-content" />
      
      {/* Header */}
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
        <Text style={styles.loginHeaderText}>Edit Profile</Text>
      </View>

      <KeyboardAvoidingView 
        style={styles.keyboardContainer}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
      >


          {/* White Content Card */}
          <ScrollView 
            style={styles.whiteCard}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
          >
            {renderInput('First Name', 'firstName', 'Enter first name')}
            {renderInput('Last Name', 'lastName', 'Enter last name')}
            {renderInput('Mobile No.', 'mobileNo', 'Enter mobile number', 'phone-pad')}
            {renderInput('Email', 'email', 'Enter email address', 'email-address')}
            {renderInput('Date of Birth', 'dateOfBirth', 'Date of Birth', 'default', true)}
            {renderInput('Date of Anniversary', 'dateOfAnniversary', 'Date of Anniversary', 'default', true)}

            {/* Update Button */}
            <TouchableOpacity 
              style={styles.updateButton}
              onPress={handleUpdateProfile}
              activeOpacity={0.8}
            >
              <Text style={styles.updateButtonText}>UPDATE PROFILE</Text>
            </TouchableOpacity>
          </ScrollView>
      </KeyboardAvoidingView>

      {/* Bottom Indicator */}
      <View style={styles.bottomIndicator} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primary,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: widthPercentageToDP('5%'),
    paddingVertical: heightPercentageToDP('2%'),
    paddingTop: heightPercentageToDP('1%'),
  },
  backButton: {
    width: widthPercentageToDP('10%'),
    height: widthPercentageToDP('10%'),
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  headerCenter: {
    alignItems: 'center',
    flex: 1,
  },
  logoContainer: {
    marginBottom: heightPercentageToDP('0.5%'),
  },
  logoText: {
    fontSize: normalize(28),
  },
  companyName: {
    color: COLORS.accent,
    fontSize: FONT_SIZES.caption,
    fontWeight: '600',
  },
  version: {
    color: COLORS.text,
    fontSize: FONT_SIZES.small,
    fontWeight: '500',
    width: widthPercentageToDP('15%'),
    textAlign: 'right',
  },
  keyboardContainer: {
    flex: 1,
    paddingVertical: heightPercentageToDP('2%'),
    paddingHorizontal: widthPercentageToDP('5%'),

  },
  goldenCard: {
    flex: 1,
    borderTopLeftRadius: widthPercentageToDP('8%'),
    borderTopRightRadius: widthPercentageToDP('8%'),
    marginTop: heightPercentageToDP('2%'),
    paddingTop: heightPercentageToDP('3%'),
    paddingHorizontal: widthPercentageToDP('5%'),
  },
  cardTitle: {
    color: COLORS.textDark,
    fontSize: FONT_SIZES.extraLarge,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: heightPercentageToDP('3%'),
  },
  whiteCard: {
    flex: 1,
    backgroundColor: COLORS.secondary,
    borderRadius: widthPercentageToDP('6%'),
    paddingHorizontal: widthPercentageToDP('5%'),
  },
  scrollContent: {
    paddingVertical: heightPercentageToDP('1.5%'),
    paddingBottom: heightPercentageToDP('5%'),
  },
  inputContainer: {
    marginBottom: heightPercentageToDP('2.5%'),
  },
  inputLabel: {
    color: COLORS.textSecondary,
    fontSize: FONT_SIZES.caption,
    fontWeight: '500',
    marginBottom: heightPercentageToDP('1%'),
    marginLeft: widthPercentageToDP('2%'),
  },
  textInput: {
    backgroundColor: COLORS.inputBackground,
    borderWidth: 1.5,
    borderColor: COLORS.inputBorder,
    borderRadius: widthPercentageToDP('4%'),
    paddingHorizontal: widthPercentageToDP('4%'),
    paddingVertical: heightPercentageToDP('1.8%'),
    fontSize: FONT_SIZES.body,
    color: COLORS.textDark,
    minHeight: heightPercentageToDP('6.5%'),
  },
  dateInput: {
    backgroundColor: COLORS.inputBackground,
    borderWidth: 1.5,
    borderColor: COLORS.inputBorder,
    borderRadius: widthPercentageToDP('4%'),
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
  },
  placeholderText: {
    color: COLORS.textPlaceholder,
  },
  inputFocused: {
    borderColor: COLORS.inputFocus,
    borderWidth: 2,
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
  updateButton: {
    backgroundColor: COLORS.theme,
    borderRadius: widthPercentageToDP('6%'),
    paddingVertical: heightPercentageToDP('2.2%'),
    alignItems: 'center',
    // marginTop: heightPercentageToDP('3%'),
    shadowColor: COLORS.primary,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  updateButtonText: {
    color: COLORS.textLight,
    fontSize: FONT_SIZES.body,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  bottomIndicator: {
    width: widthPercentageToDP('30%'),
    height: heightPercentageToDP('0.6%'),
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: heightPercentageToDP('0.3%'),
    alignSelf: 'center',
    marginBottom: heightPercentageToDP('1%'),
  },
});

export default EditProfile;