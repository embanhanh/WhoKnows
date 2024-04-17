import React, { useState } from "react";
import { View, Text, TouchableOpacity, Modal,  TextInput,  ScrollView, StyleSheet } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome.js';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import { Divider } from 'react-native-paper';


import RoomBox from "../components/RoomBox.js";

function ModalFindRoom({
    findVisible,
    handleCloseFindModal,
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
                onRequestClose={handleCloseFindModal}
            >
                {findVisible && <View style={styles.overlay} />}
                <View style={styles.findContainer}>
                    <TouchableOpacity style={styles.closeButton} onPress={handleCloseFindModal}>
                        <Icon name="close"  style={styles.closeIcon}></Icon>
                    </TouchableOpacity>
                    <View style={styles.findInputContainer}>
                        <View style={styles.idInputText}>
                            <TextInput style={styles.id}
                                placeholder="Nhập ID Phòng..."
                                keyboardType="default"
                                maxLength={4}
                                value={idRoom}
                                onChangeText={(text) => setIdRoom(text)}
                            />
                        </View>
                        <TouchableOpacity style={styles.joinButton} onPress={()=>handleJoinRoomWithId(idRoom)}>
                            <Icon name="arrow-right" style={styles.joinIcon}></Icon>
                        </TouchableOpacity>
                    </View>

                    <Divider style={{ height: "0.6%", backgroundColor: "white", width: "80%", alignSelf: "center", marginTop: "9%"}}></Divider>

                    <View style={styles.titleContainer}>
                        <Text style={styles.titleText}>Danh sách phòng</Text>
                    </View>

                    <View style={styles.findListRoomContainer}>
                        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
                            {roomData.map((room, index) => (
                                <RoomBox key={index} id={room.id} locked={room.locked} handleJoinRoom={handleJoinRoom} 
                                    numPlayers={room.roomMembers?.length} roomMembers={room.roomMembers}  maxPlayers={room.maxPlayers} />
                            ))}
                        </ScrollView>
                    </View>
                </View>
            </Modal>
    );
}

const styles = StyleSheet.create({
    findContainer: {
        backgroundColor: "#1E1E1E",
        top: "20%",
        width: "75%",
        height: "57%",
        alignSelf: "center",
        justifyContent: "center",
        borderRadius: RFValue(15),
    },

    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
    },

    findInputContainer: {
        flex: 1,
        flexDirection: "row",
        alignItems: "flex-end",
        justifyContent: "space-between",
        marginHorizontal: "10%",
        position: "relative",
    },

    idInputText: {
        paddingVertical: "2%",
        paddingHorizontal: "3%",
        width: "77%",
        flexDirection: "row",
        backgroundColor: "#E0E0E0",
        borderRadius: RFValue(10),
        alignItems: "center",
        justifyContent: "space-between",
    },

    id: {
        fontSize: RFValue(16),
        fontWeight: "bold",
        width: "100%",
        marginLeft: "3%",
    },

    joinButton: {
        paddingVertical: "4%",
        paddingHorizontal: "5%",
        borderRadius: RFValue(15),
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#1C5C51",
    },

    joinIcon: {
        fontSize: RFValue(18),
        color: "white"
    },

    titleContainer: {
        flex: 0.8,
        alignItems: "center",
        justifyContent: "center",
    },

    findListRoomContainer: {
        flex: 4,
    },

    titleText: {
        fontSize: RFValue(20),
        fontWeight: "bold",
        color: "white"
    },

    scrollView: {
        backgroundColor: "#121212",
        paddingHorizontal: "3%",
        paddingVertical: "5%",
        borderRadius: RFValue(15),
        marginHorizontal: "10%",
        marginBottom: "10%",
    },

    closeButton: {
        backgroundColor: "#181818",
        borderRadius: RFValue(30),
        paddingHorizontal: "2.5%", 
        paddingVertical: "2%", 
        position: "absolute",
        top: "-2%",
        right: "-4%",
        justifyContent: "center",
        alignItems: "center",
    },

    closeIcon: {
        fontSize: RFValue(14),
        color: "white",
    },
})

export default ModalFindRoom;