import React from 'react';
import { View, StyleSheet, Image, Dimensions, ImageBackground, Text } from 'react-native';

const ManagerCard = () => {
  const windowWidth = Dimensions.get('window').width;
  const avatarSize = windowWidth * 0.15; // Kích thước avatarContainer dựa trên tỷ lệ màn hình
  const overlaySize = windowWidth * 0.11; // Kích thước overlayContainer dựa trên tỷ lệ màn hình

  return (
    <View style={styles.container}>
      <View style={[styles.avatarContainer, { width: avatarSize, height: avatarSize }]}>
        <Image source={require('../assets/img/Manager.jpg')} style={styles.avatar} />
      </View>
      <Image source={require('../assets/img/Crown.png')} style={styles.overlay} />
      {/* <Image source={require('../assets/img/Right.png')} style={styles.rightBubbleChat}></Image> */}
      <ImageBackground source={require('../assets/img/Left.png')} style={styles.leftBubbleChat}></ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
    width: "50%",
    marginVertical: "4%",
    paddingHorizontal: "5%",
  },
  avatarContainer: {
    borderRadius: 50, 
    borderWidth: 3, 
    borderColor: 'yellow', 
    overflow: 'hidden', 
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: "flex-start",
  },
  avatar: {
    width: '100%',
    height: '100%',
    borderRadius: 50, 
  },

  leftBubbleChat: {
    position: "absolute",
    width: "100%",
    height: "111%",
    left: "35%",
    bottom: "-34%"
  },

  rightBubbleChat: {
    position: "absolute",
    width: "100%",
    height: "110%",
    right: "35%",
    bottom: "-34%"
  },

  answerText: {
    position: "absolute",
    fontSize: 16,
    maxWidth: "100%",

  },

  overlay: {
    position: 'absolute',
    width: '20%',
    height: "20%",
    left: "22%",
    bottom: "9%",
    resizeMode: 'contain', 
  },
});

export default ManagerCard;
