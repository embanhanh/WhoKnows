import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

const MessageLine = ({ displayName, message, role }) => {
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
            <Text style={{...newStyles}}>{displayName}:  </Text>
            <Text style={styles.messageText} numberOfLines={2}>{message}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    messageLineContainer: {
        width: "90%", 
        flexDirection:"row", 
        marginLeft: "5%",
        marginBottom: 5
    },
    userName: {
        fontSize: RFValue(13),
        fontWeight: "bold",
    },
    messageText: {
        fontSize: RFValue(13),
        color: "white",
        maxWidth: "75%"
    },
});

export default MessageLine;
