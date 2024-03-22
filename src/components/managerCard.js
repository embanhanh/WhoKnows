import React from 'react';
import { View, StyleSheet, Image, Dimensions, ImageBackground, Text } from 'react-native';

const ManagerCard = ({bubbleType, avatarAlignment}) => {
  const windowWidth = Dimensions.get('window').width;
  const avatarSize = windowWidth * 0.15; // Kích thước avatarContainer dựa trên tỷ lệ màn hình
  const overlaySize = windowWidth * 0.11; // Kích thước overlayContainer dựa trên tỷ lệ màn hình

  return (
    <View style={styles.container}>
      <View style={[styles.avatarContainer, { alignSelf: avatarAlignment, width: avatarSize, height: avatarSize }]}>
        <Image source={require('../assets/img/Manager.jpg')} style={styles.avatar} />
      </View>
      <Image source={require('../assets/img/Crown.png')} style={styles.overlay} />
      {/* <Image source={require('../assets/img/Right.png')} style={styles.rightBubbleChat}></Image> */}
      {bubbleType === 'left' && (
        <ImageBackground source={require('../assets/img/Left.png')} style={styles.leftBubbleChat}></ImageBackground>
      )}
      {bubbleType === 'right' && (
        <ImageBackground source={require('../assets/img/Right.png')} style={styles.rightBubbleChat}></ImageBackground>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    width: "50%",
    marginVertical: "4%",
    paddingHorizontal: "5%",
  },
  avatarContainer: {
    position: "relative",
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
    width: "140%",
    height: "130%",
    bottom: "30%",
    left: "-15%",
  },

  rightBubbleChat: {
    position: "absolute",
    width: "140%",
    height: "130%",
    bottom: "30%",
    right: "40%",
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
    bottom: "95%",
  },
});

export default ManagerCard;
