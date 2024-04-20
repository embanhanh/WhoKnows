import React, { useContext } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, } from 'react-native';
import { useNavigation } from "@react-navigation/core";
import Icon from 'react-native-vector-icons/FontAwesome.js';
import Icons from 'react-native-vector-icons/Ionicons.js';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import { doc,updateDoc } from 'firebase/firestore';

import userContext from '../AuthContext/AuthProvider';
import { database } from '../../firebaseconfig';

const RoomBox = ({ id, locked, numPlayers, maxPlayers, handleJoinRoom }) => {
    const {user} = useContext(userContext)
    const navigation = useNavigation();

    return (
        <View style={styles.roomInfoContainer}>
            <Text flex={5} style={styles.textContent}>ID: {id}</Text>
            {locked ? <Icon flex={1} name="lock" style={styles.iconLock}></Icon> : <Text flex={1}></Text>}
            <Icons flex={1.5} name="people-outline" style={styles.iconPeople}></Icons>
            <Text flex={2} style={styles.textContent}>{numPlayers}/{maxPlayers}</Text>
            <TouchableOpacity style={styles.joinButton} onPress={()=>handleJoinRoom(id, locked)}>
                <Icon name="arrow-right" style={styles.joinIcon}></Icon>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    roomInfoContainer: {
        paddingVertical: "4%",
        paddingHorizontal: "3%",
        marginBottom: "7%",
        marginHorizontal: "3%",
        flexDirection: "row",
        backgroundColor: "#DDDDDD",
        borderRadius: RFValue(15),
        borderWidth: RFValue(2),
        borderColor: "#EF7C06",
        alignItems: "center",
        justifyContent: "space-between",
    },

    textContent: {
        fontSize: RFValue(15),
        fontWeight: "bold",
        color: "black",
        width: "50%",
    },

    joinButton: {
        paddingVertical: "3%",
        paddingHorizontal: "4%",
        borderRadius: RFValue(15),
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#1C5C51",
    },

    joinIcon: {
        fontSize: RFValue(12),
        color: "white"
    },

    iconPeople: {
        fontSize: RFValue(20),
    },

    iconLock: {
        fontSize: RFValue(15),
    },
});

export default RoomBox;