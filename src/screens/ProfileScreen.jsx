import React, { useState, useTransition } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Image,
  Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {
  FONTS,
  FONT_SIZES,
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
  widthPercentageToDP,
  heightPercentageToDP,
  COLORS,
} from '@src/config/index';
import CustomModal from '@src/components/modal';
import RenderIcon from '@src/components/icon';
import useAuthStore from '@src/hooks/useAuthStore';
import { useTranslation } from 'react-i18next';
import Header from '@src/components/header';
import auth from '@react-native-firebase/auth';

// --- Mock Data ---
// In a real app, this data would come from your user state or API
const MOCK_USER_PROFILE = {
  name: 'Sathish Shalini',
  mobile: '9786252624',
  email: 'sakthivel9393@gmail.com',
  dob: '__-__-____',
  anniversary: '__-__-____',
  avatar: 'https://picsum.photos/seed/useravatar/100/100',
};


export default function ProfileScreen({ route }) {
  const navigation = useNavigation();
  const { logout } = useAuthStore();
  const { t, i18n } = useTranslation();
  const isTamil = i18n.language === 'ta';
  const styles = getStyles(isTamil);
  const [modalVisible, setModalVisible] = useState(false);

  const handleLogoutConfirm = async () => {
    console.log('Logout confirmed.');
        await auth().signOut();
    setModalVisible(false);
    logout();
    navigation.replace('Login');
  };

  const handleLogoutCancel = () => {
    setModalVisible(false);
  };

  const ProfileField = ({ labelKey, value }) => (
    <View style={styles.fieldContainer}>
      <Text style={styles.fieldLabel}>{t(labelKey)}</Text>
      <Text style={styles.fieldValue}>{value}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.root}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.theme} />

      <Header 
      isBack ={route?.params?.isBack}
      title={t("profile")}
      />

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.profileTitleBar}>
          <Text style={styles.profileTitle}></Text>
        </View>
        <View style={styles.contentArea}>
          <View style={styles.avatarContainer}>
            <Image
              source={{ uri: MOCK_USER_PROFILE.avatar }}
              style={styles.avatar}
            />
            <TouchableOpacity style={styles.cameraIconContainer}>
              <RenderIcon name="camera" size={18} color={COLORS.primaryDark} />
            </TouchableOpacity>
          </View>

          <ProfileField labelKey="name" value={MOCK_USER_PROFILE.name} />
          <ProfileField labelKey="mobileNo" value={MOCK_USER_PROFILE.mobile} />
          <ProfileField labelKey="emailId" value={MOCK_USER_PROFILE.email} />
          <ProfileField labelKey="dob" value={MOCK_USER_PROFILE.dob} />
          <ProfileField
            labelKey="anniversary"
            value={MOCK_USER_PROFILE.anniversary}
          />

          <TouchableOpacity
            style={styles.editButton}
            onPress={() => navigation.navigate('EditProfile')}
          >
            <Text style={styles.editButtonText}>{t('editProfile')}</Text>
          </TouchableOpacity>

          <View style={styles.actionsContainer}>
            <TouchableOpacity onPress={() => setModalVisible(true)}>
              <Text style={styles.actionTextDanger}>{t('logout')}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('ChangeMpin')}>
              <Text style={styles.actionTextTheme}>{t('changeMpin')}</Text>
                          

            </TouchableOpacity>
            
          </View>
            <Text style={styles.version}>Version: 1.0.0</Text>
        </View>

        <CustomModal
          modalVisible={modalVisible}
          onConfirm={handleLogoutConfirm}
          onCancel={handleLogoutCancel}
          t={t}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

// --- Dynamic Stylesheet ---
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
    root: { flex: 1, backgroundColor: COLORS.theme },
    scrollContainer: { flexGrow:1 },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: widthPercentageToDP('4%'),
      paddingVertical: heightPercentageToDP('1.5%'),
      backgroundColor: COLORS.theme,
      paddingTop: 50,
      borderBottomLeftRadius: 40,
      borderBottomRightRadius: 40,
    },
    headerTitle: {
      color: COLORS.textLight,
      fontSize: FONT_SIZES.subtitle,
      ...fontBold,
    },
    langButton: {
      borderWidth: 1,
      borderColor: COLORS.primary,
      borderRadius: 5,
      paddingHorizontal: 8,
      paddingVertical: 4,
    },
    langButtonText: { color: COLORS.primary, ...fontMedium },
    profileTitleBar: {
    backgroundColor: COLORS.primary,
    paddingVertical: heightPercentageToDP('4%'),
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    alignItems: 'center',
  },
  profileTitle: {
    fontFamily: FONTS.PoppinsBold,
    fontSize: FONT_SIZES.title,
    color: COLORS.text,
    },
    contentArea: {
      backgroundColor: COLORS.secondary,
      paddingHorizontal: widthPercentageToDP('6%'),
      paddingBottom: heightPercentageToDP('4%'),
          },
    avatarContainer: {
      alignItems: 'center',
      marginTop: -heightPercentageToDP('5%'),
      marginBottom: heightPercentageToDP('3%'),
    },
    avatar: {
      width: widthPercentageToDP('25%'),
      height: widthPercentageToDP('25%'),
      borderRadius: widthPercentageToDP('12.5%'),
      borderWidth: 4,
      borderColor: COLORS.secondary,
    },
    cameraIconContainer: {
      position: 'absolute',
      bottom: 5,
      right: widthPercentageToDP('32%'),
      backgroundColor: COLORS.primary,
      padding: 8,
      borderRadius: 20,
      borderWidth: 2,
      borderColor: COLORS.secondary,
    },
  cameraIcon: {
    fontSize: 18,
  },
  // Fields
    fieldContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: heightPercentageToDP('2%'),
      borderBottomWidth: 1,
      borderBottomColor: COLORS.primary,
    },
    fieldLabel: {
      fontSize: FONT_SIZES.body,
      color: COLORS.text,
      ...fontMedium,
    },
    fieldValue: {
      fontSize: FONT_SIZES.body,
      color: COLORS.textSecondary,
      flex: 1,
      textAlign: 'right',
      ...fontRegular,
    },
    editButton: {
      backgroundColor: COLORS.theme,
      borderRadius: 10,
      paddingVertical: heightPercentageToDP('1.8%'),
      alignItems: 'center',
      marginTop: heightPercentageToDP('4%'),
    },
    editButtonText: {
      color: COLORS.textLight,
      fontSize: FONT_SIZES.body,
      ...fontBold,
    },
    actionsContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: heightPercentageToDP('3%'),
    },
    actionTextDanger: {
      color: COLORS.danger,
      fontSize: FONT_SIZES.caption,
      ...fontMedium,
    },
    actionTextTheme: {
      color: COLORS.theme,
      fontSize: FONT_SIZES.caption,
      ...fontMedium,
      paddingTop:8
    },
      version: {
      color: COLORS.theme,
      fontSize: FONT_SIZES.small,
      ...fontRegular,
      paddingTop:8
    },
  });
};
