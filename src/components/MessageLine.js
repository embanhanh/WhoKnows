// Trong file MessageLine.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';

const MessageLine = ({ email, message, role }) => {
    let newStyles = {};
    if(role === 'System'){
        newStyles = {...styles.userName, color: 'blue'}
    }else if(role === 'Manager'){
        newStyles = {...styles.userName, color: '#FCE83C' }
    }else if(role === 'You'){
        newStyles = {...styles.userName, color: '#67B86B' }
    }
    else{
        newStyles = {...styles.userName, color: '#65B4F4' }
    }

    return (
        <View style={styles.messageLineContainer}>
            <Text style={{...newStyles}}>{email}:  </Text>
            <Text style={styles.messageText}>{message}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    messageLineContainer: {
        height: "10%",
        width: "90%", 
        flexDirection:"row", 
        alignItems: "center",
        marginVertical:"2%",
        marginLeft: "5%",
    },
    userName: {
        fontSize: RFValue(13),
    },
    messageText: {
        fontSize: RFValue(13),
        color: "white",
    },
});

export default MessageLine;