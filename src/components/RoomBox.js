import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome.js';
import Icons from 'react-native-vector-icons/Ionicons.js';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';

const RoomBox = ({ id, locked, numPlayers, maxPlayers }) => {
    return (
        <View style={styles.roomInfoContainer}>
            <Text flex={3} style={styles.textContent}>ID: {id}</Text>
            {locked ? <Icon flex={1} name="lock" style={styles.iconLock}></Icon> : <Text flex={1}></Text>}
            <Icons flex={1} name="people-outline" style={styles.iconPeople}></Icons>
            <Text flex={1.5} style={styles.textContent}>{numPlayers}/{maxPlayers}</Text>
            <TouchableOpacity style={styles.joinButton}>
                <View style={styles.backgroundJoinButton}/>
                <Text style={styles.textButton}>Vào</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    roomInfoContainer: {
        paddingVertical: "3%",
        paddingHorizontal: "3%",
        width: "100%",
        height: "35%",
        marginBottom: "7%",
        flexDirection: "row",
        backgroundColor: "#DDDDDD",
        borderRadius: 15,
        alignItems: "center",
        justifyContent: "space-between",
    },

    textContent: {
        fontSize: 20,
        color: "black",
    },

    textButton: {
        fontSize: 20,
        color: "white",
        fontWeight: "bold",
    },

    joinButton: {
        position: "relative",
        paddingVertical: "3%",
        justifyContent: "center",
        alignItems: "center",
        minWidth: "20%",
    },

    backgroundJoinButton: {
        backgroundColor: "#009966",
        borderRadius: 15,
        position: "absolute",
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
    },

    iconPeople: {
        marginLeft: 30,
        fontSize: RFValue(20),
    },

    iconLock: {
        fontSize: RFValue(20),
    },
});

export default RoomBox;