import React, { useState } from "react";
import { View, Text, TouchableOpacity, SafeAreaView, ImageBackground, Modal } from "react-native";
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

    const DATA = [
        { title: 'Section 1', data: [5] },
        { title: 'Section 2', data: [6] },
        { title: 'Section 3', data: [7] },
        { title: 'Section 4', data: [8] },
      ];

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
                <View style={styles.createContainer}>
                    <View style={styles.createTitleContainer}>
                        <Text style={styles.textCreateTitle}>Tạo Phòng</Text>
                    </View>

                    <View style={styles.createContentContainer}>
                        <View style={styles.idRoom}>
                            <Text style={styles.textCreateContent}>ID phòng: </Text>
                            <Text style={styles.textCreateContent}>*ID phòng* </Text>
                            <TouchableOpacity style={styles.abc}>
                                <Icon name="copy" style={styles.iconCopy}></Icon>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.numberPlayer}>
                            <Text style={styles.textCreateContent}>Số lượng người chơi: </Text>
                            <TouchableOpacity style={styles.number}>
                                <View style={styles.squareButton}>
                                    <Text style={styles.textCreateContent}>5</Text>
                                </View>
                            </TouchableOpacity >
                            <TouchableOpacity style={styles.number}>
                                <View style={styles.squareButton}>
                                    <Text style={styles.textCreateContent}>6</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.number}>
                                <View style={styles.squareButton}>
                                    <Text style={styles.textCreateContent}>7</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.number}>
                                <View style={styles.squareButton}>
                                    <Text style={styles.textCreateContent}>8</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.keyRoom}>
                            <Text style={styles.textCreateContent}>Mật khẩu phòng:</Text>
                        </View>
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
                    
                </View>
            </Modal>
        </ImageBackground>
    );
}

export default Home;

