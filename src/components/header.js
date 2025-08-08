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
import React from 'react';
import RenderIcon from '@src/components/icon';
import { useNavigation } from '@react-navigation/native';
import {
  FONTS,
  FONT_SIZES,
  widthPercentageToDP,
  heightPercentageToDP,
  COLORS,
} from '@src/config/index';
import { useTranslation } from 'react-i18next';
import useLanguageStore from '@src/hooks/useLanguageStore';


export default function Header({title, isBack }) {
  const navigation = useNavigation();
  const { t, i18n } = useTranslation();
  const {setLanguage} = useLanguageStore();
  const isTamil = i18n.language === 'ta';
  const styles = getStyles(isTamil);
  console.log(isBack)
  return (
    <View style={styles.header}>
      {isBack ? (
        <RenderIcon
          name="arrow-back"
          color={COLORS.white}
          size={30}
          onPress={() => navigation.goBack()}
        />
      ) : (
        <View style={{ width: 24 }} />
      )}
      <Text style={styles.headerTitle}>{title}</Text>
      <TouchableOpacity
        onPress={() =>{
            setLanguage(isTamil ? 'en' : 'ta');
            i18n.changeLanguage(isTamil ? 'en' : 'ta')
        } }
        style={styles.langButton}
      >
        <Text style={styles.langButtonText}>{isTamil ? 'EN' : 'TA'}</Text>
      </TouchableOpacity>
    </View>
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
  const fontBold = {
    fontFamily: isTamil ? FONTS.NotoSansTamilBold : FONTS.PoppinsBold,
  };

  return StyleSheet.create({
    root: { flex: 1, backgroundColor: COLORS.theme },
    scrollContainer: { flexGrow:1 },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: widthPercentageToDP('5%'),
      paddingVertical: heightPercentageToDP('1.5%'),
      backgroundColor: COLORS.theme,
      paddingTop: 60,
      borderBottomLeftRadius: 40,
      borderBottomRightRadius: 40,
    },
    headerTitle: {
      color: COLORS.textLight,
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
    langButtonText: { color: COLORS.white, ...fontMedium }

})

}
