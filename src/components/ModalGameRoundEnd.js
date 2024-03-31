import React from "react";
import { View, Text, Modal, StyleSheet, Image, Dimensions, TextInput, SafeAreaView, TouchableOpacity } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';

import Icon from 'react-native-vector-icons/FontAwesome.js';

function ModalGameRoundEnd({
    roundVisible,
    handleCloseRoundModal,
}) {
    const windowWidth = Dimensions.get('window').width;
    const avatarSize = windowWidth * 0.25; // Kích thước avatarContainer dựa trên tỷ lệ màn hình
    return ( 
        <Modal
                animationType="fade"
                transparent={true}
                visible={roundVisible}
                onRequestClose={handleCloseRoundModal}
            >
            {roundVisible  && <View style={styles.overlay} />}
            <SafeAreaView style={styles.container}>
                <View style={styles.describeContainer}>
                    <View style={styles.titleContainer}>
                        <Text style={styles.titleText}>Lịch sử</Text>
                    </View>

                    <View style={styles.answerListContainer}>
                        <ScrollView style={styles.answerList}>
                            
                        </ScrollView>
                    </View>

                    <TouchableOpacity style={styles.closeButton} onPress={handleCloseRoundModal}>
                        <Icon name="close"  style={styles.closeIcon}></Icon>
                    </TouchableOpacity>
                </View>

                <Image source={require('../assets/img/owl.png')} style={styles.owlImage}></Image>
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
        width: '22%',
        height: '14%',
        top: "9.3%",
        left: "13%",
    },

    describeContainer: {
        width: "75%",
        height: "55%",
        borderRadius: RFValue(20),
        backgroundColor:  "#29353B",
        alignItems: "center",
        justifyContent: "center"
    },

    titleContainer: {
        flex: 2,
        justifyContent: "center",
        alignItems: "center",
    },

    titleText: {
        color: "white",
        fontSize: RFValue(25), 
        fontWeight: "bold", 
    },

    answerListContainer: {
        flex: 9,
        justifyContent: "center",
        alignItems: "center",
    },

    answerList: {
        borderRadius: RFValue(20),
        paddingHorizontal: "40%",
        marginBottom: "9%",
        backgroundColor: "#E2E4EF",
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

export default ModalGameRoundEnd;