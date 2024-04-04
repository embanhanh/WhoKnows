import React from "react";
import { View, Text, Modal, StyleSheet, Image, Dimensions, TextInput, SafeAreaView, TouchableOpacity } from "react-native";
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';

import Icon from 'react-native-vector-icons/FontAwesome.js';

function ModalGameResultGuess({
    guessResultVisible,
    handleCloseGuessResultModal,
}) {
    const windowWidth = Dimensions.get('window').width;
    const avatarSize = windowWidth * 0.25; // Kích thước avatarContainer dựa trên tỷ lệ màn hình
    return ( 
        <Modal
                animationType="fade"
                transparent={true}
                visible={guessResultVisible}
                onRequestClose={handleCloseGuessResultModal}
            >
            {guessResultVisible  && <View style={styles.overlay} />}
            <SafeAreaView style={styles.container}>
                <View style={styles.describeContainer}>
                    <Image source={require('../assets/img/owl.png')} style={styles.owlImage}></Image>
                    <Text style={styles.titleModal}>Đoán từ khóa</Text>
                    <View style={styles.inputContainer}>
                        <Text style={styles.textInput}>VCL</Text>
                    </View>

                    <TouchableOpacity style={styles.closeButton} onPress={handleCloseGuessResultModal}>
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
        width: '35%',
        height: '65%',
        top: "-65%",
        left: "-3%",
    },

    describeContainer: {
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

export default ModalGameResultGuess;