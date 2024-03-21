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

    const handlePlayNow = () => {
        navigation.navigate('GameScreen');
    };

    const handleProfile = () => {
        navigation.navigate('Profile');
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
                        <TouchableOpacity style={styles.createRoomButton}>
                            <View style={styles.backgroundBehindText}/>
                            <Text style={styles.textButton}>
                                Tạo Phòng
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.findRoomButton}>
                            <View style={styles.backgroundBehindText}/>
                            <Text style={styles.textButton}>
                                Tìm phòng
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
        </ImageBackground>
    );
}

export default Home;

