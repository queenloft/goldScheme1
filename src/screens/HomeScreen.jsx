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
  Dimensions,
  Platform,
  Alert,
} from 'react-native';
import {FONTS} from '@src/config/index'
// --- Navigation Imports ---
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

/*
* --- HOW TO ADD CUSTOM FONTS (Poppins) ---
*
* 1. Download Font Files: Go to Google Fonts and download the Poppins font family.
*
* 2. Create Asset Folder: In the root of your React Native project, create a folder structure: `./assets/fonts/`
*
* 3. Add Fonts: Copy the `.ttf` font files (e.g., Poppins-Regular.ttf, Poppins-Medium.ttf, Poppins-Bold.ttf) into the `./assets/fonts/` folder.
*
* 4. Link Fonts: In your terminal, at the root of your project, run the command:
* npx react-native-asset
*
* 5. Rebuild Your App: You must rebuild the app for the fonts to be included.
* npx react-native run-android
* or
* npx react-native run-ios
*
*/


// --- Responsive Design Helpers ---
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

const widthPercentageToDP = (widthPercent) => {
  const elemWidth = typeof widthPercent === 'number' ? widthPercent : parseFloat(widthPercent);
  return (SCREEN_WIDTH * elemWidth) / 100;
};

const heightPercentageToDP = (heightPercent) => {
  const elemHeight = typeof heightPercent === 'number' ? heightPercent : parseFloat(heightPercent);
  return (SCREEN_HEIGHT * elemHeight) / 100;
};


// --- Constants (Localized for India) ---
const COLORS = {
  primary: '#f0f4f7',
  primaryDark: '#1a1a1a',
  secondary: '#FFFFFF',
  accent: '#FFD700',
  theme: '#321deaff',
  text: '#1a1a1a',
  textLight: '#FFFFFF',
  textSecondary: '#6c757d',
  success: '#28a745',
  danger: '#dc3545',
};


const FONT_SIZES = {
  title: widthPercentageToDP('7%'),
  subtitle: widthPercentageToDP('5%'),
  body: widthPercentageToDP('4%'),
  caption: widthPercentageToDP('3.5%'), // Slightly increased for better readability
};

// --- Mock Data (Localized for India) ---
const MOCK_GOLD_PRICE_INR_PER_GRAM = 7250.75;
const MOCK_USER = {
  name: 'Sanjay Kumar',
  totalInvestment: 150000.0,
  totalGoldGrams: 20.68,
};

const MOCK_SCHEMES = [
  {
    id: '1',
    name: 'Digital Gold Plan',
    description: 'Invest in 24K digital gold, starting from just ₹100.',
    minInvestment: 100,
    details: 'Our Digital Gold Plan allows you to buy, sell, and store 24K gold digitally. It is a secure and convenient way to invest in gold without the hassle of physical storage. Investments can be made 24/7 through the app.'
  },
  {
    id: '2',
    name: 'Monthly Gold Scheme (SIP)',
    description: 'A systematic plan to accumulate gold by paying monthly.',
    minInvestment: 1000,
    details: 'The Monthly Gold Scheme is a Systematic Investment Plan (SIP) for gold. You commit to a fixed monthly amount, which is used to purchase gold at the current market rate. This helps in averaging out your purchase cost over time.'
  },
  {
    id: '3',
    name: 'Gold Wealth Builder',
    description: 'Long-term investment plan for maximizing your gold assets.',
    minInvestment: 5000,
    details: 'Designed for serious investors, the Gold Wealth Builder plan focuses on long-term growth. It combines features of digital gold with added benefits like lower transaction fees and dedicated support for larger investments.'
  },
];

// --- Reusable Components ---

const AppHeader = ({ onLogout, title = "GoldInvest" }) => (
  <View style={styles.headerContainer}>
    <Text style={styles.headerTitle}>GRT jewellers</Text>
    {onLogout && (
       <TouchableOpacity onPress={onLogout}>
        <Text style={{color: COLORS.danger, fontSize: FONT_SIZES.body, fontFamily: FONTS.PoppinsMedium}}>Logout</Text>
      </TouchableOpacity>
    )}
  </View>
);

const GoldPriceTicker = ({ price }) => (
  <View style={styles.tickerContainer}>
    <Text style={styles.tickerText}>Live Gold Price (24K/g): </Text>
    <Text style={[styles.tickerText, { color: COLORS.success, fontFamily: FONTS.PoppinsMedium }]}>
      ₹{price.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
    </Text>
  </View>
);

const DashboardCard = ({ title, children }) => (
  <View style={styles.cardContainer}>
    <Text style={styles.cardTitle}>{title}</Text>
    {children}
  </View>
);

const SchemeCard = ({ scheme, onPress }) => (
    <TouchableOpacity style={styles.schemeCardContainer} onPress={onPress}>
        <View style={styles.schemeIcon}>
             <Text style={{fontSize: FONT_SIZES.subtitle}}>✨</Text>
        </View>
        <View style={styles.schemeTextContainer}>
            <Text style={styles.schemeName}>{scheme.name}</Text>
            <Text style={styles.schemeDescription}>{scheme.description}</Text>
        </View>
        <View style={styles.schemeArrow}>
            <Text style={{color: COLORS.theme, fontSize: FONT_SIZES.subtitle}}>{'>'}</Text>
        </View>
    </TouchableOpacity>
);

const HomeScreen = ({ navigation, route }) => {
  const { user } = route.params;

  const handleLogout = () => {
    navigation.replace('Login');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.primary} />
      <AppHeader onLogout={handleLogout} />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.welcomeText}>Welcome, {user.name}!</Text>
        <GoldPriceTicker price={MOCK_GOLD_PRICE_INR_PER_GRAM} />
        <DashboardCard title="My Portfolio">
            <View style={styles.portfolioRow}>
                <Text style={styles.portfolioLabel}>Total Investment:</Text>
                <Text style={styles.portfolioValue}>₹{user.totalInvestment.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</Text>
            </View>
            <View style={styles.portfolioRow}>
                <Text style={styles.portfolioLabel}>Total Gold Held:</Text>
                <Text style={styles.portfolioValue}>{user.totalGoldGrams.toFixed(2)} g</Text>
            </View>
        </DashboardCard>
        <DashboardCard title="Explore Schemes">
            {MOCK_SCHEMES.map(scheme => (
                <SchemeCard 
                  key={scheme.id} 
                  scheme={scheme} 
                  onPress={() => navigation.navigate('SchemeDetails', { scheme: scheme })} 
                />
            ))}
        </DashboardCard>
      </ScrollView>
    </SafeAreaView>
  );
};

const SchemeDetailsScreen = ({ route }) => {
    const { scheme } = route.params;

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor={COLORS.primary} />
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <View style={styles.detailsCard}>
                    <View style={styles.detailsHeader}>
                        <Text style={styles.detailsIcon}>✨</Text>
                        <Text style={styles.detailsTitle}>{scheme.name}</Text>
                    </View>
                    <Text style={styles.detailsDescription}>{scheme.details}</Text>
                    <View style={styles.detailsRow}>
                        <Text style={styles.detailsLabel}>Minimum Investment</Text>
                        <Text style={styles.detailsValue}>₹{scheme.minInvestment.toLocaleString('en-IN')}</Text>
                    </View>
                     <TouchableOpacity style={styles.investButton}>
                        <Text style={styles.investButtonText}>Invest Now</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default HomeScreen;




// --- Styles ---

const styles = StyleSheet.create({
  // Root and Main Container
  container: {
    flex: 1,
    backgroundColor: COLORS.primary,
  },
  scrollContent: {
    padding: widthPercentageToDP('5%'),
    paddingBottom: heightPercentageToDP('5%'),
  },
  // Header
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: widthPercentageToDP('5%'),
    paddingVertical: heightPercentageToDP('2%'),
    backgroundColor: COLORS.secondary,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight + 40 : 0,
  },
  headerTitle: {
    color: COLORS.text,
    fontSize: FONT_SIZES.subtitle,
    fontFamily: FONTS.PoppinsBold,
  },
  // Welcome Text
  welcomeText: {
    color: COLORS.text,
    fontSize: FONT_SIZES.title,
    fontFamily: FONTS.PoppinsRegular,
    marginBottom: heightPercentageToDP('1%'),
  },
  // Ticker
  tickerContainer: {
    backgroundColor: COLORS.secondary,
    paddingVertical: heightPercentageToDP('1.5%'),
    paddingHorizontal: widthPercentageToDP('4%'),
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: heightPercentageToDP('2.5%'),
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  tickerText: {
    color: COLORS.text,
    fontSize: FONT_SIZES.body,
    fontFamily: FONTS.PoppinsRegular,
  },
  // Dashboard Card
  cardContainer: {
    backgroundColor: COLORS.secondary,
    borderRadius: 15,
    padding: widthPercentageToDP('5%'),
    marginBottom: heightPercentageToDP('2.5%'),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  cardTitle: {
    color: COLORS.theme,
    fontSize: FONT_SIZES.subtitle,
    fontFamily: FONTS.PoppinsBold,
    marginBottom: heightPercentageToDP('2%'),
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingBottom: heightPercentageToDP('1%'),
  },
  // Portfolio Card
  portfolioRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: heightPercentageToDP('1%'),
  },
  portfolioLabel: {
    color: COLORS.textSecondary,
    fontSize: FONT_SIZES.body,
    fontFamily: FONTS.PoppinsRegular,
  },
  portfolioValue: {
    color: COLORS.text,
    fontSize: FONT_SIZES.body,
    fontFamily: FONTS.PoppinsMedium,
  },
  // Scheme Card
  schemeCardContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: heightPercentageToDP('1.5%'),
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  schemeIcon: {
    width: widthPercentageToDP('10%'),
    height: widthPercentageToDP('10%'),
    borderRadius: widthPercentageToDP('5%'),
    backgroundColor: 'rgba(0, 128, 128, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: widthPercentageToDP('4%'),
  },
  schemeTextContainer: {
    flex: 1,
  },
  schemeName: {
    color: COLORS.text,
    fontSize: FONT_SIZES.body,
    fontFamily: FONTS.PoppinsMedium,
  },
  schemeDescription: {
    color: COLORS.textSecondary,
    fontSize: FONT_SIZES.caption,
    fontFamily: FONTS.PoppinsRegular,
    marginTop: 4,
  },
  schemeArrow: {
    marginLeft: widthPercentageToDP('2%'),
  },
  // Login Screen
  loginRoot: {
    flex: 1,
    backgroundColor: COLORS.secondary,
  },
  loginScrollView: {
    flex: 1,
  },
  loginHeader: {
    backgroundColor: COLORS.theme,
    height: heightPercentageToDP('30%'),
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomLeftRadius: widthPercentageToDP('15%'),
    borderBottomRightRadius: widthPercentageToDP('15%'),
    paddingTop: heightPercentageToDP('5%'),
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
  },
  loginContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    paddingHorizontal: widthPercentageToDP('8%'),
    paddingTop: heightPercentageToDP('5%'),
  },
  loginTitle: {
    fontSize: FONT_SIZES.title,
    fontFamily: FONTS.PoppinsBold,
    color: COLORS.text,
    textAlign: 'center',
    marginBottom: heightPercentageToDP('3%'),
  },
  inputGroup: {
    marginBottom: heightPercentageToDP('2%'),
  },
  label: {
    color: COLORS.textSecondary,
    fontSize: FONT_SIZES.caption,
    fontFamily: FONTS.PoppinsRegular,
    marginBottom: 5,
  },
  input: {
    backgroundColor: COLORS.primary,
    color: COLORS.text,
    paddingHorizontal: widthPercentageToDP('4%'),
    height: heightPercentageToDP('6.5%'),
    borderRadius: 10,
    fontSize: FONT_SIZES.body,
    fontFamily: FONTS.PoppinsRegular,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  loginButton: {
    backgroundColor: COLORS.theme,
    paddingVertical: heightPercentageToDP('1.8%'),
    borderRadius: 10,
    alignItems: 'center',
    marginTop: heightPercentageToDP('1%'),
  },
  otpButton: {
      backgroundColor: COLORS.secondary,
      borderWidth: 1,
      borderColor: COLORS.theme,
  },
  loginButtonText: {
    color: COLORS.textLight,
    fontSize: FONT_SIZES.body,
    fontFamily: FONTS.PoppinsMedium,
  },
  otpButtonText: {
    color: COLORS.theme,
    fontSize: FONT_SIZES.body,
    fontFamily: FONTS.PoppinsMedium,
  },
  orText: {
    textAlign: 'center',
    color: COLORS.textSecondary,
    marginVertical: heightPercentageToDP('2%'),
    fontSize: FONT_SIZES.body,
    fontFamily: FONTS.PoppinsRegular,
  },
  forgotPasswordText: {
    color: COLORS.theme,
    textAlign: 'center',
    marginTop: heightPercentageToDP('2%'),
    fontFamily: FONTS.PoppinsMedium,
    fontSize: FONT_SIZES.caption,
  },
  signUpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: heightPercentageToDP('2%'),
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  signUpText: {
    color: COLORS.textSecondary,
    fontSize: FONT_SIZES.body,
    fontFamily: FONTS.PoppinsRegular,
  },
  // Scheme Details Screen
  detailsCard: {
    backgroundColor: COLORS.secondary,
    borderRadius: 15,
    padding: widthPercentageToDP('5%'),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  detailsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingBottom: heightPercentageToDP('2%'),
    marginBottom: heightPercentageToDP('2%'),
  },
  detailsIcon: {
    fontSize: FONT_SIZES.title,
    marginRight: widthPercentageToDP('4%'),
  },
  detailsTitle: {
    fontSize: FONT_SIZES.subtitle,
    fontFamily: FONTS.PoppinsBold,
    color: COLORS.theme,
    flex: 1,
  },
  detailsDescription: {
    fontSize: FONT_SIZES.body,
    color: COLORS.textSecondary,
    fontFamily: FONTS.PoppinsRegular,
    lineHeight: heightPercentageToDP('3%'),
    marginBottom: heightPercentageToDP('3%'),
  },
  detailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: heightPercentageToDP('1.5%'),
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  detailsLabel: {
    fontSize: FONT_SIZES.body,
    color: COLORS.text,
    fontFamily: FONTS.PoppinsMedium,
  },
  detailsValue: {
    fontSize: FONT_SIZES.body,
    color: COLORS.success,
    fontFamily: FONTS.PoppinsMedium,
  },
  investButton: {
    backgroundColor: COLORS.accent,
    paddingVertical: heightPercentageToDP('1.8%'),
    borderRadius: 10,
    alignItems: 'center',
    marginTop: heightPercentageToDP('3%'),
  },
  investButtonText: {
    color: COLORS.primaryDark,
    fontSize: FONT_SIZES.body,
    fontFamily: FONTS.PoppinsBold,
  }
});
