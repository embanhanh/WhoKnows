import React from "react";
import { View, Text, Modal, StyleSheet, Image, Dimensions, TextInput, SafeAreaView, TouchableOpacity } from "react-native";
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import * as Animatable from 'react-native-animatable';

import Icon from 'react-native-vector-icons/FontAwesome.js';

function ModalGameGuessWord({
    guessVisible,
    handleCloseGuessModal,
}) {
    return ( 
        <Modal
                animationType="none"
                transparent={true}
                visible={guessVisible}
                onRequestClose={handleCloseGuessModal}
            >
            {guessVisible  && <View style={styles.overlay} />}
            <SafeAreaView style={styles.container}>
                <Animatable.View 
                        animation="bounceIn" 
                        duration={500} 
                        style={styles.guessContainer}>
                    <Image source={require('../assets/img/owl.png')} style={styles.owlImage}></Image>
                    <Text style={styles.titleModal}>Đoán từ khóa</Text>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.textInput}
                            placeholder="Nhập từ khóa..."
                        />
                    </View>

                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.mainButton}>
                            <View style={styles.backgroundBehindText}/>
                            <Text style={styles.textButton}>
                                Xác nhận
                            </Text>
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity style={styles.closeButton} onPress={handleCloseGuessModal}>
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
        justifyContent: 'center',
      },

    owlImage: {
        position: "absolute",
        width: '35%',
        height: '65%',
        top: "-61%",
        left: "-3%",
    },

    guessContainer: {
        position: "relative",
        width: "75%",
        height: "25%",
        borderRadius: RFValue(20),
        backgroundColor:  "#29353B",
        alignItems: "center",
    },

    titleModal: {
        color: "white",
        fontSize: RFValue(20), 
        fontWeight: "bold", 
        marginTop: "4%"
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
        fontSize: RFValue(17),
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

export default ModalGameGuessWord;