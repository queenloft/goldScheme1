import React, { useTransition } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  StatusBar,
  FlatList,
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
import RenderIcon from '@src/components/icon';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import Header from '@src/components/header';

// Mock data for plan cards
const mockPlanData = [
  {
    id: '1',
    schemeType: 'MONTHLY SCHEME',
    groupCode: 'AM-74',
    paidAmount: 20000.0,
    paidWeight: 2.22,
    totalAmount: 240000.0,
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
    paidAmount: 45000.0,
    paidWeight: 5.125,
    totalAmount: 180000.0,
    totalWeight: 20.5,
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
    paidAmount: 150000.0,
    paidWeight: 17.85,
    totalAmount: 300000.0,
    totalWeight: 35.7,
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
    paidAmount: 80000.0,
    paidWeight: 9.24,
    totalAmount: 120000.0,
    totalWeight: 13.86,
    progress: 67,
    maturityDate: '10-Oct-2025',
    joinDate: '10-Jan-2025',
    status: 'Nearing',
    cardColor: COLORS.cardGradient3,
  },
];

const GoldDashboard = () => {
  const navigation = useNavigation();
  const { t, i18n } = useTranslation();
  const isTamil = i18n.language === 'ta';
  const styles = getStyles(isTamil);

  const totalSchemes = mockPlanData.length;
  const balanceDue = mockPlanData.filter(plan => plan.progress < 100).length;

  const renderPlanCard = ({ item }) => (
    <View style={styles.cardContainer}>
      <View style={styles.whiteCard}>
        <View style={styles.schemeHeader}>
          <View style={styles.schemeHeaderTop}>
            <Text style={styles.schemeTitle}>{t(item.schemeTypeKey)}</Text>
            <View
              style={[
                styles.statusBadge,
                {
                  backgroundColor:
                    item.status == 'Active' ? COLORS.success : COLORS.orange,
                },
              ]}
            >
              <Text style={styles.statusText}>{item?.status}</Text>
            </View>
          </View>
          <Text style={styles.groupCode}>
            {t('groupCode')}{' '}
            <Text style={styles.groupCodeValue}>{item.groupCode}</Text>
          </Text>
        </View>

        <View style={styles.amountWeightRow}>
          <View style={styles.amountSection}>
            <Text style={styles.sectionLabel}>{t('paidAmount')}</Text>
            <Text style={styles.amountValue}>
              ₹{' '}
              {item.paidAmount.toLocaleString('en-IN', {
                minimumFractionDigits: 2,
              })}
            </Text>
            <Text style={styles.totalText}>
              {t('of')} ₹ {item.totalAmount.toLocaleString('en-IN')}
            </Text>
          </View>
          <View style={styles.weightSection}>
            <Text style={styles.sectionLabel}>{t('paidWeight')}</Text>
            <Text style={styles.weightValue}>{item.paidWeight} g</Text>
            <Text style={styles.totalText}>
              {t('of')} {item.totalWeight} g
            </Text>
          </View>
        </View>

        <View style={styles.progressContainer}>
          <View style={styles.progressHeader}>
            <Text style={styles.progressLabel}>{t('progress')}</Text>
            <Text style={styles.progressPercentage}>{item.progress}%</Text>
          </View>
          <View style={styles.progressBackground}>
            <View
              style={[styles.progressFill, { width: `${item.progress}%` }]}
            />
          </View>
        </View>

        <View style={styles.datesContainer}>
          <View style={styles.dateRow}>
            <View style={styles.dateIndicator} />
            <Text style={styles.dateLabel}>{t('maturity')}</Text>
            <Text style={styles.dateValue}>{item.maturityDate}</Text>
          </View>
          <View style={styles.dateRow}>
            <View style={styles.dateIndicator} />
            <Text style={styles.dateLabel}>{t('joinDate')}</Text>
            <Text style={styles.dateValue}>{item.joinDate}</Text>
          </View>
        </View>

        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={[
              styles.actionButton,
              { opacity: item.progress >= 100 ? 0.5 : 1 },
            ]}
            disabled={item.progress >= 100}
            onPress={() => navigation.navigate('Payment')}
          >
            <Text style={styles.actionButtonText}>
              {t(item.progress >= 100 ? 'completed' : 'pay')}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.actionButton, styles.detailsButton]}
            onPress={() => navigation.navigate('SchemeDetail')}
          >
            <Text style={[styles.actionButtonText, styles.detailsButtonText]}>
              {t('details')}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={COLORS.theme} barStyle="light-content" />

      <Header isBack={true} title={t('myPlan')} />

      <ScrollView
        style={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <View style={styles.statIcon}>
              <RenderIcon name="cube-outline" size={24} color={COLORS.theme} />
            </View>
            <Text style={styles.statTitle}>{t('schemes')}</Text>
            <Text style={styles.statNumber}>{totalSchemes}</Text>
          </View>
          <View style={styles.statCard}>
            <View style={styles.statIcon}>
              <RenderIcon
                name="file-tray-outline"
                size={24}
                color={COLORS.theme}
              />
            </View>
            <Text style={styles.statTitle}>{t('balanceDue')}</Text>
            <Text style={styles.statNumber}>{balanceDue}</Text>
          </View>
        </View>

        <View style={styles.syncCard}>
          <View>
            <Text style={styles.syncLabel}>{t('lastSync')}</Text>
            <Text style={styles.syncTime}>02-Aug-2025 11:16 AM</Text>
          </View>
          <TouchableOpacity style={styles.refreshButton}>
            <Text style={styles.refreshText}>{t('refreshData')}</Text>
            <RenderIcon
              name="refresh-circle-outline"
              size={normalize(22)}
              color={COLORS.theme}
            />
          </TouchableOpacity>
        </View>

        <FlatList
          data={mockPlanData}
          renderItem={renderPlanCard}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
        />
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
    container: { flex: 1, backgroundColor: COLORS.primary },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: widthPercentageToDP('4%'),
      height: heightPercentageToDP('12%'),
      backgroundColor: COLORS.theme,
      borderBottomLeftRadius: 30,
      borderBottomRightRadius: 30,
      paddingTop: StatusBar.currentHeight,
    },
    headerText: {
      color: COLORS.white,
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
    scrollContainer: { flex: 1 },
    scrollContent: {
      paddingHorizontal: widthPercentageToDP('4%'),
      paddingBottom: heightPercentageToDP('3%'),
    },
    statsRow: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      marginVertical: heightPercentageToDP('2%'),
    },
    statCard: {
      alignItems: 'center',
      width: '48%',
      backgroundColor: COLORS.secondary,
      borderRadius: 15,
      padding: widthPercentageToDP('4%'),
      elevation: 3,
      shadowColor: '#000',
      shadowOpacity: 0.1,
      shadowRadius: 5,
      shadowOffset: { width: 0, height: 2 },
    },
    statIcon: { marginBottom: heightPercentageToDP('1%') },
    statTitle: {
      color: COLORS.textSecondary,
      fontSize: FONT_SIZES.body,
      ...fontMedium,
      marginBottom: 4,
      textAlign:'center'
    },
    statNumber: {
      color: COLORS.textDark,
      fontSize: FONT_SIZES.extraLarge,
      ...fontBold,
    },
    syncCard: {
      backgroundColor: COLORS.white,
      borderRadius: 15,
      padding: widthPercentageToDP('4%'),
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: heightPercentageToDP('3%'),
      elevation: 3,
      shadowColor: '#000',
      shadowOpacity: 0.1,
      shadowRadius: 5,
      shadowOffset: { width: 0, height: 2 },
    },
    syncLabel: {
      color: COLORS.textSecondary,
      fontSize: FONT_SIZES.small,
      ...fontRegular,
    },
    syncTime: {
      color: COLORS.textDark,
      fontSize: FONT_SIZES.caption,
      ...fontSemiBold,
    },
    refreshButton: { flexDirection: 'row', alignItems: 'center' },
    refreshText: {
      color: COLORS.theme,
      fontSize: FONT_SIZES.caption,
      ...fontMedium,
      marginRight: 5,
    },
    cardContainer: { marginBottom: heightPercentageToDP('2%') },
    whiteCard: {
      backgroundColor: COLORS.secondary,
      borderRadius: 15,
      padding: widthPercentageToDP('4%'),
      elevation: 3,
      shadowColor: '#000',
      shadowOpacity: 0.1,
      shadowRadius: 5,
      shadowOffset: { width: 0, height: 2 },
    },
    schemeHeader: {
      borderBottomWidth: 1,
      borderBottomColor: COLORS.lightGray,
      paddingBottom: 10,
      marginBottom: 10,
    },
    schemeHeaderTop: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 4,
    },
    schemeTitle: {
      color: COLORS.textDark,
      fontSize: FONT_SIZES.title,
      ...fontBold,
    },
    statusBadge: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: 5 },
    statusText: {
      color: COLORS.white,
      fontSize: FONT_SIZES.extraSmall,
      ...fontBold,
    },
    groupCode: {
      color: COLORS.textSecondary,
      fontSize: FONT_SIZES.caption,
      ...fontRegular,
    },
    groupCodeValue: { color: COLORS.theme, ...fontSemiBold },
    amountWeightRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 15,
    },
    amountSection: { flex: 1 },
    weightSection: { flex: 1, alignItems: 'flex-end' },
    sectionLabel: {
      color: COLORS.textSecondary,
      fontSize: FONT_SIZES.caption,
      ...fontMedium,
      marginBottom: 4,
    },
    amountValue: {
      color: COLORS.textDark,
      fontSize: FONT_SIZES.large,
      ...fontBold,
    },
    weightValue: {
      color: COLORS.textDark,
      fontSize: FONT_SIZES.large,
      ...fontBold,
    },
    totalText: {
      color: COLORS.textSecondary,
      fontSize: FONT_SIZES.small,
      ...fontRegular,
      marginTop: 2,
    },
    progressContainer: { marginBottom: 15 },
    progressHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 5,
    },
    progressLabel: {
      color: COLORS.textSecondary,
      fontSize: FONT_SIZES.caption,
      ...fontRegular,
    },
    progressPercentage: {
      color: COLORS.theme,
      fontSize: FONT_SIZES.caption,
      ...fontBold,
    },
    progressBackground: {
      height: 8,
      backgroundColor: COLORS.progressBackground,
      borderRadius: 4,
      overflow: 'hidden',
    },
    progressFill: {
      height: '100%',
      backgroundColor: COLORS.progressBar,
      borderRadius: 4,
    },
    datesContainer: {
      borderTopWidth: 1,
      borderTopColor: COLORS.lightGray,
      paddingTop: 15,
      marginBottom: 15,
    },
    dateRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
    dateIndicator: {
      width: 8,
      height: 8,
      borderRadius: 4,
      backgroundColor: COLORS.theme,
      marginRight: 10,
    },
    dateLabel: {
      color: COLORS.textSecondary,
      fontSize: FONT_SIZES.body,
      flex: 1,
      ...fontRegular,
    },
    dateValue: {
      color: COLORS.textDark,
      fontSize: FONT_SIZES.body,
      ...fontSemiBold,
    },
    buttonRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      gap: 10,
    },
    actionButton: {
      flex: 1,
      paddingVertical: 12,
      borderRadius: 8,
      alignItems: 'center',
      backgroundColor: COLORS.theme,
    },
    actionButtonText: {
      color: COLORS.white,
      fontSize: FONT_SIZES.body,
      ...fontBold,
    },
    detailsButton: {
      backgroundColor: COLORS.white,
      borderWidth: 1,
      borderColor: COLORS.theme,
    },
    detailsButtonText: { color: COLORS.theme },
  });
};

export default GoldDashboard;
