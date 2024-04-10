import React, { useState } from "react";
import { View, Text, Modal, StyleSheet, Image, Dimensions, TextInput, SafeAreaView, TouchableOpacity } from "react-native";
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';

import Icon from 'react-native-vector-icons/FontAwesome.js';
import PlayerVote from "./playerVote";
import { doc, updateDoc } from 'firebase/firestore';
import { database } from '../../firebaseconfig';

function ModalGameVote({
    handleCloseVoteModal,
    roomMembers, 
    idRoom
}) {
    const windowWidth = Dimensions.get('window').width;
    const avatarSize = windowWidth * 0.25;

    const handleVote = async (member, index, setIsVote)=>{
        roomMembers[index].votes += 1
        await updateDoc(doc(database, "rooms", idRoom),{
            roomMembers: [...roomMembers]
        })
        setIsVote(true)
    }

    const handleCancelVote = async ()=>{
        await updateDoc(doc(database, "rooms", idRoom),{
            roomMembers: [...roomMembers]
        })
    }
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
                            {
                                roomMembers.map((member, index)=>
                                <PlayerVote key={index} member={member} index={index} 
                                    handleCancelVote={handleCancelVote} handleVote={handleVote}
                                />)
                            }
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
        justifyContent: "center",
        width: "90%"
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