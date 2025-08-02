import React from 'react';
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
import PromoCarousel from '@src/components/banner';
import {FONTS,FONT_SIZES,SCREEN_HEIGHT,SCREEN_WIDTH,widthPercentageToDP, heightPercentageToDP, COLORS} from '@src/config/index'




// --- Mock Data ---
const MOCK_USER = {
    name: 'Sathish Shalini',
    goldBalance: 9290.00,
    silverBalance: 123.00,
    avatar: 'https://placehold.co/100x100/EBF4FF/76A9EA?text=SS'
};

const MOCK_TRANSACTIONS = [
    {
        id: '1',
        type: 'MONTHLY SCHEME',
        amount: 20000.00,
        date: '18-Jul-2025',
        ref: 'AM-74'
    }
];

const MOCK_BANNERS = [
    { id: '1', title: 'Sparkle Like The Stars', imageUrl: 'https://placehold.co/600x300/663399/FFFFFF?text=Sparkle+Like+Stars' },
    { id: '2', title: 'New Gold SIP Plans', imageUrl: 'https://placehold.co/600x300/008080/FFFFFF?text=New+Gold+SIP' },
    { id: '3', title: 'Invest in Digital Silver', imageUrl: 'https://placehold.co/600x300/708090/FFFFFF?text=Digital+Silver' },
];

// --- Reusable Components ---
const ActionIcon = ({ icon, label, onPress }) => (
    <TouchableOpacity style={styles.actionIconContainer} onPress={onPress}>
        <View style={styles.actionIconCircle}>
            <Text style={styles.actionIconText}>{icon}</Text>
        </View>
        <Text style={styles.actionIconLabel}>{label}</Text>
    </TouchableOpacity>
);

// --- Dashboard Screen Component ---
// This would be in its own file, e.g., `screens/DashboardScreen.js`
export default function DashboardScreen() {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.root}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.theme} />
      
      {/* Custom Header */}
      <View style={styles.header}>
        {/* <Text style={styles.headerTitle}>K. Chinnadurai</Text>
        <Text style={styles.headerVersion}>AV: 1.7.0</Text> */}
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* User Greeting and Avatar */}
        <View style={styles.greetingContainer}>
            <View>
                <Text style={styles.userName}>{MOCK_USER.name}</Text>
                <Text style={styles.greetingText}>Good Afternoon</Text>
            </View>
            <Image source={{ uri: MOCK_USER.avatar }} style={styles.avatar} />
        </View>

        {/* Balance Card */}
        <View style={styles.balanceCard}>
            <View style={styles.balanceSection}>
                <Text style={styles.balanceIcon}>💰</Text>
                <View>
                    <Text style={styles.balanceLabel}>Gold</Text>
                    <Text style={styles.balanceValue}>₹ {MOCK_USER.goldBalance.toLocaleString('en-IN')}</Text>
                </View>
            </View>
            <View style={styles.balanceDivider} />
            <View style={styles.balanceSection}>
                 <Text style={styles.balanceIcon}>🪙</Text>
                 <View>
                    <Text style={styles.balanceLabel}>Silver</Text>
                    <Text style={styles.balanceValue}>₹ {MOCK_USER.silverBalance.toLocaleString('en-IN')}</Text>
                </View>
            </View>
        </View>

        {/* Action Icons */}
        <View style={styles.actionsRow}>
            <ActionIcon icon="➕" label="Join Plan" onPress={() => {}} />
            <ActionIcon icon="🐷" label="My Plan" onPress={() => {}} />
            <ActionIcon icon="👤" label="My Profile" onPress={() => navigation.navigate('Profile')} />
            <ActionIcon icon="ℹ️" label="Help Center" onPress={() => {}} />
        </View>

        {/* Promo Banner */}
        <View style={styles.promoBanner}>
            <PromoCarousel 
            MOCK_BANNERS={MOCK_BANNERS}
            />
             
        </View>

        {/* Latest Transactions */}
        <View style={styles.transactionsContainer}>
            <View style={styles.transactionsHeader}>
                <Text style={styles.transactionsTitle}>Latest Transactions</Text>
                <TouchableOpacity>
                    <Text style={styles.seeAllText}>See All</Text>
                </TouchableOpacity>
            </View>
            {MOCK_TRANSACTIONS.map(tx => (
                <View key={tx.id} style={styles.transactionCard}>
                    <View style={styles.transactionIconContainer}>
                         <Text style={styles.transactionIcon}>🛕</Text>
                    </View>
                    <View style={styles.transactionDetails}>
                        <Text style={styles.transactionType}>{tx.type}</Text>
                        <Text style={styles.transactionDate}>{tx.date}</Text>
                    </View>
                    <View style={styles.transactionAmountContainer}>
                        <Text style={styles.transactionAmount}>₹ {tx.amount.toLocaleString('en-IN')}</Text>
                        <Text style={styles.transactionRef}>{tx.ref}</Text>
                    </View>
                </View>
            ))}
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

// --- Styles ---
const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: COLORS.theme,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: heightPercentageToDP('4%'),
    backgroundColor: COLORS.primary,
  },
  // Header
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: widthPercentageToDP('4%'),
    paddingVertical: heightPercentageToDP('1.5%'),
    backgroundColor: COLORS.theme,
    paddingTop: 50,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
  },
  menuIcon: {
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
  // Greeting
  greetingContainer: {
    backgroundColor: COLORS.theme,
    paddingHorizontal: widthPercentageToDP('4%'),
    paddingBottom: heightPercentageToDP('8%'),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    paddingTop: 16
  },
  userName: {
    fontFamily: FONTS.PoppinsSemiBold,
    color: COLORS.textLight,
    fontSize: FONT_SIZES.title,
  },
  greetingText: {
    fontFamily: FONTS.PoppinsRegular,
    color: COLORS.textLight,
    fontSize: FONT_SIZES.body,
  },
  avatar: {
    width: widthPercentageToDP('12%'),
    height: widthPercentageToDP('12%'),
    borderRadius: widthPercentageToDP('6%'),
    borderWidth: 2,
    borderColor: COLORS.accent,
  },
  // Balance Card
  balanceCard: {
    backgroundColor: COLORS.secondary,
    marginHorizontal: widthPercentageToDP('4%'),
    marginTop: -heightPercentageToDP('6%'), // Overlap header
    borderRadius: 20,
    padding: widthPercentageToDP('4%'),
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 8,
  },
  balanceSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  balanceIcon: {
    fontSize: FONT_SIZES.title,
    marginRight: widthPercentageToDP('2%'),
  },
  balanceLabel: {
    fontFamily: FONTS.PoppinsRegular,
    fontSize: FONT_SIZES.body,
    color: COLORS.textSecondary,
  },
  balanceValue: {
    fontFamily: FONTS.PoppinsBold,
    fontSize: FONT_SIZES.subtitle,
    color: COLORS.text,
  },
  balanceDivider: {
    height: '70%',
    width: 1,
    backgroundColor: '#E0C9A6',
  },
  // Actions Row
  actionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: widthPercentageToDP('4%'),
    marginTop: heightPercentageToDP('3%'),
  },
  actionIconContainer: {
    alignItems: 'center',
  },
  actionIconCircle: {
    width: widthPercentageToDP('15%'),
    height: widthPercentageToDP('15%'),
    borderRadius: widthPercentageToDP('7.5%'),
    backgroundColor: COLORS.iconBg,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: heightPercentageToDP('1%'),
  },
  actionIconText: {
    fontSize: FONT_SIZES.title,
  },
  actionIconLabel: {
    fontFamily: FONTS.PoppinsMedium,
    fontSize: FONT_SIZES.caption,
    color: COLORS.text,
  },
  // Promo Banner
  promoBanner: {
    marginHorizontal: widthPercentageToDP('4%'),
    marginTop: heightPercentageToDP('3%'),
    borderRadius: 15,
    overflow: 'hidden',
    height: heightPercentageToDP('15%'),
  },
  promoImage: {
    width: '100%',
    height: '100%',
  },
  // Transactions
  transactionsContainer: {
    marginTop: heightPercentageToDP('3%'),
    paddingHorizontal: widthPercentageToDP('4%'),
  },
  transactionsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: heightPercentageToDP('1.5%'),
  },
  transactionsTitle: {
    fontFamily: FONTS.PoppinsBold,
    fontSize: FONT_SIZES.subtitle,
    color: COLORS.text,
  },
  seeAllText: {
    fontFamily: FONTS.PoppinsMedium,
    fontSize: FONT_SIZES.body,
    color: COLORS.theme,
  },
  transactionCard: {
    backgroundColor: COLORS.secondary,
    borderRadius: 15,
    padding: widthPercentageToDP('4%'),
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  transactionIconContainer: {
    backgroundColor: COLORS.lightGold,
    padding: widthPercentageToDP('3%'),
    borderRadius: 10,
    marginRight: widthPercentageToDP('4%'),
  },
  transactionIcon: {
    fontSize: FONT_SIZES.subtitle,
  },
  transactionDetails: {
    flex: 1,
  },
  transactionType: {
    fontFamily: FONTS.PoppinsSemiBold,
    fontSize: FONT_SIZES.body,
    color: COLORS.text,
  },
  transactionDate: {
    fontFamily: FONTS.PoppinsRegular,
    fontSize: FONT_SIZES.small,
    color: COLORS.textSecondary,
  },
  transactionAmountContainer: {
    alignItems: 'flex-end',
  },
  transactionAmount: {
    fontFamily: FONTS.PoppinsBold,
    fontSize: FONT_SIZES.body,
    color: COLORS.theme,
  },
  transactionRef: {
    fontFamily: FONTS.PoppinsRegular,
    fontSize: FONT_SIZES.small,
    color: COLORS.textSecondary,
  },
});
