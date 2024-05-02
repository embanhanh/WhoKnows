import React, { useState, useContext, useCallback } from "react";
import { View, Text, TouchableOpacity, SafeAreaView, ImageBackground, Modal, Alert } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome.js';
import { useFocusEffect, useNavigation } from "@react-navigation/native";

import styles from "../components/Styles.js";
import LogoGame from "../components/logoGame.js";
import LoadingScreen from './LoadingScreen.js';
import userContext from "../AuthContext/AuthProvider.js";
import ModalCreateRoom from "../components/ModalCreateRoom.js";
import ModalFindRoom from "../components/ModalFindRoom.js";
import ModalGameLobbyPass from "../components/ModalLobbyPass.js";
import { socket } from "../util/index.js";

function Home() {
    const {user} = useContext(userContext)
    const navigation = useNavigation();

    const [isloading, setIsloading] = useState(false)
    // Modal variables 
    const [modalVisible, setModalVisible] = useState(false);
    const [createVisible, createModalVisible] = useState(false);
    const [findVisible, findModalVisible] = useState(false);
    const [lobbyPassVisible, lobbyPassModalVisible] = useState(false);
    // Room data
    const [roomData, setRooms] = useState([]);
    const [dataRoom, setDataRoom] = useState({})

    const handleProfile = () => {
        navigation.navigate('Profile');
    };
    // // Handle Logic
    // // handle play now
    const handlePlayNow = () => {
        const newRoom = roomData.filter((room)=>room.locked === false && room.roomMembers?.lenth !== room.maxPlayers && !room.isStart)
        if(newRoom.length === 0){
            handleCreateRoom(generateRandomString(4),false,4)
        }else {
            const roomSelected = newRoom[Math.floor(Math.random()*newRoom.length)]
            handleJoinRoom(roomSelected.idroom, roomSelected.locked)
        }
    };
    //Modal Create room --- LOGIC
    // Random ID
    function generateRandomString(length) {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        console.log("random id");
        return result;
    }
    // handle create room
    handleCreateRoom = async (idroom, password, maxPlayers) =>{
        socket.emit('create-room',{idroom,password,maxPlayers, userId: user.uid, userName: user.displayName, userAvatar: user.photoURL})
        navigation.navigate("GameScreen",idroom)
        createModalVisible(false)
    }
    // handle close modal create 
    const handleCloseCreateModal = ()=>{
        createModalVisible(false); 
    }
    // Modal join room --- LOGIC
    // handle close modal find room
    const handleCloseFindModal = () =>{
        findModalVisible(!findVisible)
    }
    //handle close modal import lobby password
    const handleCloseLobbyPassModal = () =>{
        lobbyPassModalVisible(!lobbyPassVisible)
    }
    // handle join room
    handleJoinRoom = (id, locked) => {
        if(!locked){
            socket.emit('join-room',{id,userId: user.uid, userName: user.displayName, userAvatar: user.photoURL})
            navigation.navigate('GameScreen', id)
            findModalVisible(false)
        }else{
            lobbyPassModalVisible(true)
            setDataRoom({locked,idroom: id})
        }
    }
    // handle confirm pass
    const handleConfirmPass = (pass)=>{
        if(pass === dataRoom.locked){
            socket.emit('join-room',{id: dataRoom.idroom,userId: user.uid, userName: user.displayName, userAvatar: user.photoURL})
            navigation.navigate('GameScreen', dataRoom.idroom)
            findModalVisible(false)
            lobbyPassModalVisible(false)
        }else{
            Alert.alert("Mật khẩu không chính xác")
        }
    }
    // // handle join room with id
    handleJoinRoomWithId = (idRoom)=>{
        if(idRoom.length === 4){
            const room = roomData.find((room)=>room.idroom === idRoom && !room.isStart)
            if(room){
                handleJoinRoom(idRoom, room.locked)
            }else{
                Alert.alert("Phòng không tồn tại")
            }
        }
        else{
            Alert.alert("ID phòng phải có 4 kí tự")
        }
    }

    if(isloading){
        return <LoadingScreen/>
    }
    // socket io
    useFocusEffect(useCallback(()=>{
        const listen = socket.on('room-list',(rooms)=>{
            setRooms(rooms)
        })

        socket.emit("room-list")

        return ()=>{
            socket.off('room-list',listen)
        }
    },[]))

    return ( 
        <ImageBackground source={require('../assets/img/HomeScreen.jpg')} style={styles.backgroundImage}>
            <View style={styles.container} >
                <View style={styles.title}>
                    <LogoGame/>
                </View>

                <SafeAreaView style={styles.login}>
                    <View style={styles.header}>
                        <Text style={styles.textHeader}></Text>
                    </View>

                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.mainButton} onPress={handlePlayNow}>
                            <View style={styles.backgroundBehindText}/>
                            <Text style={styles.textButton}>
                                Chơi Ngay !!
                            </Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.createRoomButton} onPress={() => {createModalVisible(true)}}>
                            <View style={styles.backgroundBehindText}/>
                            <Text style={styles.textButton}>
                                Tạo Phòng
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.findRoomButton} onPress={() => {findModalVisible(true)}}>
                            <View style={styles.backgroundBehindText}/>
                            <Text style={styles.textButton}>
                                Tìm Phòng
                            </Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.setting}>
                        <TouchableOpacity style={styles.settingButton} onPress={() => setModalVisible(!modalVisible)}>
                            <Icon name="gear"  style={styles.settingIcon}></Icon>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.settingButton} onPress={handleProfile}>
                            <Icon name="user" style={styles.settingIcon}></Icon>
                        </TouchableOpacity>
                    </View>
                </SafeAreaView>
            </View>

            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            >
                {modalVisible && <View style={styles.overlay} />}
                <View style={styles.modalContainer}>
                    <TouchableOpacity onPress={()=>{setModalVisible(!modalVisible);}}>
                        <Icon name="close" style={styles.iconClose}></Icon>
                    </TouchableOpacity>
                </View>
            </Modal>

            {
                createVisible &&
                <ModalCreateRoom 
                    createVisible={createVisible}
                    handleCloseCreateModal={handleCloseCreateModal}
                    idroom={generateRandomString(4)}
                    handleCreateRoom={handleCreateRoom}
                />
            }
            {
                findVisible && 
                <ModalFindRoom
                    findVisible={findVisible}
                    handleCloseFindModal={handleCloseFindModal}
                    handleJoinRoomWithId={handleJoinRoomWithId}
                    roomData={roomData}
                    handleJoinRoom={handleJoinRoom}
                />
            }

            {
                lobbyPassVisible && 
                <ModalGameLobbyPass
                    handleCloseLobbyPassModal={handleCloseLobbyPassModal}
                    handleConfirmPass={handleConfirmPass}
                />
            }
        </ImageBackground>
    );
}

export default Home;

