import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  StatusBar,
  ImageBackground,
  Image
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
import { listenToSchemes, joinScheme } from '@src/services/firebase';
import useAuthStore from '@src/hooks/useAuthStore';
import Gold from '@assets/gold.jpg';
import Silver from '@assets/silver.png';

const JoinScheme = () => {
  const navigation = useNavigation();
  const { t, i18n } = useTranslation();
  const isTamil = i18n.language === 'ta';
  const styles = getStyles(isTamil);
  const { user } = useAuthStore();
  const [schemes, setSchemes] = useState([]);

  useEffect(() => {
    const unsub = listenToSchemes(snapshot => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setSchemes(data);
    });
    return unsub;
  }, []);

  const handleJoinNow = async scheme => {
    if (!user) return;
    try {
      await joinScheme(user.uid, scheme.id);
      navigation.navigate('Payment');
    } catch (e) {
      console.log("joinScheme error", e);
    }
  };

  const renderSchemeCard = scheme => {
    if (scheme.type === 'DigiGold') {
      return (
        <View style={styles.schemeCardWrapper} key={scheme.id}>
          <View
            style={[styles.schemeCard]}
          >
            <View style={styles.digiGoldContent}>
              <View style={styles.digiGoldLeft}>
                <Text
                  style={[styles.digiGoldTitle, { color: scheme.textColor }]}
                >
                  {t('digiGold').split(' ')[0]}{' '}
                  <Text style={styles.goldText}>
                    {t('digiGold').split(' ')[1]}
                  </Text>
                </Text>
                <Text
                  style={[styles.digiGoldSubtitle, { color: COLORS.orange }]}
                >
                  {t(scheme.subtitleKey)}
                </Text>
                <Text
                  style={[
                    styles.digiGoldDescription,
                    { color: scheme.textColor },
                  ]}
                >
                  {t(scheme.descriptionKey)}
                </Text>
                <Text
                  style={[styles.digiGoldPeriod, { color: scheme.textColor }]}
                >
                  {t(scheme.periodKey)}
                </Text>
              </View>
              <View style={styles.digiGoldRight}>
                
                  
  <Image
                source={Gold}
                style={styles.balanceIcon}
                resizeMode="cover"
              />
                               
               
              </View>
            </View>
          </View>
          <TouchableOpacity
            onPress={() => handleJoinNow(scheme)}
            style={styles.joinButton}
            activeOpacity={0.8}
          >
            <Text style={styles.joinButtonText}>{t('joinNow')}</Text>
          </TouchableOpacity>
        </View>
      );
    }

    if (scheme.type === 'SwarnaMithra') {
      return (
        <View style={styles.schemeCardWrapper} key={scheme.id}>
          <View
            style={[styles.schemeCard]}
          >
            <View style={styles.swarnaContent}>
              <Text style={[styles.swarnaTitle, { color: scheme.textColor }]}>
                {t(scheme.titleKey)}
              </Text>
              <Text style={[styles.swarnaSubtitle, { color: COLORS.theme }]}>
                {t(scheme.subtitleKey)}
              </Text>
              <Text
                style={[styles.swarnaDescription, { color: scheme.textColor }]}
              >
                {t(scheme.descriptionKey)}
              </Text>
              <Text
                style={[
                  styles.swarnaSubDescription,
                  { color: scheme.textColor },
                ]}
              >
                {t(scheme.subDescriptionKey)}
              </Text>
            </View>
            <View style={styles.swarnaDecoration}>
              <View style={styles.decorativeCircle1} />
              <View style={styles.decorativeCircle2} />
              <View style={styles.decorativeCircle3} />
            </View>
          </View>
          <TouchableOpacity
            onPress={() => handleJoinNow(scheme)}
            style={styles.joinButton}
            activeOpacity={0.8}
          >
            <Text style={styles.joinButtonText}>{t('joinNow')}</Text>
          </TouchableOpacity>
        </View>
      );
    }

    if (scheme.type === 'SwarnaLabam') {
      return (
        <View style={styles.schemeCardWrapper} key={scheme.id}>
          <View
            style={[styles.schemeCard]}
          >
            <View style={styles.labamContent}>
              <Text style={[styles.labamTitle, { color: scheme.textColor }]}>
                {t(scheme.titleKey)}
              </Text>
              <Text style={[styles.labamSubtitle, { color: COLORS.theme }]}>
                {t(scheme.subtitleKey)}
              </Text>
              <View style={styles.plansContainer}>
                <View style={styles.planItem}>
                  <Text style={[styles.planTitle, { color: scheme.textColor }]}>
                    {t(scheme.planA.titleKey)}
                  </Text>
                  <Text
                    style={[styles.planAmount, { color: scheme.textColor }]}
                  >
                    {t(scheme.planA.amountKey)}
                  </Text>
                </View>
                <View style={styles.planItem}>
                  <Text style={[styles.planTitle, { color: scheme.textColor }]}>
                    {t(scheme.planB.titleKey)}
                  </Text>
                  <Text
                    style={[styles.planAmount, { color: scheme.textColor }]}
                  >
                    {t(scheme.planB.amountKey)}
                  </Text>
                </View>
              </View>
            </View>
            <View style={styles.jewelryContainer}>
              <Text style={styles.jewelryEmoji}>💍</Text>
              <Text style={styles.jewelryEmoji}>📿</Text>
            </View>
          </View>
          <TouchableOpacity
            onPress={() => handleJoinNow(scheme)}
            style={styles.joinButton}
            activeOpacity={0.8}
          >
            <Text style={styles.joinButtonText}>{t('joinNow')}</Text>
          </TouchableOpacity>
        </View>
      );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={COLORS.theme} barStyle="light-content" />
      <Header
      isBack={true}
      title={t("joinPlanTitle")}
      />
      <View style={styles.goldenCard}>
        <ScrollView
          style={styles.whiteCard}
          showsVerticalScrollIndicator={false}
        >
          {schemes.map(scheme => renderSchemeCard(scheme))}
        </ScrollView>
      </View>
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
  const fontBold = {
    fontFamily: isTamil ? FONTS.NotoSansTamilBold : FONTS.PoppinsBold,
  };

  return StyleSheet.create({
    container: { flex: 1, backgroundColor: COLORS.theme },
    goldenCard: {
      flex: 1,
      backgroundColor: COLORS.primary,
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
      marginTop: heightPercentageToDP('2%'),
      paddingTop: heightPercentageToDP('3%'),
      paddingHorizontal: widthPercentageToDP('4%'),
    },
    whiteCard: { flex: 1, borderRadius: 20 },
    schemeCardWrapper: { marginBottom: heightPercentageToDP('4%') },
    schemeCard: {
      borderRadius: 20,
      padding: widthPercentageToDP('4%'),
      position: 'relative',
      overflow: 'hidden',
      backgroundColor: COLORS.accent,
      paddingBottom:40
    },
    joinButton: {
      backgroundColor: COLORS.lightGray,
      borderRadius: 30,
      paddingVertical: heightPercentageToDP('1.8%'),
      paddingHorizontal: widthPercentageToDP('8%'),
      alignItems: 'center',
      alignSelf: 'center',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.2,
      shadowRadius: 8,
      elevation: 8,
      marginTop: -heightPercentageToDP('3%'),
      zIndex: 10,
    },
    joinButtonText: {
      color: COLORS.text,
      fontSize: FONT_SIZES.body,
      ...fontBold,
      letterSpacing: 1,
    },

    // Digi Gold
    digiGoldContent: { flexDirection: 'row', alignItems: 'center' },
    digiGoldLeft: { flex: 1, paddingRight: widthPercentageToDP('4%') },
    digiGoldTitle: {
      fontSize: FONT_SIZES.large,
      ...fontBold,
      marginBottom: heightPercentageToDP('0.5%'),
    },
    goldText: { color: COLORS.gold },
    digiGoldSubtitle: {
      fontSize: FONT_SIZES.subtitle,
      ...fontMedium,
      marginBottom: heightPercentageToDP('1%'),
    },
    digiGoldDescription: {
      fontSize: FONT_SIZES.body,
      ...fontRegular,
      marginBottom: heightPercentageToDP('0.5%'),
    },
    digiGoldPeriod: { fontSize: FONT_SIZES.body, ...fontRegular },
    digiGoldRight: { alignItems: 'center' },
    phoneContainer: {
      width: widthPercentageToDP('20%'),
      height: heightPercentageToDP('12%'),
      backgroundColor: COLORS.primary,
      borderRadius: 15,
      padding: 5,
    },
        balanceIcon: {
      width: 100,
      height: 80,
      borderRadius: 20,
    },
    phoneScreen: {
      flex: 1,
      backgroundColor: COLORS.secondary,
      borderRadius: 10,
      justifyContent: 'center',
      alignItems: 'center',
    },
    piggyBank: { fontSize: normalize(30) },

    // Swarna Mithra
    swarnaContent: { zIndex: 2 },
    swarnaTitle: {
      fontSize: FONT_SIZES.large,
      ...fontBold,
      marginBottom: heightPercentageToDP('1%'),
    },
    swarnaSubtitle: {
      fontSize: FONT_SIZES.subtitle,
      ...fontMedium,
      marginBottom: heightPercentageToDP('1.5%'),
    },
    swarnaDescription: {
      fontSize: FONT_SIZES.caption,
      ...fontRegular,
      lineHeight: FONT_SIZES.body * 1.4,
    },
    swarnaSubDescription: {
      fontSize: FONT_SIZES.caption,
      ...fontRegular,
      lineHeight: FONT_SIZES.body * 1.4,
    },
    swarnaDecoration: {
      position: 'absolute',
      right: -widthPercentageToDP('5%'),
      top: -heightPercentageToDP('2%'),
      zIndex: 1,
    },
    decorativeCircle1: {
      width: widthPercentageToDP('20%'),
      height: widthPercentageToDP('20%'),
      borderRadius: widthPercentageToDP('10%'),
      backgroundColor: 'rgba(0, 105, 92, 0.1)',
      position: 'absolute',
    },
    decorativeCircle2: {
      width: widthPercentageToDP('15%'),
      height: widthPercentageToDP('15%'),
      borderRadius: widthPercentageToDP('7.5%'),
      backgroundColor: 'rgba(0, 105, 92, 0.15)',
      position: 'absolute',
      right: widthPercentageToDP('3%'),
      top: heightPercentageToDP('3%'),
    },
    decorativeCircle3: {
      width: widthPercentageToDP('10%'),
      height: widthPercentageToDP('10%'),
      borderRadius: widthPercentageToDP('5%'),
      backgroundColor: 'rgba(0, 105, 92, 0.2)',
      position: 'absolute',
      right: widthPercentageToDP('8%'),
      top: heightPercentageToDP('8%'),
    },

    // Swarna Labam
    labamContent: { zIndex: 2 },
    labamTitle: {
      fontSize: FONT_SIZES.large,
      ...fontBold,
      marginBottom: heightPercentageToDP('0.5%'),
    },
    labamSubtitle: {
      fontSize: FONT_SIZES.body,
      ...fontMedium,
      marginBottom: heightPercentageToDP('2%'),
    },
    plansContainer: { flexDirection: 'row', justifyContent: 'space-between' },
    planItem: { flex: 1, marginRight: widthPercentageToDP('2%') },
    planTitle: {
      fontSize: FONT_SIZES.body,
      ...fontMedium,
      marginBottom: heightPercentageToDP('0.5%'),
    },
    planAmount: {
      fontSize: FONT_SIZES.caption,
      ...fontRegular,
      lineHeight: FONT_SIZES.caption * 1.4,
    },
    jewelryContainer: {
      position: 'absolute',
      right: widthPercentageToDP('5%'),
      top: heightPercentageToDP('2%'),
      zIndex: 1,
    },
    jewelryEmoji: {
      fontSize: normalize(28),
      marginBottom: heightPercentageToDP('1%'),
    },
  });
};

export default JoinScheme;
