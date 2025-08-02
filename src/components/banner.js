import React, { useState, useRef } from 'react';
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
import {
  FONTS,
  SCREEN_WIDTH,
  SCREEN_HEIGHT,
  COLORS,
  widthPercentageToDP,
  heightPercentageToDP,
} from '@src/config/index';

// --- Navigation Imports ---
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';
import Carousel, { Pagination } from 'react-native-snap-carousel'; // --- Carousel Component ---
const PromoCarousel = ({ MOCK_BANNERS }) => {
  const [activeSlide, setActiveSlide] = useState(0);
  const carouselRef = useRef(null);

  const renderBanner = ({ item }) => {
    return (
      <View style={styles.promoBanner}>
        <Image
          source={{ uri: item.imageUrl }}
          style={styles.promoImage}
          resizeMode="cover"
        />
      </View>
    );
  };

  return (
    <View style={styles.carouselContainer}>
      <Carousel
        ref={carouselRef}
        data={MOCK_BANNERS}
        renderItem={renderBanner}
        sliderWidth={SCREEN_WIDTH}
        itemWidth={widthPercentageToDP('92%')}
        onSnapToItem={index => setActiveSlide(index)}
        loop={true}
        autoplay={true}
        autoplayInterval={4000}
      />
      <Pagination
        dotsLength={MOCK_BANNERS.length}
        activeDotIndex={activeSlide}
        containerStyle={styles.paginationContainer}
        dotStyle={styles.paginationDot}
        inactiveDotStyle={styles.paginationInactiveDot}
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.6}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  // Carousel Styles
  carouselContainer: {
    marginTop: heightPercentageToDP('3%'),
    height: heightPercentageToDP('20%'),
  },
  promoBanner: {
    width: widthPercentageToDP('92%'),
    height: heightPercentageToDP('15%'),
    borderRadius: 15,
    overflow: 'hidden',
    alignSelf: 'center',
  },
  promoImage: {
    width: '100%',
    height: '100%',
  },
  paginationContainer: {
    paddingVertical: 8,
    marginTop: -heightPercentageToDP('3%'),
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.theme,
  },
  paginationInactiveDot: {
    backgroundColor: COLORS.textSecondary,
  },
});

export default PromoCarousel;
