import React, { useCallback, useState } from 'react';
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
  FlatList,
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
import Banner from '@assets/banner-1.png';
import RenderIcon from '@src/components/icon';
import Gold from '@assets/gold.jpg';
import Silver from '@assets/silver.png';
import { useTranslation } from 'react-i18next';

// --- Mock Data ---
const MOCK_USER = {
  name: 'Sathish Shalini',
  goldBalance: 9290.0,
  silverBalance: 123.0,
  avatar: 'https://picsum.photos/seed/useravatar/100/100',
};

const MOCK_TRANSACTIONS = [
  {
    id: '1',
    type: 'MONTHLY SCHEME',
    amount: 20000.0,
    date: '18-Jul-2025',
    ref: 'AM-74',
  },
  {
    id: '2',
    type: 'MONTHLY SCHEME',
    amount: 20000.0,
    date: '18-Jul-2025',
    ref: 'AM-74',
  },
];

const MOCK_BANNERS = [
  {
    id: '1',
    title: 'Sparkle Like The Stars',
    imageUrl:
      'https://placehold.co/600x300/663399/FFFFFF?text=Sparkle+Like+Stars',
  },
  {
    id: '2',
    title: 'New Gold SIP Plans',
    imageUrl: 'https://placehold.co/600x300/008080/FFFFFF?text=New+Gold+SIP',
  },
  {
    id: '3',
    title: 'Invest in Digital Silver',
    imageUrl: 'https://placehold.co/600x300/708090/FFFFFF?text=Digital+Silver',
  },
];

export default function DashboardScreen() {
  const navigation = useNavigation(); // Use real useNavigation in your app
  const { t, i18n } = useTranslation(); // Use real useTranslation in your app
  const language = i18n.language;
  const isTamil = language === 'ta';
  const styles = getStyles(isTamil);

  const [activeIndex, setActiveIndex] = useState(0);

  const onViewableItemsChanged = useCallback(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setActiveIndex(viewableItems[0].index);
    }
  }, []);

  const ActionIcon = ({ icon, labelKey, onPress }) => (
    <TouchableOpacity style={styles.actionIconContainer} onPress={onPress}>
      <View style={styles.actionIconCircle}>
        <RenderIcon name={icon} size={24}  onPress={onPress}/>
      </View>
      <Text style={styles.actionIconLabel}>{t(labelKey)}</Text>
    </TouchableOpacity>
  );

  const renderBanner = ({ item }) => (
    <View style={styles.promoBanner}>
      <Image source={Banner} style={styles.promoImage} resizeMode="cover" />
    </View>
  );

  return (
    <SafeAreaView style={styles.root}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.theme} />

      <View style={styles.header}></View>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.greetingContainer}>
          <View>
            <Text style={styles.userName}>{MOCK_USER.name}</Text>
            <Text style={styles.greetingText}>{t('goodAfternoon')}</Text>
          </View>
          <Image source={{ uri: MOCK_USER.avatar }} style={styles.avatar} />
        </View>

        <View style={styles.balanceCard}>
          <View style={styles.balanceSection}>
            <Image
              source={Gold}
              style={styles.balanceIcon}
              resizeMode="cover"
            />{' '}
            <View>
              <Text style={styles.balanceLabel}>{t('gold')}</Text>
              <Text style={styles.balanceValue}>
                ₹ {MOCK_USER.goldBalance.toLocaleString('en-IN')}
              </Text>
            </View>
          </View>
          <View style={styles.balanceDivider} />
          <View style={styles.balanceSection}>
            <Image
              source={Silver}
              style={styles.balanceIcon}
              resizeMode="cover"
            />{' '}
            <View>
              <Text style={styles.balanceLabel}>{t('silver')}</Text>
              <Text style={styles.balanceValue}>
                ₹ {MOCK_USER.silverBalance.toLocaleString('en-IN')}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.actionsRow}>
          <ActionIcon
            icon="add"
            labelKey="joinPlan"
            onPress={() => navigation.navigate('JoinScheme')}
          />
          <ActionIcon
            icon="bag-handle-sharp"
            labelKey="myPlan"
            onPress={() => navigation.navigate('MyPlan')}
          />
          <ActionIcon
            icon="person"
            labelKey="myProfile"
            onPress={() => navigation.navigate('Profile')}
          />
          <ActionIcon
            icon="notifications"
            labelKey="notifications"
            onPress={() => navigation.navigate('Notifications')}
          />
        </View>

        <View style={styles.carouselContainer}>
          <FlatList
            data={MOCK_BANNERS}
            renderItem={renderBanner}
            keyExtractor={item => item.id}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onViewableItemsChanged={onViewableItemsChanged}
            viewabilityConfig={{ itemVisiblePercentThreshold: 50 }}
          />
          <View style={styles.paginationContainer}>
            {MOCK_BANNERS.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.paginationDot,
                  {
                    backgroundColor:
                      index === activeIndex
                        ? COLORS.theme
                        : COLORS.textSecondary,
                  },
                ]}
              />
            ))}
          </View>
        </View>

        <View style={styles.transactionsContainer}>
          <View style={styles.transactionsHeader}>
            <Text style={styles.transactionsTitle} numberOfLines={1}>
              {t('latestTransactions')}
            </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate('MyTransactions')}
            >
              <Text style={styles.seeAllText}>{t('seeAll')}</Text>
            </TouchableOpacity>
          </View>
          {MOCK_TRANSACTIONS.map(tx => (
            <View key={tx.id} style={styles.transactionCard}>
              <View style={styles.transactionIconContainer}>
                <RenderIcon name="file-tray-outline" size={22} />
              </View>
              <View style={styles.transactionDetails}>
                <Text style={styles.transactionType}>{tx.type}</Text>
                <Text style={styles.transactionDate}>{tx.date}</Text>
              </View>
              <View style={styles.transactionAmountContainer}>
                <Text style={styles.transactionAmount}>
                  ₹ {tx.amount.toLocaleString('en-IN')}
                </Text>
                <Text style={styles.transactionRef}>{tx.ref}</Text>
              </View>
            </View>
          ))}
        </View>
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
  const fontSemiBold = {
    fontFamily: isTamil ? FONTS.NotoSansTamilSemiBold : FONTS.PoppinsSemiBold,
  };
  const fontBold = {
    fontFamily: isTamil ? FONTS.NotoSansTamilBold : FONTS.PoppinsBold,
  };

  return StyleSheet.create({
    root: { flex: 1, backgroundColor: COLORS.theme },
    scrollContainer: {
      flexGrow: 1,
      paddingBottom: heightPercentageToDP('4%'),
      backgroundColor: COLORS.primary,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-end',
      paddingHorizontal: widthPercentageToDP('4%'),
      paddingVertical: heightPercentageToDP('1.5%'),
      backgroundColor: COLORS.theme,
      paddingTop: 50,
      borderBottomLeftRadius: 25,
      borderBottomRightRadius: 25,
    },
    langButton: {
      borderWidth: 1,
      borderColor: COLORS.white,
      borderRadius: 5,
      paddingHorizontal: 8,
      paddingVertical: 4,
    },
    langButtonText: { color: COLORS.white, ...fontMedium },
    greetingContainer: {
      backgroundColor: COLORS.theme,
      paddingHorizontal: widthPercentageToDP('4%'),
      paddingBottom: heightPercentageToDP('8%'),
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderBottomLeftRadius: 25,
      borderBottomRightRadius: 25,
      paddingTop: 16,
    },
    userName: {
      color: COLORS.textLight,
      fontSize: FONT_SIZES.title,
      ...fontSemiBold,
    },
    greetingText: {
      color: COLORS.textLight,
      fontSize: FONT_SIZES.body,
      ...fontRegular,
    },
    avatar: {
      width: widthPercentageToDP('12%'),
      height: widthPercentageToDP('12%'),
      borderRadius: widthPercentageToDP('6%'),
      borderWidth: 2,
      borderColor: COLORS.white,
    },
    balanceCard: {
      backgroundColor: COLORS.secondary,
      marginHorizontal: widthPercentageToDP('4%'),
      marginTop: -heightPercentageToDP('6%'),
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
    balanceSection: { flexDirection: 'row', alignItems: 'center' },
    balanceIcon: {
      width: 40,
      height: 40,
      marginRight: widthPercentageToDP('3%'),
      borderRadius: 20,
    },
    balanceLabel: {
      fontSize: FONT_SIZES.body,
      color: COLORS.textSecondary,
      ...fontRegular,
    },
    balanceValue: {
      fontSize: FONT_SIZES.subtitle,
      color: COLORS.text,
      ...fontBold,
    },
    balanceDivider: {
      height: '70%',
      width: 1,
      backgroundColor: COLORS.lightGray,
    },
    actionsRow: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      paddingHorizontal: widthPercentageToDP('4%'),
      marginTop: heightPercentageToDP('3%'),
    },
    actionIconContainer: {
      alignItems: 'center',
      width: isTamil? widthPercentageToDP('40%'): widthPercentageToDP('20%'),
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
    actionIconLabel: {
      fontSize: FONT_SIZES.caption,
      color: COLORS.text,
      textAlign: 'center',
      ...fontMedium,
    },
    carouselContainer: {
      marginTop: heightPercentageToDP('3%'),
      height: heightPercentageToDP('18%'),
      marginHorizontal: 16,
    },
    promoBanner: {
      width: SCREEN_WIDTH - 32,
      height: heightPercentageToDP('16%'),
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 15,
    },
    promoImage: { width: '100%', height: '100%', borderRadius: 15 },
    paginationContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      position: 'absolute',
      bottom: heightPercentageToDP('3%'),
      alignSelf: 'center',
    },
    paginationDot: {
      width: 8,
      height: 8,
      borderRadius: 4,
      marginHorizontal: 4,
    },
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
      fontSize: FONT_SIZES.subtitle,
      color: COLORS.text,
      ...fontBold,
      width:"70%"
    },
    seeAllText: {
      fontSize: FONT_SIZES.body,
      color: COLORS.theme,
      ...fontMedium,
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
      marginBottom: 16,
    },
    transactionIconContainer: {
      backgroundColor: COLORS.primary,
      padding: widthPercentageToDP('3%'),
      borderRadius: 25,
      marginRight: widthPercentageToDP('4%'),
    },
    transactionDetails: { flex: 1 },
    transactionType: {
      fontSize: FONT_SIZES.body,
      color: COLORS.text,
      ...fontSemiBold,
    },
    transactionDate: {
      fontSize: FONT_SIZES.small,
      color: COLORS.textSecondary,
      ...fontRegular,
    },
    transactionAmountContainer: { alignItems: 'flex-end' },
    transactionAmount: {
      fontSize: FONT_SIZES.body,
      color: COLORS.theme,
      ...fontBold,
    },
    transactionRef: {
      fontSize: FONT_SIZES.small,
      color: COLORS.textSecondary,
      ...fontRegular,
    },
  });
};
