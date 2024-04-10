import React, { useContext, useState } from 'react';
import { View, StyleSheet, Image, Dimensions, TouchableOpacity, Text } from 'react-native';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import Icon from 'react-native-vector-icons/FontAwesome.js';

const PlayerVote = ({member, index, handleVote, handleCancelVote}) => {
    const windowWidth = Dimensions.get('window').width;
    const avatarSize = windowWidth * 0.12;

    const [showButtons, setShowButtons] = useState(false);
    const [isVote, setIsVote] = useState(false) 

    const handlePress = () => {
        setShowButtons(!showButtons); 
    };

    return (
    <View style={styles.container}>
      <TouchableOpacity activeOpacity={1} style={{...styles.avatarContainer, width: avatarSize, height: avatarSize }} onPress={handlePress}>
        <Image source={require('../assets/img/Manager.jpg')} style={styles.avatar} />
      </TouchableOpacity>

      {showButtons && ( 
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.buttonAccept} disabled={isVote} onPress={()=>handleVote(member, index,setIsVote)}>
                        <Icon name="check" style={styles.buttonIcon}></Icon>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttonCancel} disabled={!isVote} onPress={()=>handleCancelVote(member, index,setIsVote)}>
                        <Icon name="close" style={styles.buttonIcon}></Icon>
                    </TouchableOpacity>
                </View>
            )}
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        width: "45%",
        marginVertical: "5%",
        marginHorizontal: "2%",
        backgroundColor: "#1000CA",
        borderRadius: RFValue(50),
        flexDirection: "row",
    },
    avatarContainer: {
        position: "relative",
        borderRadius: RFValue(50), 
        borderWidth: RFValue(3), 
        borderColor: "orange",  
        alignItems: 'center',
        marginLeft: "6%",
        justifyConten5: 'center',
        marginVertical: "5%",
    },
    avatar: {
        width: '100%',
        height: '100%',
        borderRadius: RFValue(50), 
    },

    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: "center",
        marginRight: "20%",
    },
    buttonAccept: {
        backgroundColor: '#807722',
        borderRadius: RFValue(20),
        paddingHorizontal: "10%",
        paddingVertical: "10%",
        marginRight: "3%",
    },

    buttonCancel: {
        backgroundColor: '#AE2727',
        borderRadius: RFValue(20),
        paddingHorizontal: "12%",
        paddingVertical: "10%",
        marginLeft: "5%",
    },

    buttonIcon: {
        color: '#fff',
        fontSize: RFValue(14),
    },
});

export default PlayerVote;4