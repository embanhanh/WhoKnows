import React from 'react';
import { View, StyleSheet, Image, Dimensions, ImageBackground, Text, Button } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';

const PlayerCard = ({
  bubbleType, 
  avatarAlignment, 
  isManager, 
  isYou, 
  isEmpty, 
  answer, 
  answering, 
  isStartVote, 
  isVoted, 
  displayName, 
  handleVote, 
  index
}) => {
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
        {/* {playerName && <Text style={styles.playerName}>{playerName}</Text>} */}
        {
          isManager && <Image source={require('../assets/img/Crown.png')} style={styles.overlay} />
        }
        {(!isStartVote || isVoted || isYou) && <Text numberOfLines={1} ellipsizeMode="tail" 
            style={{color: "#fff", fontSize: 16, position:"absolute", bottom: "-40%", fontWeight: "600", width: "150%",textAlign: 'center'}}
          >
              {displayName}
          </Text>
        }
        {isStartVote && !isVoted && !isYou && <TouchableOpacity onPress={()=>handleVote(index)} style={{backgroundColor: "#21a3fb", padding: 2, position: "absolute", top: 5,  borderRadius: 6, alignSelf: "center"}}>
            <Text style={{fontSize:14, color: "#fff"}}>+ Vote</Text>
        </TouchableOpacity>}
      </View>
      {/* Vote */}
      {/* <TouchableOpacity style={styles.voteContainerLeft}>
        <View style={styles.voteContainerLeft}>
          <Text style={styles.voteText}>Vote</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={styles.voteContainerRight}>
          <Text style={styles.voteText}>Vote</Text>
      </TouchableOpacity> */}
      {/* //Tên người chơi */}
      {/* <View style={styles.playerNameContainerLeft}>
        <Text style={styles.playerName}>Thong</Text>
      </View>
      <View style={styles.playerNameContainerRight}>
        <Text style={styles.playerName}>Thongg</Text>
      </View> 
      {bubbleType === 'left' && answering && (
        <ImageBackground source={require('../assets/img/Left.png')} style={styles.leftBubbleChat}>
            <Text style={styles.answerTextLeft}>{answer || ''}</Text>
        </ImageBackground>
      )}
      {bubbleType === 'right' && answering &&(
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
  
  playerNameContainerLeft: {
    flex: 1,
    position: 'absolute',
    top: "100%",
    right: "80%",
    maxWidth: "100%",
    alignItems: "center",
    justifyContent: "center",
  },

  playerNameContainerRight: {
    position: 'absolute',
    top: "100%",
    left: "80%",
    maxWidth: "100%",
    alignItems: "center",
  },

  playerName: {
    color: "white",
    fontSize: 13,
  },

  voteContainerRight: {
    position: 'absolute',
    alignItems:"center",
    justifyContent: "center",
    top: "100%",
    left: "23%",
    paddingHorizontal: "5%",
    paddingVertical: "5%",
    //Width: "40",
    backgroundColor: "blue",
    borderRadius: RFValue(10), 
    borderColor: "red",
    //borderWidth: "1",

  },

  voteContainerLeft: {
    position: 'absolute',
    top: "100%",
    right: "23%",
    //maxWidth: "100%",
    backgroundColor: "blue",
    borderRadius: RFValue(10), 
    borderColor: "red",
  },

  voteText: {
    color: "white",
    fontSize: 13,
  },
});

export default PlayerCard;
