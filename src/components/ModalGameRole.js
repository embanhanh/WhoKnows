import React, { useState } from "react";
import { View, Text, TouchableOpacity, Modal,  TextInput, StyleSheet } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome.js';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';

function ModalGameRole({
    roleVisible,
    handleCloseRoleModal,
    handleJoinRoomWithId,
    roomData,
    handleJoinRoom
}) {
    const [idRoom, setIdRoom] = useState('')

    console.log("find");
    return ( 
        <Modal
                animationType="fade"
                transparent={true}
                visible={findVisible}
                onRequestClose={handleCloseRoleModal}
            >
                {roleVisible && <View style={styles.overlay} />}
                <View style={styles.roleContainer}>
                    <View style={styles.Container}>
                        
                    </View>
                    
                </View>
            </Modal>
    );
}

const styles = StyleSheet.create({
    roleContainer: {
        top: "8%",
        backgroundColor: "#663366",
        maxWidth: "80%",
        maxHeight: "40%",
        alignSelf: "center",
        justifyContent: "center",
        borderRadius: 20,
    },
    
    textGameTitle: {
        fontSize: 27,
        position: 'absolute',
        fontWeight: "bold",
        color: "black",
    },
    
    textGameContent: {
        fontSize: 20,
        color: "white",
        fontWeight: "bold",
    },
    
})

export default ModalGameRole;