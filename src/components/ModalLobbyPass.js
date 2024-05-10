import React, { useState } from "react";
import { View, Text, Modal, StyleSheet, Image, TextInput, SafeAreaView, TouchableOpacity } from "react-native";
import { RFValue } from 'react-native-responsive-fontsize';
import * as Animatable from 'react-native-animatable';

import Icon from 'react-native-vector-icons/FontAwesome.js';

function ModalGameLobbyPass({
    handleCloseLobbyPassModal,
    handleConfirmPass
}) {
    const [pass, setPass] = useState('')
    return ( 
        <Modal
                animationType="none"
                transparent={true}
                visible={true}
                onRequestClose={handleCloseLobbyPassModal}
            >
            <View style={styles.overlay} />
            <SafeAreaView style={styles.container}>
                <Animatable.View 
                            animation="bounceIn" 
                            duration={1000}
                            style={styles.lobbyPassContainer}>
                    <Image source={require('../assets/img/owl.png')} style={styles.owlImage}></Image>
                    <Text style={styles.titleModal}>Nhập mật khẩu</Text>
                    <View style={styles.inputContainer}>
                        <TextInput
                            textContentType="password"
                            style={styles.textInput}
                            placeholder="Mật khẩu: ABCD"
                            value={pass}
                            onChangeText={(text)=>{setPass(text)}}
                            maxLength={4}
                        />
                    </View>

                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.mainButton} onPress={()=>handleConfirmPass(pass)}>
                            <View style={styles.backgroundBehindText}/>
                            <Text style={styles.textButton}>
                                Xác nhận
                            </Text>
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity style={styles.closeButton} onPress={handleCloseLobbyPassModal}>
                        <Icon name="close"  style={styles.closeIcon}></Icon>
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
      },

    owlImage: {
        position: "absolute",
        width: '35%',
        height: '65%',
        top: "-61%",
        left: "-3%",
    },

    lobbyPassContainer: {
        position: "relative",
        width: "75%",
        height: 180,
        marginTop: 250,
        borderRadius: RFValue(20),
        backgroundColor:  "#29353B",
        alignItems: "center",
    },

    titleModal: {
        color: "white",
        fontSize: RFValue(18), 
        fontWeight: "bold", 
        marginTop: "8%"
    },

    inputContainer: {
        paddingLeft: "6%",
        justifyContent: "center",
        width: "80%",
        height: "23%",
        backgroundColor: "#00FFDF",
        borderRadius: RFValue(15),
        marginTop: "6%",
    },

    textInput:{
        fontSize: RFValue(16),
    },

    buttonContainer: {
        marginTop: "6%",
        alignItems: 'center',
        flexDirection: "row",
        justifyContent: "space-between",
    },

    mainButton: {
        position: "relative",
        paddingVertical: "3%",
        justifyContent: 'center',
        alignItems: 'center',
        minWidth: "80%",
    },

    backgroundBehindText: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: "#3B8C3E",
        backgroundImage: "linear",
        borderRadius: RFValue(15),
    },

    textButton: {
        fontSize: 18,
        color: "white",
        fontWeight: "bold",
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

export default ModalGameLobbyPass;