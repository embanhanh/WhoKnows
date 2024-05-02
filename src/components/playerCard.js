import React from 'react';
import { View, StyleSheet, Image, Dimensions, ImageBackground, Text, Button } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';

import * as Animatable from 'react-native-animatable';
import Icon from 'react-native-vector-icons/FontAwesome.js';

const PlayerCard = ({
  avatar,
  bubbleType, 
  avatarAlignment, 
  isManager, 
  isYou, 
  isEmpty, 
  answer, 
  answering, 
  isVoted, 
  displayName, 
  handleVote, 
  userId,
  containerWidth, 
  isStartVote,
  isGhost,
  isStart, 
  isReady,
  playerNumber,
  isShowVoteResult
}) => {
  const windowWidth = Dimensions.get('window').width;
  const avatarSize = windowWidth * 0.15; // Kích thước avatarContainer dựa trên tỷ lệ màn hình
  const overlaySize = windowWidth * 0.11; // Kích thước overlayContainer dựa trên tỷ lệ màn hình

  let newStyles = {};
  if(isManager && !isStart){
    newStyles = {...styles.avatarContainer}
  }else if(isYou){
    newStyles = {...styles.avatarContainer, borderColor: 'green' }
  } else if(isEmpty){
    newStyles = {...styles.avatarContainer, borderColor: 'gray', backgroundColor: "#333" }
  }else if(isGhost){
    newStyles = {...styles.avatarContainer, borderColor: 'purple'}
  }else{
    newStyles = {...styles.avatarContainer, borderColor: 'gray' }
  }

    return (
      <View style={{...styles.container, width: containerWidth}}>
        <View style={{...newStyles,  alignSelf: avatarAlignment, width: avatarSize, height: avatarSize }}>
          {!isEmpty && <Image source={avatar} style={styles.avatar} />}
          {
            isManager && !isStart &&<Image source={require('../assets/img/Crown.png')} style={styles.overlay} />
          }

          {(!isStartVote || isVoted || isYou) && <Text numberOfLines={1} ellipsizeMode="tail" 
              style={{color: "#fff", fontSize: 16, position:"absolute", bottom: "-50%", fontWeight: "600", width: "150%",textAlign: 'center'}}
            >
              {displayName}
            </Text>
          }

          {!isEmpty && <View style={{position: "absolute", width: "43%", height: "58%", top: "-30%", right: "85%"}}>
              <ImageBackground 
                source={require('../assets/img/NumberOfPlayer.png')} 
                style={[styles.numberBackground]}
              >
                <View style={styles.numberContainer}>
                  <Text style={styles.numberText}>{playerNumber}</Text>
                </View>
              </ImageBackground>
            </View>
          }

          {(!isStart && isReady) && <View style={styles.readyContainer}>
            <Icon name="check" style={styles.readyIcon}></Icon>
          </View>}  
          
          {(!isStart && !isReady && !isEmpty && !isShowVoteResult) && <View style={styles.unReadyContainer}>
            <Icon name="check" style={styles.unReadyIcon}></Icon>
          </View>}  

          {isStartVote && !isVoted && !isYou && <TouchableOpacity onPress={()=>handleVote(userId)} style={{backgroundColor: "#21a3fb", padding: 2, position: "absolute", top: 5,  borderRadius: 6, alignSelf: "center"}}>
              <Text style={{fontSize:14, color: "#fff"}}>+ Vote</Text>
          </TouchableOpacity>}
        </View>
        {bubbleType === 'left' && (answering || answer !== "") && (
            <ImageBackground source={require('../assets/img/Left.png')} style={styles.leftBubbleChat}>
              <Text style={styles.answerTextLeft}>{answer || ''}</Text>
            </ImageBackground>
        )}
        {bubbleType === 'right' && (answering || answer !== "") &&(
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
  
  unReadyContainer: {
    position:"absolute", 
    top: "-20%",
    left: "90%",
    borderWidth: RFValue(2),
    borderColor: "grey",
    paddingVertical: "2%",
    paddingHorizontal: "3%",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: RFValue(20),
  },

  readyContainer: {
    position:"absolute", 
    top: "-20%",
    left: "90%",
    paddingVertical: "6%",
    paddingHorizontal: "7%",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: RFValue(20),
    backgroundColor: "#D14F08"
  },

  unReadyIcon: {
    fontSize: RFValue(10),
    color: "grey"
  },
  
  readyIcon: {
    fontSize: RFValue(10),
    color: "#0C0F30",
  },

  numberBackground: {
    resizeMode: 'contain',
    justifyContent: "center", 
    alignItems: "center", 
  },

  numberContainer: {
    width: "60%", 
    height: "75%", 
    alignItems: "center", 
  },

  numberText: {
    fontSize: RFValue(12),
    fontWeight: "bold",
  }
});

export default PlayerCard;
