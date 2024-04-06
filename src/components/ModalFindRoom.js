import React, { useState } from "react";
import { View, Text, TouchableOpacity, Modal,  TextInput,  ScrollView, StyleSheet } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome.js';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';


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
                    <View style={styles.findTitleContainer}>
                        <Text style={styles.textCreateTitle}>Tìm Phòng</Text>
                        <TouchableOpacity onPress={handleCloseFindModal}>
                            <Icon name="close" style={styles.iconClose}></Icon>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.findInputContainer}>
                        <View style={styles.idInputText}>
                        <TextInput style={styles.id}
                            placeholder="Nhập ID phòng"
                            keyboardType="default"
                            maxLength={4}
                            value={idRoom}
                            onChangeText={(text) => setIdRoom(text)}
                        />
                        </View>
                        <TouchableOpacity style={styles.joinButton} onPress={()=>handleJoinRoomWithId(idRoom)}>
                            <View style={styles.backgroundJoinButton}/>
                            <Text style={styles.textButton}>
                                Vào
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.findListRoomContainer}>
                        <ScrollView style={styles.scrollView}>
                            {roomData.map((room, index) => (
                                <RoomBox key={index} id={room.id} locked={room.locked} handleJoinRoom={handleJoinRoom} chats={room.chats}
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
        top: "8%",
        backgroundColor: "#022529",
        maxWidth: "90%",
        maxHeight: "70%",
        alignSelf: "center",
        justifyContent: "center",
        borderRadius: 20,
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    findTitleContainer: {
        flex: 1,
        height: '100%',
        marginTop: 5,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },
    textCreateTitle: {
        fontSize: 27,
        position: 'absolute',
        fontWeight: "bold",
        color: "white",
    },
    iconClose: {
        fontSize: 40,
        marginLeft: "85%",
        color: "white",
    },
    findInputContainer: {
        flex: 1,
        height: '100%',
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: "7%",
        marginLeft: "5%",
        marginRight: "5%",
    },
    idInputText: {
        paddingVertical: "3%",
        paddingHorizontal: "3%",
        width: "75%",
        flexDirection: "row",
        backgroundColor: "#10666e",
        borderRadius: RFValue(20),
        alignItems: "center",
        justifyContent: "space-between",
    },
    id: {
        fontSize: 18,
        width: "70%",
        marginLeft: "3%",
    },
    joinButton: {
        position: "relative",
        paddingVertical: "3%",
        justifyContent: "center",
        alignItems: "center",
        minWidth: "17%",
        marginRight: "3%",
    },
    backgroundJoinButton: {
        backgroundColor: "#103b7a",
        borderRadius: 15,
        position: "absolute",
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
    },
    textButton: {
        fontSize: 20,
        color: "white",
        fontWeight: "bold",
    },
    findListRoomContainer: {
        flex: 5,
        marginTop: -10,
        marginLeft: "5%",
        marginRight: "5%",
        marginBottom: "5%",
        flexDirection: "row",
    },
    scrollView: {
        backgroundColor: "#10666e",
        paddingHorizontal: "3%",
        paddingVertical: "5%",
        borderRadius: RFValue(20),
    },
})

export default ModalFindRoom;