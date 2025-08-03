// --- Font Definitions ---
import { Dimensions } from 'react-native'
export const FONTS = {
    PoppinsBold: 'Poppins-Bold',
    PoppinsMedium: 'Poppins-Medium',
    PoppinsRegular: 'Poppins-Regular',
    PoppinsLight: 'Poppins-Light',
    PoppinsExtraLight: 'Poppins-ExtraLight',
    PoppinsBlack: 'Poppins-Black',
    PoppinsThin: 'Poppins-Thin',    
    PoppinsExtraBold: 'Poppins-ExtraBold',
    PoppinsSemiBold: 'Poppins-SemiBold',
    PoppinsItalic: 'Poppins-Italic',
    PoppinsMediumItalic: 'Poppins-MediumItalic',
    PoppinsBoldItalic: 'Poppins-BoldItalic',
    PoppinsLightItalic: 'Poppins-LightItalic',
    PoppinsExtraLightItalic: 'Poppins-ExtraLightItalic',
    PoppinsBlackItalic: 'Poppins-BlackItalic',
    PoppinsThinItalic: 'Poppins-ThinItalic',
    PoppinsExtraBoldItalic: 'Poppins-ExtraBoldItalic',
    PoppinsSemiBoldItalic: 'Poppins-SemiBoldItalic',
    PoppinsExtraBoldItalic: 'Poppins-ExtraBoldItalic',
    PoppinsBlackItalic: 'Poppins-BlackItalic',
}

export const COLORS = {
  primary: '#f0f4f7',
  primaryDark: '#1a1a1a',
  secondary: '#FFFFFF',
  accent: '#e4e6fcff',
  theme: '#321deaff',
  text: '#1a1a1a',
  textLight: '#FFFFFF',
  textSecondary: '#6c757d',
  success: '#28a745',
  danger: '#dc3545',
    cardBackground: 'rgba(255, 215, 0, 0.9)',
  progressBar: '#FF8C00',
  progressBackground: '#0f4c3a',
    orange: '#FF8C00',
};

// --- Responsive Design Helpers ---
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');



export const widthPercentageToDP = (widthPercent) => {
  const elemWidth = typeof widthPercent === 'number' ? widthPercent : parseFloat(widthPercent);
  return (SCREEN_WIDTH * elemWidth) / 100;
};

export const heightPercentageToDP = (heightPercent) => {
  const elemHeight = typeof heightPercent === 'number' ? heightPercent : parseFloat(heightPercent);
  return (SCREEN_HEIGHT * elemHeight) / 100;
};

export const FONT_SIZES = {
  title: widthPercentageToDP('6%'),
  subtitle: widthPercentageToDP('4.5%'),
  body: widthPercentageToDP('4%'),
  caption: widthPercentageToDP('3.5%'),
  small: widthPercentageToDP('3%'),
    extraLarge: normalize(28),
  large: normalize(24),
  title: normalize(20),
  subtitle: normalize(18),
  body: normalize(16),
  caption: normalize(14),
  small: normalize(12),
  extraSmall: normalize(10),
};

export {
  SCREEN_WIDTH,
  SCREEN_HEIGHT,
}

// Responsive font scaling
const fontScale = SCREEN_WIDTH / 375; // Based on iPhone X width
export const normalize = (size) => {
  const newSize = size * fontScale;
  return Math.max(newSize, size * 0.8); // Minimum scale factor
};





