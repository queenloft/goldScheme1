import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  StatusBar,
  FlatList
} from 'react-native';
import {FONTS,FONT_SIZES,SCREEN_HEIGHT,SCREEN_WIDTH,widthPercentageToDP, heightPercentageToDP, COLORS, normalize} from '@src/config/index'
import RenderIcon from '@src/components/icon';



// Mock data for plan cards
const mockPlanData = [
  {
    id: '1',
    schemeType: 'MONTHLY SCHEME',
    groupCode: 'AM-74',
    paidAmount: 20000.00,
    paidWeight: 2.220,
    totalAmount: 240000.00,
    totalWeight: 26.64,
    progress: 8,
    maturityDate: '13-Jun-2026',
    joinDate: '18-Jul-2025',
    status: 'Active',
    cardColor: COLORS.cardBackground,
  },
  {
    id: '2',
    schemeType: 'QUARTERLY SCHEME',
    groupCode: 'QT-42',
    paidAmount: 45000.00,
    paidWeight: 5.125,
    totalAmount: 180000.00,
    totalWeight: 20.50,
    progress: 25,
    maturityDate: '15-Dec-2025',
    joinDate: '15-Mar-2025',
    status: 'Active',
    cardColor: COLORS.cardGradient1,
  },
  {
    id: '3',
    schemeType: 'YEARLY SCHEME',
    groupCode: 'YR-18',
    paidAmount: 150000.00,
    paidWeight: 17.850,
    totalAmount: 300000.00,
    totalWeight: 35.70,
    progress: 50,
    maturityDate: '20-Aug-2027',
    joinDate: '20-Aug-2024',
    status: 'Active',
    cardColor: COLORS.cardGradient2,
  },
  {
    id: '4',
    schemeType: 'FLEXIBLE SCHEME',
    groupCode: 'FL-91',
    paidAmount: 80000.00,
    paidWeight: 9.240,
    totalAmount: 120000.00,
    totalWeight: 13.86,
    progress: 67,
    maturityDate: '10-Oct-2025',
    joinDate: '10-Jan-2025',
    status: 'Nearing',
    cardColor: COLORS.cardGradient3,
  },
];

const GoldDashboard = ({navigation}) => {
      const totalSchemes = mockPlanData.length;
  const activeSchemes = mockPlanData.filter(plan => plan.status === 'Active').length;
  const balanceDue = mockPlanData.filter(plan => plan.progress < 100).length;
  const renderPlanCard = ({ item }) => (
    <View style={[ {  marginBottom: heightPercentageToDP('3%') }]}>

      {/* White Content Card */}
      <View style={styles.whiteCard}>
        {/* Scheme Header */}
        <View style={styles.schemeHeader}>
          <View style={styles.schemeHeaderTop}>
            <Text style={styles.schemeTitle}>{item.schemeType}</Text>
            <View style={[styles.statusBadge, { 
              backgroundColor: item.status === 'Active' ? COLORS.success : COLORS.orange 
            }]}>
              <Text style={styles.statusText}>{item.status}</Text>
            </View>
          </View>
          <Text style={styles.groupCode}>
            GroupCode-MsNo. <Text style={styles.groupCodeValue}>{item.groupCode}</Text>
          </Text>
        </View>

        {/* Amount and Weight Row */}
        <View style={styles.amountWeightRow}>
          <View style={styles.amountSection}>
            <Text style={styles.sectionLabel}>Paid Amount</Text>
            <Text style={styles.amountValue}>₹ {item.paidAmount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</Text>
            <Text style={styles.totalText}>of ₹ {item.totalAmount.toLocaleString('en-IN')}</Text>
          </View>
          <View style={styles.weightSection}>
            <Text style={styles.sectionLabel}>Paid Weight</Text>
            <Text style={styles.weightValue}>{item.paidWeight} g</Text>
            <Text style={styles.totalText}>of {item.totalWeight} g</Text>
          </View>
        </View>

        {/* Progress Bar */}
        <View style={styles.progressContainer}>
          <View style={styles.progressHeader}>
            <Text style={styles.progressLabel}>Progress</Text>
            <Text style={styles.progressPercentage}>{item.progress}%</Text>
          </View>
          <View style={styles.progressBackground}>
            <View style={[styles.progressFill, { width: `${item.progress}%` }]} />
          </View>
        </View>

        {/* Dates Row */}
        <View style={styles.datesContainer}>
          <View style={styles.dateRow}>
            <View style={styles.dateIndicator} />
            <Text style={styles.dateLabel}>Maturity</Text>
            <Text style={styles.dateValue}>{item.maturityDate}</Text>
          </View>
          <View style={styles.dateRow}>
            <View style={styles.dateIndicator} />
            <Text style={styles.dateLabel}>Join Date</Text>
            <Text style={styles.dateValue}>{item.joinDate}</Text>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.buttonRow}>
          <TouchableOpacity 
            style={[styles.payButton, { 
              opacity: item.progress >= 100 ? 0.5 : 1 
            }]}
            disabled={item.progress >= 100}
            onPress={()=> navigation.navigate("Payment")}
          >
            <Text style={styles.payButtonText}>
              {item.progress >= 100 ? 'COMPLETED' : 'PAY'}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.detailsButton} onPress={() => navigation.navigate('SchemeDetail')}>
            <Text style={styles.detailsButtonText}>DETAILS</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={COLORS.primary} barStyle="light-content" />
      
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
        <Text style={styles.loginHeaderText}>My Plan</Text>
      </View>

      <ScrollView 
        style={styles.scrollContainer} 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Stats Cards Row */}
        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <View style={styles.statIcon}>
              <Text style={styles.statIconText}>📦</Text>
            </View>
            <Text style={styles.statTitle}>Schemes</Text>
            <Text style={styles.statNumber}>{totalSchemes}</Text>
          </View>

          <View style={styles.statCard}>
            <View style={styles.statIcon}>
              <Text style={styles.statIconText}>⚖️</Text>
            </View>
            <Text style={styles.statTitle}>Balance Due</Text>
            <Text style={styles.statNumber}>{balanceDue}</Text>
          </View>
        </View>

        {/* Golden Card */}
        <View style={styles.goldenCard}>
          {/* Sync Info */}
          <View style={styles.syncContainer}>
            <View>
              <Text style={styles.syncLabel}>Last Sync</Text>
              <Text style={styles.syncTime}>02-Aug-2025 11:16 AM</Text>
            </View>
            <TouchableOpacity style={styles.refreshButton}>
              <Text style={styles.refreshText}>Refresh Data</Text>
              <View style={styles.refreshIcon}>
                <RenderIcon name="refresh-circle-outline" size={normalize(18)} color={COLORS.text} />
              </View>
            </TouchableOpacity>
          </View>
          </View>

                {/* Plan Cards List */}
      <FlatList
        data={mockPlanData}
        renderItem={renderPlanCard}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        ItemSeparatorComponent={() => <View style={styles.cardSeparator} />}
      />


      </ScrollView>

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
  scrollContainer: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: widthPercentageToDP('4%'),
    paddingBottom: heightPercentageToDP('3%'),
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: heightPercentageToDP('3%'),
    paddingHorizontal: widthPercentageToDP('2%'),
  },
  statCard: {
    alignItems: 'center',
    width: widthPercentageToDP('40%'),
  },
  statIcon: {
    width: widthPercentageToDP('12%'),
    height: widthPercentageToDP('12%'),
    borderRadius: widthPercentageToDP('3%'),
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: heightPercentageToDP('1%'),
  },
  statIconText: {
    fontSize: normalize(20),
  },
  statTitle: {
    color: COLORS.text,
    fontSize: FONT_SIZES.body,
    fontWeight: '500',
    marginBottom: heightPercentageToDP('0.5%'),
  },
  statNumber: {
    color: COLORS.text,
    fontSize: FONT_SIZES.extraLarge,
    fontWeight: 'bold',
  },
  goldenCard: {
    backgroundColor: COLORS.textLight,
    borderRadius: widthPercentageToDP('8%'),
    paddingVertical: heightPercentageToDP('3%'),
    paddingHorizontal: widthPercentageToDP('5%'),
    marginHorizontal: widthPercentageToDP('1%'),
        marginBottom: heightPercentageToDP('3%'),
        justifyContent:'space-between',

  },
  syncContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // marginBottom: heightPercentageToDP('2.5%'),
  },
  syncLabel: {
    color: COLORS.textDark,
    fontSize: FONT_SIZES.small,
    opacity: 0.7,
  },
  syncTime: {
    color: COLORS.textDark,
    fontSize: FONT_SIZES.caption,
    fontWeight: '600',
    marginTop: heightPercentageToDP('0.2%'),
  },
  refreshButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    paddingHorizontal: widthPercentageToDP('3%'),
    paddingVertical: heightPercentageToDP('1%'),
    borderRadius: widthPercentageToDP('5%'),
  },
  refreshText: {
    color: COLORS.text,
    fontSize: FONT_SIZES.small,
    marginRight: widthPercentageToDP('1%'),
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
  refreshIcon: {
    // backgroundColor: COLORS.text,
    borderRadius: widthPercentageToDP('3%'),
    width: widthPercentageToDP('6%'),
    height: widthPercentageToDP('6%'),
    justifyContent: 'center',
    alignItems: 'center',
  },whiteCard: {
    backgroundColor: COLORS.secondary,
    borderRadius: widthPercentageToDP('5%'),
    padding: widthPercentageToDP('5%'),
  },
  schemeHeader: {
    marginBottom: heightPercentageToDP('2.5%'),
  },
  schemeHeaderTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: heightPercentageToDP('0.5%'),
  },
  schemeTitle: {
    color: COLORS.textDark,
    fontSize: FONT_SIZES.title,
    fontWeight: 'bold',
    flex: 1,
  },
  statusBadge: {
    paddingHorizontal: widthPercentageToDP('2%'),
    paddingVertical: heightPercentageToDP('0.5%'),
    borderRadius: widthPercentageToDP('2%'),
  },
  statusText: {
    color: COLORS.secondary,
    fontSize: FONT_SIZES.extraSmall,
    fontWeight: 'bold',
  },
  groupCode: {
    color: COLORS.textSecondary,
    fontSize: FONT_SIZES.caption,
  },
  groupCodeValue: {
    color: COLORS.primary,
    fontWeight: '600',
  },
  amountWeightRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: heightPercentageToDP('2%'),
  },
  amountSection: {
    flex: 1,
  },
  weightSection: {
    flex: 1,
    alignItems: 'flex-end',
  },
  sectionLabel: {
    color: COLORS.orange,
    fontSize: FONT_SIZES.caption,
    fontWeight: '600',
    marginBottom: heightPercentageToDP('0.5%'),
  },
  amountValue: {
    color: COLORS.textDark,
    fontSize: FONT_SIZES.large,
    fontWeight: 'bold',
  },
  weightValue: {
    color: COLORS.textDark,
    fontSize: FONT_SIZES.large,
    fontWeight: 'bold',
  },
  totalText: {
    color: COLORS.textSecondary,
    fontSize: FONT_SIZES.small,
    marginTop: heightPercentageToDP('0.2%'),
  },
  progressContainer: {
    marginBottom: heightPercentageToDP('2.5%'),
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: heightPercentageToDP('0.8%'),
  },
  progressLabel: {
    color: COLORS.textSecondary,
    fontSize: FONT_SIZES.caption,
  },
  progressPercentage: {
    color: COLORS.primary,
    fontSize: FONT_SIZES.caption,
    fontWeight: 'bold',
  },
  progressBackground: {
    height: heightPercentageToDP('1%'),
    backgroundColor: COLORS.progressBackground,
    borderRadius: heightPercentageToDP('0.5%'),
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: COLORS.progressBar,
    borderRadius: heightPercentageToDP('0.5%'),
  },
  datesContainer: {
    marginBottom: heightPercentageToDP('3%'),
  },
  dateRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: heightPercentageToDP('1.5%'),
  },
  dateIndicator: {
    width: widthPercentageToDP('2.5%'),
    height: widthPercentageToDP('2.5%'),
    borderRadius: widthPercentageToDP('1.25%'),
    backgroundColor: COLORS.primary,
    marginRight: widthPercentageToDP('3%'),
  },
  dateLabel: {
    color: COLORS.textSecondary,
    fontSize: FONT_SIZES.body,
    flex: 1,
  },
  dateValue: {
    color: COLORS.orange,
    fontSize: FONT_SIZES.body,
    fontWeight: '600',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: widthPercentageToDP('4%'),
  },
  payButton: {
    flex: 1,
    backgroundColor: COLORS.primary,
    paddingVertical: heightPercentageToDP('2%'),
    borderRadius: widthPercentageToDP('6%'),
    alignItems: 'center',
  },
  detailsButton: {
    flex: 1,
    backgroundColor: COLORS.primary,
    paddingVertical: heightPercentageToDP('2%'),
    borderRadius: widthPercentageToDP('6%'),
    alignItems: 'center',
  },
  payButtonText: {
    color: COLORS.text,
    fontSize: FONT_SIZES.body,
    fontWeight: 'bold',
  },
  detailsButtonText: {
    color: COLORS.text,
    fontSize: FONT_SIZES.body,
    fontWeight: 'bold',
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

export default GoldDashboard;