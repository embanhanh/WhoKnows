import React from 'react';
import { View, StyleSheet, Image, Dimensions, ImageBackground } from 'react-native';

const PlayerCard = ({bubbleType, avatarAlignment}) => {
  const windowWidth = Dimensions.get('window').width;
  const avatarSize = windowWidth * 0.15; // Đặt kích thước avatarContainer dựa trên tỷ lệ màn hình

  return (
    <View style={styles.container}>
      <View style={[styles.avatarContainer, {alignSelf: avatarAlignment, width: avatarSize, height: avatarSize }]}>
        <Image source={require('../assets/img/Manager.jpg')} style={styles.avatar} />
      </View>
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
    borderRadius: 70, 
    borderWidth: 3, 
    borderColor: 'green', 
    overflow: 'hidden', 
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: "flex-end",
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
});

export default PlayerCard;
