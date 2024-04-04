import React from 'react';
import { View, StyleSheet, Image, Dimensions, ImageBackground, Text } from 'react-native';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';

const PlayerCard = ({bubbleType, avatarAlignment, isManager, isYou, isEmpty, answer}) => {
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
            <Text style={styles.answerTextLeft}>{answer || ''}</Text>
        </ImageBackground>
      )}
      {bubbleType === 'right' && (
        <ImageBackground source={require('../assets/img/Right.png')} style={styles.rightBubbleChat}>
            <Text style={styles.answerTextRight}>{answer || ''}</Text>
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
    width: "97%",
    height: "115%",
    left: "41%",
    bottom: "7%",
    justifyContent: "center",
    alignItems: "center",
  },

  rightBubbleChat: {
    position: "absolute",
    width: "97%",
    height: "115%",
    bottom: "7%",
    right: "40%",
    justifyContent: "center",
    alignItems: "center",
  },

  answerTextLeft: {
    fontSize: RFPercentage(1.7),
    maxWidth: "100%",
    color: "white",
    fontWeight: "bold",
    maxWidth: "60%",
    marginTop: "5%",
  },

  answerTextRight: {
    fontSize: RFPercentage(1.7),
    maxWidth: "100%",
    color: "white",
    fontWeight: "bold",
    maxWidth: "60%",
    marginTop : "5%",
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
