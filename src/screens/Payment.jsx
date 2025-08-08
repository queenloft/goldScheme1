import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Image,
  StatusBar,
  ScrollView,
  TextInput,
  Dimensions,
  SafeAreaView
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

// --- Reusable Info Row Component ---
const InfoRow = ({ label, value, valueStyle }) => (
  <View style={styles.infoRow}>
    <Text style={styles.infoLabel}>{label}</Text>
    <Text style={[styles.infoValue, valueStyle]}>{value}</Text>
  </View>
);

const PaymentScreen = () => {
  const navigation = useNavigation();
  const { t, i18n } = useTranslation();
  const isTamil = i18n.language === 'ta';
  const styles = getStyles(isTamil);

  const [payAmount, setPayAmount] = useState('0.00');

  const InfoRow = ({ labelKey, value, valueStyle }) => (
    <View style={styles.infoRow}>
      <Text style={styles.infoLabel}>{t(labelKey)}</Text>
      <Text style={[styles.infoValue, valueStyle]}>{value}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.theme} />


        <Header
        isBack={true}
        title={t("appName")}
        />

      <View style={styles.titleBar}>
        <Text style={styles.titleText}>{t('monthlyEntry')}</Text>
      </View>

      <ScrollView
        style={styles.contentArea}
        contentContainerStyle={styles.contentContainer}
      >
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>{t('payAmount')}</Text>
          <TextInput
            style={styles.input}
            value={payAmount}
            onChangeText={setPayAmount}
            keyboardType="numeric"
            placeholder="0.00"
            placeholderTextColor={COLORS.theme}
          />
        </View>

        <View style={styles.detailsContainer}>
          <InfoRow labelKey="groupCode" value="AM" />
          <InfoRow labelKey="membershipNo" value="74" />
          <InfoRow labelKey="maturityDate" value="13-Jun-2026" />
          <InfoRow labelKey="instalment" value="1 / 12" />
          <InfoRow labelKey="discountRate" value="9190.00 /-" />
          <InfoRow
            labelKey="approxWeight"
            value="0.000 Grms."
            valueStyle={{
              color: COLORS.approxWeightGreen,
              fontFamily: styles.fontSemiBold.fontFamily,
            }}
          />
        </View>

        <Pressable style={styles.payButton}>
          <Text style={styles.payButtonText}>{t('payNow')}</Text>
        </Pressable>
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
    fontSemiBold, // Export for direct use
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
      fontSize: FONT_SIZES.subtitle,
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
      paddingVertical: heightPercentageToDP('2%'),
      marginHorizontal: widthPercentageToDP('4%'),
      borderRadius: 15,
      alignItems: 'center',
      zIndex: 10,
      elevation: 5,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
    },
    titleText: {
      color: COLORS.primaryDark,
      fontSize: FONT_SIZES.title,
      ...fontBold,
    },
    contentArea: {
      flex: 1,
      backgroundColor: COLORS.primary,
      marginTop: -heightPercentageToDP('3%'),
    },
    contentContainer: {
      paddingHorizontal: widthPercentageToDP('6%'),
      alignItems: 'center',
      paddingTop: heightPercentageToDP('7%'),
      paddingBottom: heightPercentageToDP('4%'),
    },
    inputContainer: {
      width: '100%',
      alignItems: 'center',
      marginBottom: heightPercentageToDP('4%'),
    },
    inputLabel: {
      fontSize: FONT_SIZES.body,
      ...fontRegular,
      color: COLORS.textSecondary,
      marginBottom: heightPercentageToDP('1%'),
    },
    input: {
      backgroundColor: COLORS.secondary,
      borderWidth: 1,
      borderColor: '#E0E0E0',
      borderRadius: 12,
      width: '60%',
      padding: heightPercentageToDP('1.5%'),
      textAlign: 'center',
      fontSize: FONT_SIZES.body,
      ...fontMedium,
      color: COLORS.text,
    },
    detailsContainer: {
      width: '100%',
      marginBottom: heightPercentageToDP('5%'),
    },
    infoRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: heightPercentageToDP('1.8%'),
      borderBottomWidth: 1,
      borderBottomColor: COLORS.white,
    },
    infoLabel: {
      fontSize: FONT_SIZES.body,
      ...fontRegular,
      color: COLORS.text,
    },
    infoValue: {
      fontSize: FONT_SIZES.body,
      ...fontSemiBold,
      color: COLORS.text,
    },
    payButton: {
      backgroundColor: COLORS.theme,
      width: '100%',
      paddingVertical: heightPercentageToDP('2%'),
      borderRadius: 12,
      alignItems: 'center',
      justifyContent: 'center',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
    payButtonText: {
      color: COLORS.secondary,
      fontSize: FONT_SIZES.subtitle,
      ...fontBold,
    },
  });
};

export default PaymentScreen;
