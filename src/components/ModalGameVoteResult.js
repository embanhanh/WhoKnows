import React, { useContext, useEffect, useRef } from "react";
import { View, Text, Modal, StyleSheet, Image, Dimensions, TextInput, SafeAreaView, TouchableOpacity } from "react-native";
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';

import Icon from 'react-native-vector-icons/FontAwesome.js';
import PlayerCard from "./playerCard";
import userContext from "../AuthContext/AuthProvider";
import * as Animatable from 'react-native-animatable';

function ModalGameVoteResult({
    handleCloseVoteResultModal,
    roomMembers,
}) {
    const {user} = useContext(userContext)
    const topVotes = [...roomMembers]
    topVotes.sort((a, b) => b.votes - a.votes)
    useEffect(()=>{
        const id = setTimeout(()=>{
            handleCloseVoteResultModal()
        }, 5000)

        return ()=>{
            clearTimeout(id)
        }
    },[])


    return ( 
        <Modal
                animationType="none"
                transparent={true}
                visible={true}
                onRequestClose={handleCloseVoteResultModal}
            >
            <View style={styles.overlay} />
            <SafeAreaView style={styles.container}>
                <Animatable.View 
                            animation="bounceIn" 
                            duration={1000}
                            style={styles.voteResultContainer}>
                    <Image source={require('../assets/img/owl.png')} style={styles.owlImage}></Image>
                    <View style={styles.titleContainer}>
                        <Text style={styles.titleText}>Kẻ bị tình nghi</Text>
                    </View>

                    <View style={styles.playerListContainer}>
                        <View style={styles.playerList}>
                            {
                                topVotes.map((mb, index)=>{
                                    if(index<2){
                                        return <PlayerCard key={index} containerWidth={"33%"} displayName={mb.displayName} 
                                                isYou={user.uid === mb.Id} isGhost={mb.isGhost} isShowVoteResult={true}>
                                            </PlayerCard>
                                    }else if(index === 2 && topVotes.length >= 6){
                                        return <PlayerCard key={index} containerWidth={"33%"} displayName={mb.displayName} 
                                                isYou={user.uid === mb.Id} isGhost={mb.isGhost} isShowVoteResult={true}>
                                            </PlayerCard>
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
                </Animatable.View>
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