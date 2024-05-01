import React from "react";
import { View, Text, Modal, StyleSheet, Image, Dimensions, TextInput, SafeAreaView, TouchableOpacity } from "react-native";
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';

import * as Animatable from 'react-native-animatable';

function ModalGameResultGuess({
    guessResultVisible,
    handleCloseGuessResultModal,
}) {
    return ( 
        <Modal
                animationType="none"
                transparent={true}
                visible={guessResultVisible}
                onRequestClose={handleCloseGuessResultModal}
            >
            {guessResultVisible  && <View style={styles.overlay} />}
            <SafeAreaView style={styles.container}>
                <Animatable.View 
                        animation="bounceIn" 
                        duration={1000}
                        style={styles.resultGuessContainer}>
                    <Image source={require('../assets/img/owl.png')} style={styles.owlImage}></Image>
                    <Text style={styles.titleModal}>Đoán từ khóa</Text>
                    <View style={styles.inputContainer}>
                        <Text style={styles.textInput}>VCL</Text>
                    </View>
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
        top: "-65%",
        left: "-3%",
    },

    resultGuessContainer: {
        position: "relative",
        width: "75%",
        height: "20%",
        borderRadius: RFValue(20),
        backgroundColor:  "#29353B",
        alignItems: "center",
        justifyContent: "center",
    },

    titleModal: {
        color: "white",
        fontSize: RFValue(20), 
        fontWeight: "bold", 
        marginTop: "10%",
    },

    inputContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        width: "70%",
        backgroundColor: "#00FFDF",
        borderRadius: RFValue(15),
        marginBottom: "14%",
        marginTop: "6%",
    },

    textInput:{
        fontSize: RFValue(17),
        fontWeight: "bold",
    },

    backgroundBehindText: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: "#3B8C3E",
        backgroundImage: "linear",
        borderRadius: RFValue(15),
    },

    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
    },
})

export default ModalGameResultGuess;