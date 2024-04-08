import React, { useState, useContext, useCallback } from "react";
import { View, Text, TouchableOpacity, SafeAreaView, ImageBackground, Modal, Alert } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome.js';
import {  collection, onSnapshot, query, doc, setDoc,updateDoc } from "firebase/firestore";
import { useFocusEffect, useNavigation } from "@react-navigation/native";

import styles from "../components/Styles.js";
import LogoGame from "../components/logoGame.js";
import LoadingScreen from './LoadingScreen.js';
import {  database } from "../../firebaseconfig";
import userContext from "../AuthContext/AuthProvider.js";
import ModalCreateRoom from "../components/ModalCreateRoom.js";
import ModalFindRoom from "../components/ModalFindRoom.js";

function Home() {
    const {user} = useContext(userContext)
    const navigation = useNavigation();

    const [isloading, setIsloading] = useState(false)
    // Modal variables 
    const [modalVisible, setModalVisible] = useState(false);
    const [createVisible, createModalVisible] = useState(false);
    const [findVisible, findModalVisible] = useState(false);
    // Room data
    const [roomData, setRooms] = useState([]);

    const handleProfile = () => {
        navigation.navigate('Profile');
    };

    //Firebase
    useFocusEffect(useCallback(() => {
        const q = query(collection(database, "rooms")); 
        const unsubscribe = onSnapshot(q, async (data) => {
            if (data) {
                setRooms(data.docs?.map((doc) => doc.data()));
                console.log("rooms:", user?.displayName, roomData)
            }
        }, (error) => {
            Alert.alert("Error: ", error.message);
        });

        return () => { console.log("Home unmount"); unsubscribe();}
    }, []));

    // Handle Logic
    // handle play now
    const handlePlayNow = async () => {
        const newRoom = roomData.filter((room)=>room.locked === false && room.roomMembers?.length !== room.maxPlayers)
        if(newRoom.length === 0){
            await handleCreateRoom(generateRandomString(4),false,4)
        }else {
            const roomSelected = newRoom[Math.floor(Math.random()*newRoom.length)]
            await handleJoinRoom(roomSelected.id, roomSelected.roomMembers)
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
        navigation.navigate("GameScreen",idroom)
        createModalVisible(false)
        const roomInfo = {
            id: idroom,
            roomMaster: user?.uid,
            roomMembers: [
                { 
                    Id: user?.uid,
                    displayName: user?.displayName,
                    isReady: true,
                    isGhost: false,
                    answering: false,
                    answer: ''
                }
            ],
            locked: password === '' ? false : password,
            maxPlayers,
            chats:[],
            answers: [],
            round:0,
            isStart: false,
            keyword: {},
            memberAnswer: 0,
            isStartAnswer: false, 
            isStartAnswer2: false,
            isStartVote: false,
            finishedCounting: 0,
        }
        await setDoc(doc(database, 'rooms',idroom), roomInfo)
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
    // handle join room
    handleJoinRoom = async (id, roomMembers, chats) => {
        navigation.navigate('GameScreen', id)
        findModalVisible(false)
        console.log("join");
        const docRef = doc(database,"rooms", id)
        await updateDoc(docRef, { roomMembers: [...roomMembers, {Id:user?.uid,isReady: false}], chats: [...chats, {displayName: "Hệ thống", message: `${user.displayName} đã vào phòng`, id: "system"}] })
    }
    // handle join room with id
    handleJoinRoomWithId = async (idRoom)=>{
        if(idRoom.length === 4){
            let flag = -1
            for( let i=0;i<roomData.length;i++){
                if(roomData[i].id === idRoom){
                    flag = i
                    handleJoinRoom(idRoom,roomData[i].roomMembers)
                    break
                }
            }
            if(flag === -1)
            Alert.alert("Phòng không tồn tại")
        }
        else{
            Alert.alert("ID phòng phải có 4 kí tự")
        }
    }

    if(isloading){
        return <LoadingScreen/>
    }

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
                                Chơi Ngay
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
        </ImageBackground>
    );
}

export default Home;

