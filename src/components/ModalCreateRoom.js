import React, { useState } from "react";
import { View, Text, TouchableOpacity, Modal, Switch, TextInput,  StyleSheet } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome.js';


import NumericUpDown from "./NumericUpDown.js";

function ModalCreateRoom({
    createVisible,
    handleCloseCreateModal,
    idroom,
    handleCreateRoom,

}) {
    const [passwordSwitch, setPasswordSwitch] = useState(false)
    const [password, setPassword] = useState('')
    const [maxPlayers, setMaxPlayers] = useState(4)

    const incrementMaxPlayers = () => {
        if (maxPlayers < 8) {
            setMaxPlayers(maxPlayers + 1);
        }
    };
    const decrementMaxPlayers = () => {
        if (maxPlayers > 4) {
            setMaxPlayers(maxPlayers - 1);
        }
    };

    console.log("Create");

    return ( 
        <Modal
                animationType="fade"
                transparent={true}
                visible={createVisible}
                onRequestClose={handleCloseCreateModal}
            >
                {createVisible && <View style={styles.overlay} />}
                <View style={styles.createContainer}>
                    <View style={styles.createTitleContainer}>
                        <Text style={styles.textCreateTitle}>Tạo Phòng</Text>
                    </View>

                    <View style={styles.createContentContainer}>
                        <Text style={styles.textCreateContent}>ID phòng: </Text>
                        <Text style={styles.textCreateContent}>{idroom} </Text>
                        <TouchableOpacity>
                            <Icon name="copy" style={styles.iconCopy}></Icon>
                        </TouchableOpacity>
                    </View>

                    <NumericUpDown 
                        value={maxPlayers}
                        increment={incrementMaxPlayers}
                        decrement={decrementMaxPlayers}
                    />

                    <View style={styles.createPasswordContainer}>
                        <Text style={styles.textCreateContent}>Mật khẩu phòng:</Text>
                        <Switch
                        trackColor={{ false: "#767577", true: "#81b0ff" }}
                        thumbColor={passwordSwitch ? "#f4f3f4" : "#f4f3f4"}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={()=>setPasswordSwitch(!passwordSwitch)}
                        value={passwordSwitch}
                        />
                        {passwordSwitch && (
                            <View style={styles.keyRoom}>
                                <TextInput
                                    style={styles.inputPassword}
                                    onChangeText={(text)=>{
                                        if(text.length <= 4){
                                            setPassword(text)
                                        }
                                    }}
                                    value={password}
                                    keyboardType="numeric"
                                    maxLength={4}
                                />
                            </View>
                        )}
                    </View>

                    <View style={styles.createButtonContainer}>
                        <TouchableOpacity style={styles.createRoomButton} onPress={()=>handleCreateRoom(idroom, password, maxPlayers)}>
                            <View style={styles.backgroundBehindText}/>
                            <Text style={styles.textButton}>
                                Tạo
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.createRoomButton} onPress={handleCloseCreateModal}>
                            <View style={styles.backgroundBehindText}/>
                            <Text style={styles.textButton}>
                                Hủy
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>       
    );
}

const styles = StyleSheet.create({
    createContainer: {
        backgroundColor: "white",
        top: "24%",
        width: "90%",
        height: "50%",
        alignSelf: "center",
        justifyContent: "center",
        borderRadius: 20,
    },
    createTitleContainer: {
        flex: 1,
        marginTop: 10,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },
    textCreateTitle: {
        fontSize: 27,
        position: 'absolute',
        fontWeight: "bold",
        color: "black",
    },
    createContentContainer: {
        flex: 0.75,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginLeft: "5%",
        marginRight: "5%",
        borderBottomWidth: 0.5,
    },
    textCreateContent: {
        fontSize: 20,
        color: "black",
    },
    iconCopy: {
        fontSize: 25,
        marginRight: 45,
    },
    createPasswordContainer: {
        flex: 0.75,
        flexDirection: "row",
        alignItems: "center",
        marginLeft: "5%",
        marginRight: "5%",
        borderBottomWidth: 0.5,
    },
    inputPassword: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 5,
        marginRight: 5,
        marginLeft: 10,
        width: 100,
        fontSize: 20,
        textAlign: "center",
    },
    createButtonContainer: {
        flex: 1,
        marginLeft: 17,
        marginBottom: 5,
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "space-between",
    },
    createRoomButton: {
        position: "relative",
        paddingVertical: "3%",
        justifyContent: 'center',
        alignItems: 'center',
        minWidth: "40%",
        marginRight: "5%",
    },
    backgroundBehindText: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: "#6938EF",
        backgroundImage: "linear",
        borderRadius: 15,
    },
    textButton: {
        fontSize: 20,
        color: "white",
        fontWeight: "bold",
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
})

export default ModalCreateRoom;
