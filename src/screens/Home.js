import React, { useState } from "react";
import { View, Text, TouchableOpacity, SafeAreaView, ImageBackground, Modal, Switch, TextInput, Image } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome.js';

import styles from "../components/Styles.js";
import LogoGame from "../components/logoGame.js";
import LoadingScreen from './LoadingScreen.js';
import { useNavigation } from "@react-navigation/native";


function Home() {
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

    const [numberOfPlayers, setNumberOfPlayers] = useState(4);

    const incrementNumberOfPlayers = () => {
        if (numberOfPlayers < 8) {
            setNumberOfPlayers(numberOfPlayers + 1);
        }
    };

    const decrementNumberOfPlayers = () => {
        if (numberOfPlayers > 4) {
            setNumberOfPlayers(numberOfPlayers - 1);
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
                        <TouchableOpacity style={styles.createRoomButton} onPress={() => createModalVisible(true)}>
                            <View style={styles.backgroundBehindText}/>
                            <Text style={styles.textButton}>
                                Tạo Phòng
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.findRoomButton} onPress={() => findModalVisible(true)}>
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
                        <Image source={require('../assets/img/backgroundCreateRoom.png')} style={styles.createRoomImage}></Image>
                        <Text style={styles.textCreateTitle}>Tạo Phòng</Text>
                    </View>

                    <View style={styles.createContentContainer}>
                            <Text style={styles.textCreateContent}>ID phòng: </Text>
                            <Text style={styles.textCreateContent}>*ID phòng* </Text>
                            <TouchableOpacity>
                                <Icon name="copy" style={styles.iconCopy}></Icon>
                            </TouchableOpacity>
                        </View>
                        <NumericUpDown 
                            value={numberOfPlayers}
                            increment={incrementNumberOfPlayers}
                            decrement={decrementNumberOfPlayers}
                        />
                        <View style={styles.createContentContainer}>
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
                        <TouchableOpacity style={styles.createRoomButton}>
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
                <View style={styles.findContainer}>
                    <TouchableOpacity onPress={()=>{findModalVisible(!findVisible);}}>
                        <Icon name="home" style={styles.iconClose}></Icon>
                    </TouchableOpacity>
                </View>
            </Modal>
        </ImageBackground>
    );
}

export default Home;

