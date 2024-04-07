import React, { useState } from "react";
import { View, Text, Modal, StyleSheet, Image, Dimensions, TextInput, SafeAreaView, TouchableOpacity } from "react-native";
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';

import Icon from 'react-native-vector-icons/FontAwesome.js';
import PlayerCard from "./playerCard";
import PlayerVote from "./playerVote";

function ModalGameVote({
    handleCloseVoteModal
}) {
    const windowWidth = Dimensions.get('window').width;
    const avatarSize = windowWidth * 0.25; 
    return ( 
        <Modal
                animationType="fade"
                transparent={true}
                visible={true}
            >
            <View style={styles.overlay} />
            <SafeAreaView style={styles.container}>
                <View style={styles.voteContainer}>
                    <Image source={require('../assets/img/owl.png')} style={styles.owlImage}></Image>
                    <View style={styles.titleContainer}>
                        <Text style={styles.titleText}>Bỏ phiếu</Text>
                    </View>

                    <View style={styles.voteListContainer}>
                        <View style={styles.voteList}>
                            <PlayerVote></PlayerVote>
                            <PlayerVote></PlayerVote>
                            <PlayerVote></PlayerVote>
                            <PlayerVote></PlayerVote>
                            <PlayerVote></PlayerVote>
                            <PlayerVote></PlayerVote>
                            <PlayerVote></PlayerVote>
                            <PlayerVote></PlayerVote>
                        </View>
                    </View>

                    <TouchableOpacity style={styles.closeButton} onPress={handleCloseVoteModal}>
                        <Icon name="close"  style={styles.closeIcon}></Icon>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </Modal>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },

    owlImage: {
        position: "absolute",
        width: '30%',
        height: '26%',
        top: "-25%",
        left: "1%",
    },

    voteContainer: {
        position: "relative",
        width: "90%",
        height: "61%",
        borderRadius: RFValue(20),
        backgroundColor:  "#29353B",
        alignItems: "center",
    },

    titleContainer: {
        flex: 2,
        justifyContent: "center",
        alignItems: "center",
    },

    titleText: {
        fontSize: RFValue(25), 
        fontWeight: "bold", 
        color: "white",
    },

    voteListContainer: {
        flex: 11,
        borderRadius: RFValue(20), 
        marginBottom: "7%",
        backgroundColor: "#00DDF9",
        marginHorizontal: "5%",
        justifyContent: "center"
    }, 

    voteList: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
    },

    closeButton: {
        backgroundColor: "#022728",
        borderRadius: RFValue(30),
        paddingHorizontal: "3%", 
        paddingVertical: "2%", 
        position: "absolute",
        top: "-4%",
        right: "-4%",
        justifyContent: "center",
        alignItems: "center",
    },

    closeIcon: {
        fontSize: RFValue(14),
        color: "white",
    },

    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
    },
})

export default ModalGameVote;