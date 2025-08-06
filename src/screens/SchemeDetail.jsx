import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';
import {FONTS,FONT_SIZES,SCREEN_HEIGHT,SCREEN_WIDTH,widthPercentageToDP, heightPercentageToDP, COLORS} from '@src/config/index'
import RenderIcon from '@src/components/icon';

const MOCK_TRANSACTIONS = [
    {
        id: '1',
        type: 'MONTHLY SCHEME',
        amount: 20000.00,
        date: '18-Jul-2025',
        ref: 'AM-74'
    },
    {
        id: '2',
        type: 'MONTHLY SCHEME',
        amount: 20000.00,
        date: '18-Jul-2025',
        ref: 'AM-74'
    }
];
const GoldInvestmentTracker = ({navigation}) => {
  const progressPercentage = 8;
  const circumference = 2 * Math.PI * 45; // radius = 45
  const strokeDashoffset = circumference - (progressPercentage / 100) * circumference;

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
     <View style={styles.loginHeader}>
        <RenderIcon
          name="arrow-back"
          color={COLORS.secondary}
          size={24}
          onPress={() => navigation.goBack()}
          style={{
            paddingLeft: 32,
          }}
        />
        <Text style={styles.loginHeaderText}>Summary</Text>
      </View>

      {/* Sync Info */}
      <View style={styles.syncContainer}>
        <View>
          <Text style={styles.syncLabel}>Last Sync</Text>
          <Text style={styles.syncTime}>02-Aug-2025 11:16 AM</Text>
        </View>
        <TouchableOpacity style={styles.refreshButton}>
          <Text style={styles.refreshText}>Refresh Data</Text>
          <RenderIcon name="refresh-circle-outline" size={20} color={COLORS.text} />
        </TouchableOpacity>
      </View>

      {/* Customer Info */}
      <View style={styles.customerContainer}>
        <View>
          <Text style={styles.label}>Name</Text>
          <Text style={styles.customerName}>Sathish</Text>
        </View>
        <View style={styles.customerRight}>
          <Text style={styles.label}>Group Code/Ms No.</Text>
          <Text style={styles.groupCode}>AM / 74</Text>
        </View>
      </View>

      <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        {/* Main Stats Container */}
        <View style={styles.statsContainer}>
          {/* Progress Circle */}
          <View style={styles.progressSection}>
            <View style={styles.progressCircle}>
              <Text style={styles.progressLabel}>Paid</Text>
              <Text style={styles.progressPercentage}>8%</Text>
            </View>
          </View>

          {/* Right Side Stats */}
          <View style={styles.rightStats}>
            <View style={styles.statItem}>
              <View style={styles.statIcon}>
                <Text style={styles.iconText}>📅</Text>
              </View>
              <View>
                <Text style={styles.statValue}>1/12</Text>
                <Text style={styles.statLabel}>Total Month</Text>
              </View>
            </View>

            <View style={styles.statItem}>
              <View style={styles.statIcon}>
                <Text style={styles.iconText}>📅</Text>
              </View>
              <View>
                <Text style={styles.statValue}>13-Jun-2026</Text>
                <Text style={styles.statLabel}>Maturity date</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Bottom Stats */}
        <View style={styles.bottomStats}>
          <View style={styles.bottomStatItem}>
            <View style={styles.statIconLarge}>
              <Text style={styles.iconText}>⚖️</Text>
            </View>
            <View>
              <Text style={styles.bottomStatValue}>2.220 gram</Text>
              <Text style={styles.bottomStatLabel}>Paid Weight</Text>
            </View>
          </View>

          <View style={styles.bottomStatItem}>
            <View style={styles.statIconLarge}>
              <Text style={styles.iconText}>⚖️</Text>
            </View>
            <View>
              <Text style={styles.bottomStatValue}>2.220 gram</Text>
              <Text style={styles.bottomStatLabel}>Total Weight</Text>
            </View>
          </View>

          <View style={styles.bottomStatItem}>
            <View style={styles.statIconLarge}>
              <Text style={styles.iconText}>💰</Text>
            </View>
            <View>
              <Text style={styles.bottomStatValue}>₹20000.00</Text>
              <Text style={styles.bottomStatLabel}>Total Amount</Text>
            </View>
          </View>
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
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
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
  headerCenter: {
    alignItems: 'center',
    flex: 1,
  },
  logoContainer: {
    marginBottom: 5,
  },
  logoText: {
    fontSize: 24,
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
  },
  syncContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 15,
  },
  syncLabel: {
    color: COLORS.textSecondary,
    fontSize: FONT_SIZES.small,
  },
  syncTime: {
    color: COLORS.text,
    fontSize: FONT_SIZES.caption,
    fontWeight: '500',
  },
  refreshButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.primaryLight,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
  },
  refreshText: {
    color: COLORS.text,
    fontSize: FONT_SIZES.small,
    marginRight: 5,
  },
  customerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginTop:12

  },
  customerRight: {
    alignItems: 'flex-end',
  },
  label: {
    color: COLORS.textSecondary,
    fontSize: FONT_SIZES.small,
    marginBottom: 2,
  },
  customerName: {
    color: COLORS.text,
    fontSize: FONT_SIZES.subtitle,
    fontWeight: '600',
  },
  groupCode: {
    color: COLORS.text,
    fontSize: FONT_SIZES.subtitle,
    fontWeight: '600',
  },
  scrollContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  statsContainer: {
    flexDirection: 'row',
    marginVertical: 20,
    alignItems: 'center',
  },
  progressSection: {
    flex: 1,
    alignItems: 'center',
  },
  progressCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: COLORS.success,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  progressLabel: {
    color: COLORS.textDark,
    fontSize: FONT_SIZES.caption,
    fontWeight: '600',
  },
  progressPercentage: {
    color: COLORS.textDark,
    fontSize: FONT_SIZES.title,
    fontWeight: 'bold',
  },
  rightStats: {
    flex: 1,
    paddingLeft: 20,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  statIcon: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  iconText: {
    fontSize: 16,
  },
  statValue: {
    color: COLORS.text,
    fontSize: FONT_SIZES.body,
    fontWeight: '600',
  },
  statLabel: {
    color: COLORS.textSecondary,
    fontSize: FONT_SIZES.small,
  },
  bottomStats: {
    marginVertical: 20,
  },
  bottomStatItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  statIconLarge: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
    backgroundColor: COLORS.primaryLight,
    borderRadius: 8,
  },
  bottomStatValue: {
    color: COLORS.text,
    fontSize: FONT_SIZES.body,
    fontWeight: '600',
  },
  bottomStatLabel: {
    color: COLORS.textSecondary,
    fontSize: FONT_SIZES.small,
  },
  
  transactionsContainer: {
    minHeight:300,
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
    backgroundColor: COLORS.primary,
    borderRadius: 15,
    padding: widthPercentageToDP('4%'),
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
    marginBottom:16
  },
  transactionIconContainer: {
    backgroundColor: COLORS.secondary,
    padding: widthPercentageToDP('3%'),
    borderRadius: 25,
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
  transactionsContainer: {
    backgroundColor: COLORS.secondary,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    marginTop: 20,
    marginHorizontal: -20,
    paddingBottom: 40,
    
  },
  transactionsTitle: {
    color: COLORS.textDark,
    fontSize: FONT_SIZES.subtitle,
    fontWeight: '600',
    marginBottom: 20,
  },
  transactionItem: {
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    padding: 15,
  },
  transactionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  transactionDate: {
    color: COLORS.textDark,
    fontSize: FONT_SIZES.caption,
    fontWeight: '600',
    flex: 1,
  },
  transactionRate: {
    color: COLORS.textDark,
    fontSize: FONT_SIZES.caption,
    fontWeight: '600',
    flex: 1,
    textAlign: 'center',
  },
  transactionAmount: {
    color: COLORS.textDark,
    fontSize: FONT_SIZES.caption,
    fontWeight: '600',
    flex: 1,
    textAlign: 'center',
  },
  transactionWeight: {
    color: COLORS.textDark,
    fontSize: FONT_SIZES.caption,
    fontWeight: '600',
    flex: 1,
    textAlign: 'right',
  },
  transactionLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  transactionLabel: {
    color: '#6c757d',
    fontSize: FONT_SIZES.small,
    flex: 1,
  },
});

export default GoldInvestmentTracker;