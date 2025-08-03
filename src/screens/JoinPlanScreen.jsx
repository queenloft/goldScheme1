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
  ImageBackground,
} from 'react-native';
import {FontAwesome } from '@react-native-vector-icons/fontawesome';
import {FONTS,FONT_SIZES,SCREEN_HEIGHT,SCREEN_WIDTH,widthPercentageToDP, heightPercentageToDP, COLORS, normalize} from '@src/config/index'
import RenderIcon from '@src/components/icon';


// Mock scheme data
const schemeData = [
  {
    id: '1',
    type: 'DigiGold',
    title: 'Digi Gold',
    subtitle: 'Daily Saving Scheme',
    description: 'Starting From Rs.100/-',
    period: 'Scheme Period 330 Days',
    bgColor: COLORS.digiGoldBg,
    textColor: COLORS.textDark,
    hasPhone: true,
  },
  {
    id: '2',
    type: 'SwarnaMithra',
    title: 'SWARNA MITHRA',
    subtitle: 'Start Saving Today !',
    description: 'Choose from flexible plan: Rs.1000/month,',
    subDescription: 'Rs.500/week, or Rs 100/day',
    bgColor: COLORS.swarnaGradient,
    textColor: COLORS.textDark,
    hasGradient: true,
  },
  {
    id: '3',
    type: 'SwarnaLabam',
    title: 'SWARNA LABAM',
    subtitle: '11 Month Advance Deposit',
    planA: {
      title: 'Plan A',
      amount: 'Mini Rs.25,000/-'
    },
    planB: {
      title: 'Plan B',
      amount: 'Mini Weight 4gram'
    },
    hasJewelry: true,
    isAdvanced: true,
  }
];

const JoinScheme = ({navigation}) => {

  const handleJoinNow = (scheme) => {
    console.log('Joining scheme:', scheme.type);
    // Handle join scheme logic here
  };

  const renderSchemeCard = (scheme) => {
    if (scheme.type === 'DigiGold') {
      return (
        <View style={styles.schemeCard} key={scheme.id}>
          <View style={[styles.digiGoldCard]}>
            <View style={styles.digiGoldContent}>
              <View style={styles.digiGoldLeft}>
                <View style={styles.digiGoldHeader}>
                  <Text style={[styles.digiGoldTitle, { color: scheme.textColor }]}>
                    Digi <Text style={styles.goldText}>Gold</Text>
                  </Text>
                </View>
                <Text style={[styles.digiGoldSubtitle, { color: COLORS.orange }]}>
                  {scheme.subtitle}
                </Text>
                <Text style={[styles.digiGoldDescription, { color: scheme.textColor }]}>
                  {scheme.description}
                </Text>
                <Text style={[styles.digiGoldPeriod, { color: scheme.textColor }]}>
                  {scheme.period}
                </Text>
              </View>
              
              <View style={styles.digiGoldRight}>
                <View style={styles.phoneContainer}>
                  <View style={styles.phoneScreen}>
                    <View style={styles.phoneContent}>
                      <Text style={styles.piggyBank}>🏦</Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </View>
          
          <TouchableOpacity 
            style={styles.joinButton}
            onPress={() => handleJoinNow(scheme)}
            activeOpacity={0.8}
          >
            <Text style={styles.joinButtonText}>JOIN NOW</Text>
          </TouchableOpacity>
        </View>
      );
    }

    if (scheme.type === 'SwarnaMithra') {
      return (
        <View style={styles.schemeCard} key={scheme.id}>
          <View style={[styles.swarnaCard]}>
            <View style={styles.swarnaContent}>
              <Text style={[styles.swarnaTitle, { color: scheme.textColor }]}>
                {scheme.title}
              </Text>
              <Text style={[styles.swarnaSubtitle, { color: COLORS.primary }]}>
                {scheme.subtitle}
              </Text>
              <Text style={[styles.swarnaDescription, { color: scheme.textColor }]}>
                {scheme.description}
              </Text>
              <Text style={[styles.swarnaSubDescription, { color: scheme.textColor }]}>
                {scheme.subDescription}
              </Text>
            </View>
            
            <View style={styles.swarnaDecoration}>
              <View style={styles.decorativeCircle1} />
              <View style={styles.decorativeCircle2} />
              <View style={styles.decorativeCircle3} />
            </View>
          </View>
          
          <TouchableOpacity 
            style={styles.joinButton}
            onPress={() => handleJoinNow(scheme)}
            activeOpacity={0.8}
          >
            <Text style={styles.joinButtonText}>JOIN NOW</Text>
          </TouchableOpacity>
        </View>
      );
    }

    if (scheme.type === 'SwarnaLabam') {
      return (
        <View style={styles.schemeCard} key={scheme.id}>
          <View style={[styles.labamCard]}>
            <View style={styles.labamContent}>
              <Text style={[styles.labamTitle, { color: scheme.textColor }]}>
                {scheme.title}
              </Text>
              <Text style={[styles.labamSubtitle, { color: COLORS.primary }]}>
                {scheme.subtitle}
              </Text>
              
              <View style={styles.plansContainer}>
                <View style={styles.planItem}>
                  <Text style={[styles.planTitle, { color: scheme.textColor }]}>
                    {scheme.planA.title}
                  </Text>
                  <Text style={[styles.planAmount, { color: scheme.textColor }]}>
                    {scheme.planA.amount}
                  </Text>
                </View>
                
                <View style={styles.planItem}>
                  <Text style={[styles.planTitle, { color: scheme.textColor }]}>
                    {scheme.planB.title}
                  </Text>
                  <Text style={[styles.planAmount, { color: scheme.textColor }]}>
                    {scheme.planB.amount}
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
            style={styles.joinButton}
            onPress={() => handleJoinNow(scheme)}
            activeOpacity={0.8}
          >
            <Text style={styles.joinButtonText}>JOIN NOW</Text>
          </TouchableOpacity>
        </View>
      );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={COLORS.primary} barStyle="light-content" />
      
      {/* Header */}
      <View style={styles.loginHeader}>
        <RenderIcon
          name="arrow-left"
          color={COLORS.secondary}
          size={22}
          onPress={() => navigation.goBack()}
          style={{
            paddingLeft: 32,
          }}
        />
        <Text style={styles.loginHeaderText}>Join Plan</Text>
      </View>

      {/* Golden Card Container */}
      <View style={styles.goldenCard}>
        {/* Title */}
        {/* <Text style={styles.cardTitle}>Join Scheme</Text> */}

        {/* White Content Card */}
        <ScrollView 
          style={styles.whiteCard}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {schemeData.map(scheme => renderSchemeCard(scheme))}
        </ScrollView>
      </View>

      {/* Bottom Indicator */}
      <View style={styles.bottomIndicator} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.theme,
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
  goldenCard: {
    flex: 1,
    backgroundColor: COLORS.primary,
    borderTopLeftRadius: widthPercentageToDP('8%'),
    borderTopRightRadius: widthPercentageToDP('8%'),
    marginTop: heightPercentageToDP('2%'),
    paddingTop: heightPercentageToDP('4%'),
    paddingHorizontal: widthPercentageToDP('5%'),
  },
  cardTitle: {
    color: COLORS.text,
    fontSize: FONT_SIZES.extraLarge,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: heightPercentageToDP('3%'),
  },
  whiteCard: {
    flex: 1,
    borderRadius: widthPercentageToDP('6%'),
  },
  scrollContent: {
    paddingBottom: heightPercentageToDP('5%'),
  },
  schemeCard: {
    marginBottom: heightPercentageToDP('3%'),
    backgroundColor: COLORS.digiGoldBg,
    borderRadius: widthPercentageToDP('6%'),

  },
  
  // Digi Gold Card Styles
  digiGoldCard: {
    borderRadius: widthPercentageToDP('4%'),
    padding: widthPercentageToDP('4%'),
    // marginBottom: heightPercentageToDP('1.5%'),
    
  },
  digiGoldContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  loginHeader: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: COLORS.theme,
    height: heightPercentageToDP('10%'),
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
  digiGoldLeft: {
    flex: 1,
    paddingRight: widthPercentageToDP('4%'),
  },
  digiGoldHeader: {
    marginBottom: heightPercentageToDP('1%'),
  },
  digiGoldTitle: {
    fontSize: FONT_SIZES.large,
    fontWeight: 'bold',
  },
  goldText: {
    color: COLORS.accent,
  },
  digiGoldSubtitle: {
    fontSize: FONT_SIZES.subtitle,
    fontWeight: '600',
    marginBottom: heightPercentageToDP('1%'),
  },
  digiGoldDescription: {
    fontSize: FONT_SIZES.body,
    marginBottom: heightPercentageToDP('0.5%'),
  },
  digiGoldPeriod: {
    fontSize: FONT_SIZES.body,
  },
  digiGoldRight: {
    alignItems: 'center',
  },
  phoneContainer: {
    width: widthPercentageToDP('20%'),
    height: heightPercentageToDP('8%'),
    backgroundColor: COLORS.primary,
    borderRadius: widthPercentageToDP('4%'),
    padding: widthPercentageToDP('1%'),
  },
  phoneScreen: {
    flex: 1,
    backgroundColor: COLORS.secondary,
    borderRadius: widthPercentageToDP('3%'),
    justifyContent: 'center',
    alignItems: 'center',
  },
  phoneContent: {
    alignItems: 'center',
  },
  coinContainer: {
    flexDirection: 'row',
    marginBottom: heightPercentageToDP('0.5%'),
  },
  coinEmoji: {
    fontSize: normalize(12),
    marginHorizontal: 1,
  },
  piggyBank: {
    fontSize: normalize(16),
  },

  // Swarna Mithra Card Styles
  swarnaCard: {
    borderRadius: widthPercentageToDP('4%'),
    padding: widthPercentageToDP('5%'),
    marginBottom: heightPercentageToDP('1.5%'),
    position: 'relative',
    overflow: 'hidden',
  },
  swarnaContent: {
    zIndex: 2,
  },
  swarnaTitle: {
    fontSize: FONT_SIZES.large,
    fontWeight: 'bold',
    marginBottom: heightPercentageToDP('1%'),
  },
  swarnaSubtitle: {
    fontSize: FONT_SIZES.subtitle,
    fontWeight: '600',
    marginBottom: heightPercentageToDP('1.5%'),
  },
  swarnaDescription: {
    fontSize: FONT_SIZES.body,
    lineHeight: FONT_SIZES.body * 1.3,
  },
  swarnaSubDescription: {
    fontSize: FONT_SIZES.body,
    lineHeight: FONT_SIZES.body * 1.3,
  },
  swarnaDecoration: {
    position: 'absolute',
    right: -widthPercentageToDP('5%'),
    top: -heightPercentageToDP('2%'),
    zIndex: 1,
  },
  decorativeCircle1: {
    width: widthPercentageToDP('15%'),
    height: widthPercentageToDP('15%'),
    borderRadius: widthPercentageToDP('7.5%'),
    backgroundColor: 'rgba(15, 76, 58, 0.1)',
    position: 'absolute',
  },
  decorativeCircle2: {
    width: widthPercentageToDP('10%'),
    height: widthPercentageToDP('10%'),
    borderRadius: widthPercentageToDP('5%'),
    backgroundColor: 'rgba(15, 76, 58, 0.15)',
    position: 'absolute',
    right: widthPercentageToDP('3%'),
    top: heightPercentageToDP('3%'),
  },
  decorativeCircle3: {
    width: widthPercentageToDP('8%'),
    height: widthPercentageToDP('8%'),
    borderRadius: widthPercentageToDP('4%'),
    backgroundColor: 'rgba(15, 76, 58, 0.2)',
    position: 'absolute',
    right: widthPercentageToDP('8%'),
    top: heightPercentageToDP('8%'),
  },

  // Swarna Labam Card Styles
  labamCard: {
    borderRadius: widthPercentageToDP('4%'),
    padding: widthPercentageToDP('5%'),
    marginBottom: heightPercentageToDP('1.5%'),
    position: 'relative',
    overflow: 'hidden',
  },
  labamContent: {
    zIndex: 2,
  },
  labamTitle: {
    fontSize: FONT_SIZES.large,
    fontWeight: 'bold',
    marginBottom: heightPercentageToDP('0.5%'),
  },
  labamSubtitle: {
    fontSize: FONT_SIZES.body,
    fontWeight: '600',
    marginBottom: heightPercentageToDP('2%'),
  },
  plansContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  planItem: {
    flex: 1,
    marginRight: widthPercentageToDP('2%'),
  },
  planTitle: {
    fontSize: FONT_SIZES.body,
    fontWeight: '600',
    marginBottom: heightPercentageToDP('0.5%'),
  },
  planAmount: {
    fontSize: FONT_SIZES.caption,
    lineHeight: FONT_SIZES.caption * 1.3,
  },
  jewelryContainer: {
    position: 'absolute',
    right: widthPercentageToDP('5%'),
    top: heightPercentageToDP('2%'),
    zIndex: 1,
  },
  jewelryEmoji: {
    fontSize: normalize(24),
    marginBottom: heightPercentageToDP('1%'),
  },

  // Join Button Styles
  joinButton: {
    backgroundColor: COLORS.primary,
    borderRadius: widthPercentageToDP('6%'),
    paddingVertical: heightPercentageToDP('1.8%'),
    paddingHorizontal: widthPercentageToDP('8%'),
    alignItems: 'center',
    alignSelf: 'center',
    shadowColor: COLORS.primary,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
    marginBottom:16
  },
  joinButtonText: {
    color: COLORS.text,
    fontSize: FONT_SIZES.body,
    fontWeight: 'bold',
    letterSpacing: 1,
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

export default JoinScheme;