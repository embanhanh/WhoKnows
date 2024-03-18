import React, { useState } from "react";
import { View, Text, TouchableOpacity, SafeAreaView, ImageBackground, } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome.js';
import { signOut } from "firebase/auth";
import { auth, database } from "../../firebaseconfig";
import userContext from "../AuthContext/AuthProvider";

import styles from "../components/Styles.js";
import LogoGame from "../components/logoGame.js";
import { useNavigation } from "@react-navigation/native";

function Home() {
    const navigation = useNavigation();

    const handlePlayNow = () => {
        navigation.navigate('Room');
    };

    return ( 
        <ImageBackground source={require('../assets/img/HomeScreen.jpg')} style={styles.backgroundImage}>
            <View style={styles.container} >
                <View style={styles.title}>
                    <LogoGame/>
                </View>

                {/* <TouchableOpacity onPress={() => signOut(auth).then(()=>console.log("Log out success")).catch((e)=>Alert.alert("eror",e.Message))}>
                            <Text>Log out</Text>
                </TouchableOpacity> */}

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
                        <TouchableOpacity style={styles.mainButton}>
                            <View style={styles.backgroundBehindText}/>
                            <Text style={styles.textButton}>
                                Tạo Phòng
                            </Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.setting}>
                        <TouchableOpacity style={styles.settingButton}>
                            <Icon name="gear" size={30} style={styles.settingIcon}></Icon>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.settingButton}>
                            <Icon name="user" size={30} style={styles.settingIcon}></Icon>
                        </TouchableOpacity>
                    </View>
                </SafeAreaView>
            </View>
        </ImageBackground>
    );
}

export default Home;

