import React, { useEffect, useRef } from "react";
import { View, Text, Modal, StyleSheet, Image, Dimensions, TextInput, SafeAreaView, TouchableOpacity } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import { Divider } from 'react-native-paper';

import Icon from 'react-native-vector-icons/FontAwesome.js';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons.js';
import PagerView from 'react-native-pager-view';
import PlayerCard from "./playerCard";

function ModalGameVoteResult({
    handleCloseVoteResultModal,
    roomMembers,
    handleAfterShowVoteResult
}) {
    const topVotes = [...roomMembers]
    topVotes.sort((a, b) => b.votes - a.votes)
    useEffect(()=>{
        const id = setTimeout(()=>{
            handleCloseVoteResultModal()
        }, 5000)

        return ()=>{
            clearTimeout(id)
            handleAfterShowVoteResult(topVotes)
        }
    },[])


    return ( 
        <Modal
                animationType="fade"
                transparent={true}
                visible={true}
                onRequestClose={handleCloseVoteResultModal}
            >
            <View style={styles.overlay} />
            <SafeAreaView style={styles.container}>
                <View style={styles.voteResultContainer}>
                    <Image source={require('../assets/img/owl.png')} style={styles.owlImage}></Image>
                    <View style={styles.titleContainer}>
                        <Text style={styles.titleText}>Kẻ bị tình nghi</Text>
                    </View>

                    <View style={styles.playerListContainer}>
                        <View style={styles.playerList}>
                            {
                                topVotes.map((mb, index)=>{
                                    if(index<2){
                                        return <PlayerCard key={index} containerWidth={"33%"} displayName={mb.displayName}></PlayerCard>
                                    }else if(index === 2 && topVotes.length >= 6){
                                        return <PlayerCard key={index} containerWidth={"33%"} displayName={mb.displayName}></PlayerCard>
                                    }else{
                                        return
                                    }
                                })
                            }
                        </View>
                    </View>

                    <TouchableOpacity style={styles.closeButton} onPress={handleCloseVoteResultModal}>
                        <Icon name="close" style={styles.closeIcon}></Icon>
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
        width: '35%',
        height: '60%',
        top: "-57.2%",
        left: "0%",
    },

    voteResultContainer: {
        width: "85%",
        height: "32%",
        borderRadius: RFValue(20),
        backgroundColor:  "#29353B",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
    },

    titleContainer: {
        justifyContent: "center",
        alignItems: "center",
        marginVertical: "5%"
    },

    titleText: {
        fontSize: RFValue(21), 
        fontWeight: "bold", 
        color: "white",
    },

    playerListContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#06776A",
        width: "85%",
        marginBottom: "7%",
        borderRadius: RFValue(20),
    }, 

    playerList: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
        marginBottom: "7%",
        height: "auto"
    },

    closeButton: {
        backgroundColor: "#022728",
        borderRadius: RFValue(30),
        paddingHorizontal: "3%", 
        paddingVertical: "2%", 
        position: "absolute",
        top: "-3%",
        right: "-3%",
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

export default ModalGameVoteResult;