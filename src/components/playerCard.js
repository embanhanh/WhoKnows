import React from 'react';
import { View, StyleSheet, Image, Dimensions, ImageBackground, Text } from 'react-native';

const PlayerCard = ({bubbleType, avatarAlignment, isManager, isYou, isEmpty}) => {
  const windowWidth = Dimensions.get('window').width;
  const avatarSize = windowWidth * 0.15; // Kích thước avatarContainer dựa trên tỷ lệ màn hình
  const overlaySize = windowWidth * 0.11; // Kích thước overlayContainer dựa trên tỷ lệ màn hình

  let newStyles = {};
  if(isManager){
    newStyles = {...styles.avatarContainer}
  }else if(isYou){
    newStyles = {...styles.avatarContainer, borderColor: 'green' }
  } else if(isEmpty){
    newStyles = {...styles.avatarContainer, borderColor: 'gray', backgroundColor: "#333" }
  }else{
    newStyles = {...styles.avatarContainer, borderColor: 'gray' }
  }

  return (
    <View style={styles.container}>
      <View style={{...newStyles,  alignSelf: avatarAlignment, width: avatarSize, height: avatarSize }}>
        {!isEmpty && <Image source={require('../assets/img/Manager.jpg')} style={styles.avatar} />}
        {
          isManager && <Image source={require('../assets/img/Crown.png')} style={styles.overlay} />
        }
      </View>
      {bubbleType === 'left' && (
        <ImageBackground source={require('../assets/img/Left.png')} style={styles.leftBubbleChat}>
          
        </ImageBackground>
      )}
      {bubbleType === 'right' && (
        <ImageBackground source={require('../assets/img/Right.png')} style={styles.rightBubbleChat}>
          
        </ImageBackground>
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
    width: "135%",
    height: "130%",
    bottom: "30%",
    left: "-9%",
  },

  rightBubbleChat: {
    position: "absolute",
    width: "135%",
    height: "130%",
    bottom: "30%",
    right: "38%",
  },

  answerText: {
    position: "absolute",
    fontSize: 16,
    maxWidth: "100%",

  },

  overlay: {
    position: 'absolute',
    width: '50%',
    height: "25%",
    left: "22%",
    top: "-25%",
  },
});

export default PlayerCard;
