import React, { useState, useLayoutEffect, useContext } from "react";
import { View, Text, TouchableOpacity, SafeAreaView, ImageBackground, Modal, Switch, TextInput, Image, ScrollView } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome.js';
import { addDoc, collection, getDocs, onSnapshot, query, orderBy, runTransaction, doc, setDoc } from "firebase/firestore";
import { useNavigation } from "@react-navigation/native";

import styles from "../components/Styles.js";
import LogoGame from "../components/logoGame.js";
import LoadingScreen from './LoadingScreen.js';
import { auth, database } from "../../firebaseconfig";
import RoomBox from "../components/RoomBox.js";
import userContext from "../AuthContext/AuthProvider.js";

function Home() {
    const {user} = useContext(userContext)

    const navigation = useNavigation();
    const [modalVisible, setModalVisible] = useState(false);
    const [createVisible, createModalVisible] = useState(false);
    const [findVisible, findModalVisible] = useState(false);

    const handlePlayNow = () => {
        navigation.navigate('GameScreen');
    };

    const handleProfile = () => {
        navigation.navigate('Profile');
    };

    //Modal Tạo phòng
    const NumericUpDown = ({ value, increment, decrement }) => {
        return (
            <View style={styles.createContentContainer}>
                <Text style={styles.textCreateContent}>Số lượng người chơi: </Text>
                <TouchableOpacity onPress={decrement} style={styles.numberButton}>
                    <Text style={styles.textCreateContent}>-</Text>
                </TouchableOpacity>
                <Text style={styles.textCreateContent}>{value}</Text>
                <TouchableOpacity onPress={increment} style={styles.numberButton}>
                    <Text style={styles.textCreateContent}>+</Text>
                </TouchableOpacity>
            </View>
        );
    };

    const [maxPlayers, setMaxPlayers] = useState(4);

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

    const [passwordSwitch, setPasswordSwitch] = useState(false);
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handlePasswordSwitch = () => {
        setPasswordSwitch(!passwordSwitch);
        if (!passwordSwitch) {
            setShowPassword(true);
        } else {
            setShowPassword(false);
        }
    };

    const handlePasswordInput = (text) => {
        if (text.length <= 4) {
            setPassword(text);
        }
    };

    const [idRoom, idRoomText] = useState('');
    
    const [roomData, setRooms] = useState([]);

    //firebase
    useLayoutEffect(() => {
        const q = query(collection(database, "rooms")); 
        const unsubscribe = onSnapshot(q, async (data) => {
            if (data) {
                await setRooms(data.docs?.map((doc) => doc.data()));
                console.log("rooms:",roomData)
            }
        }, (error) => {
            Alert.alert("Error: ", error.message);
        });

        return () => unsubscribe();
    }, []);

    // handle create room

    const [idroom, setIdroom] = useState('')

    function generateRandomString(length) {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return result;
    }

    handleCreateRoom = async () =>{
        const roomInfo = {
            id: idroom,
            roomMaster: user?.uid,
            roomMembers: [user?.uid],
            Locked: password === '' ? false : password,
            maxPlayers,
        }
        await setDoc(doc(database, 'rooms',idroom), roomInfo)
        createModalVisible(false)
        navigation.navigate("GameScreen",roomInfo)
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
                        <TouchableOpacity style={styles.createRoomButton} onPress={() => {createModalVisible(true); setIdroom(generateRandomString(4))}}>
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
                        <TouchableOpacity style={styles.settingButton} onPress={() => setModalVisible(true)}>
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

            <Modal
                animationType="fade"
                transparent={true}
                visible={createVisible}
                onRequestClose={() => {
                    createModalVisible(!createVisible);
                }}
            >
                {createVisible && <View style={styles.overlay} />}
                <View style={styles.createContainer}>
                    <View style={styles.createTitleContainer}>
                        {/* <Image source={require('../assets/img/backgroundCreateRoom.png')} style={styles.createRoomImage}></Image> */}
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
                        onValueChange={handlePasswordSwitch}
                        value={passwordSwitch}
                        />
                        {showPassword && (
                            <View style={styles.keyRoom}>
                            <TextInput
                                style={styles.inputPassword}
                                onChangeText={handlePasswordInput}
                                value={password}
                                keyboardType="numeric"
                                //secureTextEntry={true}
                                maxLength={4}
                            />
                            </View>
                        )}
                    </View>

                    <View style={styles.createButtonContainer}>
                        <TouchableOpacity style={styles.createRoomButton} onPress={handleCreateRoom}>
                            <View style={styles.backgroundBehindText}/>
                            <Text style={styles.textButton}>
                                Tạo
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.createRoomButton} onPress={()=>{createModalVisible(!createVisible);}}>
                            <View style={styles.backgroundBehindText}/>
                            <Text style={styles.textButton}>
                                Hủy
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
            
            <Modal
                animationType="fade"
                transparent={true}
                visible={findVisible}
                onRequestClose={() => {
                    findModalVisible(!findVisible);
                }}
            >
                {findVisible && <View style={styles.overlay} />}
                <View style={styles.findContainer}>
                    <View style={styles.findTitleContainer}>
                        <Text style={styles.textCreateTitle}>Tìm Phòng</Text>
                        <TouchableOpacity onPress={()=>{findModalVisible(!findVisible);}}>
                            <Icon name="close" style={styles.iconClose}></Icon>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.findInputContainer}>
                        <View style={styles.idInputText}>
                        <TextInput style={styles.id}
                            placeholder="Nhập ID phòng"
                            keyboardType="default"
                            value={idRoom}
                            onChangeText={(text) => idRoomText(text)}
                        />
                        </View>
                        <TouchableOpacity style={styles.joinButton}>
                            <View style={styles.backgroundJoinButton}/>
                            <Text style={styles.textButton}>
                                Vào
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.findListRoomContainer}>
                        <ScrollView style={styles.scrollView}>
                            {roomData.map((room, index) => (
                                <RoomBox key={index} id={room.id} locked={room.locked} numPlayers={room.roomMembers?.length} maxPlayers={room.maxPlayers} />
                            ))}
                        </ScrollView>
                    </View>
                    
                </View>
            </Modal>
        </ImageBackground>
    );
}

export default Home;

