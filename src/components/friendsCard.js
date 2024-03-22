import React from 'react';
import { View, StyleSheet, Image, Dimensions, ImageBackground } from 'react-native';

const FriendsCard = () => {
  const windowWidth = Dimensions.get('window').width;
  const avatarSize = windowWidth * 0.15; // Đặt kích thước avatarContainer dựa trên tỷ lệ màn hình

  return (
    <View style={styles.container}>
      <View style={[styles.avatarContainer, { width: avatarSize, height: avatarSize }]}>
        <Image source={require('../assets/img/Manager.jpg')} style={styles.avatar} />
      </View>
      {/* <ImageBackground source={require('../assets/img/Right.png')} style={styles.rightBubbleChat}></ImageBackground> */}
      <ImageBackground source={require('../assets/img/Left.png')} style={styles.leftBubbleChat}></ImageBackground>
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
    borderColor: 'gray', 
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
});

export default FriendsCard;
