import React, { useContext } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, } from 'react-native';
import { useNavigation } from "@react-navigation/core";
import Icon from 'react-native-vector-icons/FontAwesome.js';
import Icons from 'react-native-vector-icons/Ionicons.js';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import { doc,updateDoc } from 'firebase/firestore';

import userContext from '../AuthContext/AuthProvider';
import { database } from '../../firebaseconfig';

const RoomBox = ({ id, locked, numPlayers, maxPlayers, roomMembers, handleJoinRoom }) => {
    const {user} = useContext(userContext)
    const navigation = useNavigation();

    return (
        <View style={styles.roomInfoContainer}>
            <Text flex={3} style={styles.textContent}>ID: {id}</Text>
            {locked ? <Icon flex={1} name="lock" style={styles.iconLock}></Icon> : <Text flex={1}></Text>}
            <Icons flex={1} name="people-outline" style={styles.iconPeople}></Icons>
            <Text flex={1.5} style={styles.textContent}>{numPlayers}/{maxPlayers}</Text>
            <TouchableOpacity style={styles.joinButton}>
                <View style={styles.backgroundJoinButton}/>
                <TouchableOpacity style={styles.textButton} onPress={()=>handleJoinRoom(id,roomMembers)}><Text>Vào</Text></TouchableOpacity>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    roomInfoContainer: {
        paddingVertical: "3%",
        paddingHorizontal: "3%",

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
        backgroundColor: "#103b7a",
        borderRadius: 15,
        position: "absolute",
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
    },

    iconPeople: {
        marginLeft: 25,
        fontSize: RFValue(20),
    },

    iconLock: {
        fontSize: RFValue(20),
    },
});

export default RoomBox;