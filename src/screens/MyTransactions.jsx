import React, { use, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Image,
  StatusBar,
  ScrollView,
  Dimensions,
  SafeAreaView,
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
  CONSTANTS,
} from '@src/config/index';
import RenderIcon from '@src/components/icon';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import Header from '@src/components/header';

// --- Mock Data for the Transaction List ---
const transactionsData = [
  {
    id: '1',
    date: '18-Jul-2025',
    amount: '20000.00',
    status: 'SUCCESS',
  },
  {
    id: '2',
    date: '15-Jul-2025',
    amount: '5000.00',
    status: 'SUCCESS',
  },
  {
    id: '3',
    date: '12-Jul-2025',
    amount: '1250.50',
    status: 'PENDING',
  },
  {
    id: '4',
    date: '10-Jul-2025',
    amount: '7800.00',
    status: 'FAILED',
  },
];

const TransactionsScreen = () => {
  const navigation = useNavigation();
  const { t, i18n } = useTranslation();
  const isTamil = i18n.language === 'ta';
  const styles = getStyles(isTamil);

  const [paymentStatus, setPaymentStatus] = useState('All');

  const getStatusIcon = statusKey => {
    switch (statusKey) {
      case 'success':
        return { name: 'checkmark-circle-outline', color: COLORS.success };
      case 'pending':
        return { name: 'hourglass-outline', color: COLORS.pending };
      case 'failed':
        return { name: 'close-circle-outline', color: COLORS.danger };
      default:
        return { name: 'help-circle-outline', color: COLORS.textSecondary };
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.theme} />

      <Header isBack={true} title={t('myTransactions')} />

      <View style={styles.titleBar}>
        <Text style={styles.titleText}>{t('myTransactions')}</Text>
      </View>

      <ScrollView
        style={styles.contentArea}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.dropdownLabel}>{t('paymentStatus')}</Text>
        <View style={styles.dropdown}>
          <Text style={styles.dropdownText}>{t('all')}</Text>
          <Text style={styles.dropdownArrow}>▼</Text>
        </View>

        <View style={styles.table}>
          <View style={styles.tableHeader}>
            <Text style={[styles.headerCell, { flex: 2.5 }]}>{t('date')}</Text>
            <Text style={[styles.headerCell, { flex: 2 }]}>{t('amount')}</Text>
            <Text style={[styles.headerCell, { flex: 1.5 }]}>
              {t('status')}
            </Text>
            <Text style={[styles.headerCell, { flex: 1 }]}>{t('pdf')}</Text>
          </View>

          {transactionsData.map(item => {
            const statusIcon = getStatusIcon(item.statusKey);
            return (
              <View key={item.id} style={styles.tableRow}>
                <Text style={[styles.rowCell, { flex: 2.5 }]}>{item.date}</Text>
                <Text style={[styles.rowCell, { flex: 2 }]}>
                  ₹ {item.amount}
                </Text>
                <View style={[styles.rowCell, styles.iconCell, { flex: 1.5 }]}>
                  {item?.status == 'SUCCESS' ? (
                    <RenderIcon
                      name="checkmark-circle-outline"
                      color={COLORS.success}
                      size={24}
                    />
                  ) : (
                    <RenderIcon
                      name="close-circle-outline"
                      color={COLORS.danger}
                      size={24}
                    />
                  )}
                </View>
                <View
                  style={[
                    styles.rowCell,
                    styles.iconCell,
                    { flex: 1, borderRightWidth: 0 },
                  ]}
                >
                  <Pressable
                    style={[styles.rowCell, styles.iconCell, { flex: 1 }]}
                  >
                    {/* Replace with a proper icon */}
                    <RenderIcon
                      name={'cloud-download-outline'}
                      color={COLORS.primaryDark}
                      size={24}
                    />
                  </Pressable>
                </View>
              </View>
            );
          })}
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
    container: { flex: 1, backgroundColor: COLORS.theme },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingTop: heightPercentageToDP('2%'),
      paddingBottom: heightPercentageToDP('2%'),
      paddingHorizontal: widthPercentageToDP('5%'),
    },
    headerName: {
      color: COLORS.secondary,
      fontSize: FONT_SIZES.medium,
      ...fontMedium,
    },
    langButton: {
      borderWidth: 1,
      borderColor: COLORS.white,
      borderRadius: 5,
      paddingHorizontal: 8,
      paddingVertical: 4,
    },
    langButtonText: { color: COLORS.white, ...fontMedium },
    titleBar: {
      backgroundColor: COLORS.primary,
      paddingVertical: heightPercentageToDP('2.5%'),
      marginHorizontal: widthPercentageToDP('4%'),
      borderRadius: 15,
      alignItems: 'center',
      zIndex: 10,
      elevation: 5,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      marginTop: heightPercentageToDP('1%'),
    },
    titleText: {
      color: COLORS.primaryDark,
      fontSize: FONT_SIZES.medium,
      ...fontBold,
    },
    contentArea: {
      flex: 1,
      backgroundColor: COLORS.primary,
      marginTop: -heightPercentageToDP('3.5%'),
      paddingTop: heightPercentageToDP('6%'),
      paddingHorizontal: widthPercentageToDP('4%'),
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
    },
    dropdownLabel: {
      fontSize: FONT_SIZES.body,
      ...fontMedium,
      color: COLORS.textSecondary,
      marginBottom: heightPercentageToDP('1%'),
      marginLeft: widthPercentageToDP('2%'),
    },
    dropdown: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: COLORS.secondary,
      borderWidth: 1,
      borderColor: '#E0E0E0',
      borderRadius: 12,
      paddingHorizontal: widthPercentageToDP('4%'),
      paddingVertical: heightPercentageToDP('1.5%'),
      marginBottom: heightPercentageToDP('3%'),
    },
    dropdownText: {
      fontSize: FONT_SIZES.body,
      ...fontSemiBold,
      color: COLORS.text,
    },
    dropdownArrow: {
      fontSize: FONT_SIZES.caption,
      color: COLORS.textSecondary,
    },
    table: {
      borderWidth: 1,
      borderColor: '#DEE2E6',
      borderRadius: 12,
      backgroundColor: COLORS.secondary,
      overflow: 'hidden',
    },
    tableHeader: {
      flexDirection: 'row',
      backgroundColor: '#F8F9FA',
      borderBottomWidth: 1,
      borderBottomColor: '#DEE2E6',
    },
    headerCell: {
      padding: widthPercentageToDP('3%'),
      color: COLORS.text,
      ...fontBold,
      fontSize: FONT_SIZES.caption,
      textAlign: 'center',
    },
    tableRow: {
      flexDirection: 'row',
      alignItems: 'center',
      borderBottomWidth: 1,
      borderBottomColor: '#E9ECEF',
    },
    rowCell: {
      paddingVertical: heightPercentageToDP('2%'),
      paddingHorizontal: widthPercentageToDP('2%'),
      ...fontRegular,
      fontSize: FONT_SIZES.caption,
      color: COLORS.text,
      textAlign: 'center',
      borderRightWidth: 1,
      borderRightColor: '#E9ECEF',
    },
    iconCell: { justifyContent: 'center', alignItems: 'center' },
  });
};

export default TransactionsScreen;
