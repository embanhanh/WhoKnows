import React from 'react';
import { View, StyleSheet, Image, Dimensions } from 'react-native';

const ManagerCard = () => {
  const windowWidth = Dimensions.get('window').width;
  const avatarSize = windowWidth * 0.15; // Kích thước avatarContainer dựa trên tỷ lệ màn hình
  const overlaySize = windowWidth * 0.11; // Kích thước overlayContainer dựa trên tỷ lệ màn hình

  return (
    <View style={styles.container}>
      <View style={[styles.avatarContainer, { width: avatarSize, height: avatarSize }]}>
        <Image source={require('../assets/img/Manager.jpg')} style={styles.avatar} />
      </View>
      <View style={[styles.overlayContainer, { top: avatarSize * 0.14, width: overlaySize, height: overlaySize }]}>
        <Image source={require('../assets/img/Crown.png')} style={styles.overlay} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: "10%",
    marginHorizontal: "10%",
  },
  avatarContainer: {
    borderRadius: 50, 
    borderWidth: 3, 
    borderColor: 'yellow', 
    overflow: 'hidden', 
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatar: {
    width: '100%',
    height: '100%',
    borderRadius: 50, 
  },

  overlayContainer: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: "-13%",
  },
  overlay: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain', 
  },
});

export default ManagerCard;
