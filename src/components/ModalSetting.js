import React, { useState, useContext, useCallback } from "react";
import { View, Text, TouchableOpacity, Modal, StyleSheet, Image } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome.js';
import Slider from '@react-native-community/slider';
import * as Animatable from 'react-native-animatable';

import SoundVolumeContext from "../AuthContext/SoundProvider.js";
import { SafeAreaView } from "react-native-safe-area-context";

function ModalSetting({setModalVisible}) {
    const { volume,setVolume } = useContext(SoundVolumeContext)


    return ( 
        <Modal
            animationType="none"
            transparent={true}
            visible={true}
            onRequestClose={() => {
                setModalVisible(false);
            }}
        >
            <SafeAreaView style={styles.container}>
                <View style={styles.overlay} />
                <Animatable.View animation="bounceIn" 
                                duration={500} 
                                style={styles.settingContainer}>
                    <Image source={require('../assets/img/owl.png')} style={styles.owlImage}></Image>
                    <TouchableOpacity style={styles.closeButton} onPress={()=>{setModalVisible(false);}}>
                        <Icon name="close" style={styles.closeIcon}></Icon>
                    </TouchableOpacity>
                    <View style={styles.headerContainer}>
                        <Icon name="gears" style={styles.gearIcon}></Icon>
                        <Text style={styles.header}>Cài đặt</Text>
                    </View>
                    <View style={styles.textContainer}>
                        <View style={styles.title}>
                            <Icon name="music" style={styles.musicIcon}></Icon>
                            <Text style={styles.text}>Âm lượng</Text>
                        </View>
                        <View style={styles.content}>
                            <Text style={styles.text}>{volume*100}%</Text>
                        </View>
                    </View>

                    <View style={styles.sliderContainer}>
                        <View style={styles.slider}>
                            <Slider
                                style={{width: 230, height: 30}}
                                value={volume*100}
                                onValueChange={(value) => {
                                    setVolume(value/100); 
                                }}
                                minimumValue={0}
                                maximumValue={100}
                                step={1}
                            />
                        </View>
                    </View>
                </Animatable.View>
            </SafeAreaView>
        </Modal>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
    },
    owlImage: {
        position: "absolute",
        width: '35%',
        height: '65%',
        top: "-61%",
        left: "-1%",
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
    },
    settingContainer: {
        position: "relative",
        width: "75%",
        height: 180,
        marginTop: 250,
        borderRadius: 20,
        backgroundColor: "#29353B",
        alignItems: "center",
        justifyContent: "center",
    },

    headerContainer: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        width: "70%",
        borderBottomWidth: 2,
        borderColor: "white",
    },

    gearIcon: {
        fontSize: 24,
        fontWeight: "bold",
        color: "white",
        marginRight: 5,
    },

    header: {
        color: "white",
        fontSize: 24,
        fontWeight: "bold",
        marginRight: 10,
    },

    textContainer: {
        flex: 0.9,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-end",
        width: "85%",
    },

    title: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },

    musicIcon: {
        fontSize: 14,
        color: "#A8D0E3",
        marginRight: "6%",
    },

    text: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#A8D0E3",
    },

    sliderContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },

    slider: {
        backgroundColor: "#424242",
        borderRadius: 10,
        marginBottom: 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.8,
        shadowRadius: 4,
        elevation: 5, // Để tăng độ sắc nét của đổ bóng trên Android
    },
    

    closeButton: {
        backgroundColor: "#022728",
        borderRadius: 30,
        paddingHorizontal: "3%", 
        paddingVertical: "2%", 
        position: "absolute",
        top: "-4%",
        right: "-4%",
        justifyContent: "center",
        alignItems: "center",
    },

    closeIcon: {
        fontSize: 14,
        color: "white",
    },
});

export default ModalSetting;
