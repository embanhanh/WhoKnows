import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import Swiper from 'react-native-swiper';

const LoadingScreen = () => {
  return (
    <View style={styles.container}>
      <Swiper
        style={styles.wrapper}
        autoplay={true}
        autoplayTimeout={10}
        showsPagination={false}
      >
        <Image source={require('../assets/Loading/Loading1.jpg')} style={styles.slideImage} />
        <Image source={require('../assets/Loading/Loading2.jpg')} style={styles.slideImage} />
      </Swiper>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  wrapper: {},
  slideImage: {
    flex: 1,
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
});

export default LoadingScreen;
