import React, { useState, useContext, useCallback } from "react";
import { View, Text, TouchableOpacity, Modal, Switch, TextInput, StyleSheet } from "react-native";
import { Divider } from 'react-native-paper';
import { RFValue } from "react-native-responsive-fontsize";
import { Audio } from 'expo-av';
import { useFocusEffect } from "@react-navigation/native";
import Icon from 'react-native-vector-icons/FontAwesome5.js';
import * as Animatable from 'react-native-animatable';
import * as Clipboard from 'expo-clipboard';
import SoundVolumeContext from "../AuthContext/SoundProvider.js";

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
    const { volume } = useContext(SoundVolumeContext)
    const [sound, setSound] = useState(null)

    async function playSound(filepath) {
        const { sound } = await Audio.Sound.createAsync(filepath,{volume});
        setSound(sound);
        await sound.playAsync();
    }

    useFocusEffect(useCallback(() => {
        return sound
          ? () => {
              sound.unloadAsync();
            }
          : undefined;
      }, [sound]));

    const handleCopy = async () => {
        await Clipboard.setStringAsync(idroom);
    };

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

    return ( 
        <Modal
            animationType="none"
            transparent={true}
            visible={createVisible}
            onRequestClose={handleCloseCreateModal}
        >
            {createVisible && <View style={styles.overlay} />}
            <Animatable.View animation="bounceIn" 
                            duration={1000} 
                            style={styles.createContainer}>
                <View style={styles.createTitleContainer}>
                    <Text style={styles.textCreateTitle}>Tạo Phòng</Text>
                </View>

                <Divider style={{ height: "0.6%", backgroundColor: "white", width: "75%", alignSelf: "center", marginBottom: "9%"}}></Divider>

                <View style={styles.roomInfoContainer}>
                    <View style={styles.createContentContainer}>
                        <Text style={styles.textCreateContent}>ID phòng:</Text>
                        <View style={styles.idContainer}>
                            <Text style={styles.textIDRoom}>{idroom}</Text>
                        </View>

                        <TouchableOpacity onPress={handleCopy}>
                            <Icon name="copy" style={styles.iconCopy}></Icon>
                        </TouchableOpacity>
                    </View>

                    <NumericUpDown 
                        value={maxPlayers}
                        increment={incrementMaxPlayers}
                        decrement={decrementMaxPlayers}
                    />

                    <View style={styles.createPasswordContainer}>
                        <Text style={styles.textCreateContent}>Mật khẩu:</Text>
                        <Switch
                        style={{ transform: [{ scaleX: 0.9 }, { scaleY: 0.9 }] }}
                        trackColor={{ false: "#767577", true: "#F8C630" }}
                        thumbColor={passwordSwitch ? "#f4f3f4" : "#f4f3f4"}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={()=>{setPasswordSwitch(!passwordSwitch); playSound(require('../assets/sound/toggle.mp3'))}}
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

                    <View style={styles.buttonContainer}>
                        <View style={styles.cancelButtonContainer}>
                            <TouchableOpacity style={styles.cancelRoomButton} onPress={handleCloseCreateModal}>
                                <Text style={styles.textButton}>
                                    Hủy
                                </Text>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.createButtonContainer}>
                            <TouchableOpacity style={styles.createRoomButton} onPress={()=>handleCreateRoom(idroom, password, maxPlayers)}>
                                <Text style={styles.textButton}>
                                    Tạo
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Animatable.View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    createContainer: {
        backgroundColor: "#1E1E1E",
        marginTop: 150,
        width: "80%",
        height: 350,
        alignSelf: "center",
        justifyContent: "center",
        borderRadius: RFValue(20),
    },

    createTitleContainer: {
        flex: 1.7,
        alignItems: "center",
        justifyContent: "center",
    },

    textCreateTitle: {
        fontSize: RFValue(27),
        position: 'absolute',
        fontWeight: "bold",
        color: "white",
    },

    roomInfoContainer: {
        flex: 5,
    },

    createContentContainer: {
        flex: 0.5,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },

    textCreateContent: {
        fontSize: RFValue(16),
        color: "white",
        fontWeight: "bold",
        marginLeft: "12.5%"
    },

    idContainer: {
        alignItems: "center",
        justifyContent: "center",
        borderWidth: RFValue(3),
        borderRadius: RFValue(5),
        paddingHorizontal: "8%",
        paddingVertical: "0.5%",
        borderColor: "#F8C630",
    },

    textIDRoom: {
        fontSize: RFValue(20),
        color: "white",
        fontWeight: "bold",
    },

    iconCopy: {
        fontSize: RFValue(20),
        color: "white",
        marginRight: "12.5%",
    },

    createPasswordContainer: {
        flex: 0.5,
        flexDirection: "row",
        alignItems: "center",
    },

    inputPassword: {
        borderWidth: RFValue(3),
        borderRadius: RFValue(5),
        borderColor: "#F8C630",
        marginLeft: "8%",
        width: RFValue(85),
        fontSize: RFValue(17),
        fontWeight: "bold",
        color: "white",
        textAlign: "center",
    },

    buttonContainer: {
        flex: 1,
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "space-between",
    },

    cancelButtonContainer: {
        marginLeft: "12%",
        marginBottom: "2%",
    },

    createButtonContainer: {
        marginRight: "11%",
        marginBottom: "2%",
    },

    createRoomButton: {
        position: "relative",
        paddingVertical: "5%",
        justifyContent: 'center',
        alignItems: 'center',
        minWidth: "53%",
        backgroundColor: "#1E5F23",
        borderRadius: RFValue(10),
    },

    cancelRoomButton: {
        position: "relative",
        paddingVertical: "9%",
        justifyContent: 'center',
        alignItems: 'center',
        minWidth: "30%",
        backgroundColor: "#B51E1E",
        borderRadius: RFValue(10),
    },

    textButton: {
        fontSize: RFValue(17),
        color: "white",
        fontWeight: "bold",
    },

    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
    },
})

export default ModalCreateRoom;