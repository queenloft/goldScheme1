import React,{useState} from 'react';
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
import {FONTS,FONT_SIZES,SCREEN_HEIGHT,SCREEN_WIDTH,widthPercentageToDP, heightPercentageToDP, COLORS} from '@src/config/index'
import CustomModal from '@src/components/modal';


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


// --- Reusable Components ---
const ProfileField = ({ label, value }) => (
    <View style={styles.fieldContainer}>
        <Text style={styles.fieldLabel}>{label}</Text>
        <Text style={styles.fieldValue}>{value}</Text>
    </View>
);


// --- Profile Screen Component ---
// This would be in its own file, e.g., `screens/ProfileScreen.js`
export default function ProfileScreen({route}) {
  const navigation = useNavigation();
    const [modalVisible, setModalVisible] = useState(false);
  
    // Function to handle the "YES" press
    const handleDeleteConfirm = () => {
      console.log("Account deletion confirmed.");
      setModalVisible(false);
      // Add your account deletion logic here
    };
  
    // Function to handle the "NO" press or closing the modal
    const handleDeleteCancel = () => {
      console.log("Account deletion cancelled.");
      setModalVisible(false);
    };


  return (
    <SafeAreaView style={styles.root}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.theme} />

      {/* Custom Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Profile</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Profile Title Bar */}
        <View style={styles.profileTitleBar}>
          <Text style={styles.profileTitle}></Text>
        </View>

        {/* Main Content Area */}
        <View style={styles.contentArea}>
          {/* Profile Picture */}
          <View style={styles.avatarContainer}>
            <Image
              source={{ uri: MOCK_USER_PROFILE.avatar }}
              style={styles.avatar}
            />
            <TouchableOpacity style={styles.cameraIconContainer}>
              {/* Use a proper camera icon here */}
              <Text style={styles.cameraIcon}>📷</Text>
            </TouchableOpacity>
          </View>

          {/* User Details */}
          <ProfileField label="Name" value={MOCK_USER_PROFILE.name} />
          <ProfileField label="Mobile No." value={MOCK_USER_PROFILE.mobile} />
          <ProfileField label="Email Id" value={MOCK_USER_PROFILE.email} />
          <ProfileField label="Date of Birth" value={MOCK_USER_PROFILE.dob} />
          <ProfileField
            label="Date of Anniversary"
            value={MOCK_USER_PROFILE.anniversary}
          />

          {/* Edit Button */}
          <TouchableOpacity
            style={styles.editButton}
            onPress={() => navigation.navigate('EditProfile')}
          >
            <Text style={styles.editButtonText}>EDIT PROFILE</Text>
          </TouchableOpacity>

          {/* Action Links */}
          <View style={styles.actionsContainer}>
            <TouchableOpacity onPress={() => setModalVisible(true)}>
              <Text style={styles.actionTextDanger}>Logout?</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('ChangeMpin',{
              screen: route.name,
              title:"Change MPIN"
            })}>
              <Text style={styles.actionTextTheme}>Change MPIN?</Text>
            </TouchableOpacity>
          </View>
        </View>
        <Text style={styles.headerVersion}>AV: 1.7.0</Text>

        {/* The Modal Component */}
        <CustomModal
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          onConfirm={handleDeleteConfirm}
          onCancel={handleDeleteCancel}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

// --- Styles ---
const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: COLORS.secondary,
  },
  scrollContainer: {
    flexGrow: 1,
  },
  // Header
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: widthPercentageToDP('4%'),
    paddingVertical: heightPercentageToDP('2.5%'),
    backgroundColor: COLORS.theme,
    paddingTop: 50,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
  },
  backButton: {
    padding: 5,
  },
  backButtonText: {
    color: COLORS.textLight,
    fontSize: FONT_SIZES.title,
  },
  headerTitle: {
    color: COLORS.textLight,
    fontFamily: FONTS.PoppinsBold,
    fontSize: FONT_SIZES.subtitle,

  },
  headerVersion: {
    color: COLORS.textLight,
    fontFamily: FONTS.PoppinsRegular,
    fontSize: FONT_SIZES.caption,
  },
  // Profile Title Bar
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
  // Content Area
  contentArea: {
    backgroundColor: COLORS.secondary,
    paddingHorizontal: widthPercentageToDP('6%'),
    paddingBottom: heightPercentageToDP('4%'),
  },
  // Avatar
  avatarContainer: {
    alignItems: 'center',
    marginTop: -heightPercentageToDP('5%'), // Overlap the title bar
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
    bottom: 0,
    right: widthPercentageToDP('32%'),
    backgroundColor: COLORS.theme,
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
    fontFamily: FONTS.PoppinsMedium,
    fontSize: FONT_SIZES.body,
    color: COLORS.text,
  },
  fieldValue: {
    fontFamily: FONTS.PoppinsRegular,
    fontSize: FONT_SIZES.body,
    color: COLORS.textSecondary,
    flex: 1,
    textAlign: 'right',
  },
  // Buttons
  editButton: {
    backgroundColor: COLORS.theme,
    borderRadius: 10,
    paddingVertical: heightPercentageToDP('1.8%'),
    alignItems: 'center',
    marginTop: heightPercentageToDP('4%'),
  },
  editButtonText: {
    color: COLORS.textLight,
    fontFamily: FONTS.PoppinsBold,
    fontSize: FONT_SIZES.body,
  },
  // Action Links
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: heightPercentageToDP('3%'),
  },
  actionTextDanger: {
    color: COLORS.danger,
    fontFamily: FONTS.PoppinsMedium,
    fontSize: FONT_SIZES.caption,
  },
  actionTextTheme: {
    color: COLORS.theme,
    fontFamily: FONTS.PoppinsMedium,
    fontSize: FONT_SIZES.caption,
  },
});
