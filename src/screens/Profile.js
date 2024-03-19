import React from "react";
import { View, Text, TouchableOpacity, SafeAreaView, StyleSheet } from "react-native";
import styles from "../components/Styles.js";
import Icon from 'react-native-vector-icons/FontAwesome.js';

import { signOut } from "firebase/auth";
import { auth, database } from "../../firebaseconfig";
import userContext from "../AuthContext/AuthProvider";
import { useNavigation } from "@react-navigation/core";

function Profile() {
    const navigation = useNavigation();

    const handleHome = () => {
        navigation.navigate('Home');
    };

    return ( 
        <View style={styles.profileContainer} >
            <View style={styles.headerProfile}>
                <Text style={styles.textHeader}>Hồ sơ</Text>
            </View>

            <View style={styles.toolsProfile}>
                <TouchableOpacity style={styles.tools} onPress={handleHome}>
                    <View style={styles.square}>    
                        <Icon name="home" style={styles.iconTools}></Icon>
                    </View>
                    <Text style={styles.textTools}>Trang Chủ</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.tools}>
                    <View style={styles.square}>    
                        <Icon name="trophy" style={styles.iconTools}></Icon>
                    </View>
                    <Text style={styles.textTools}>Lịch Sử</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.tools}>
                    <View style={styles.square}>    
                        <Icon name="key" style={styles.iconTools}></Icon>
                    </View>
                    <Text style={styles.textTools}>Đổi Mật Khẩu</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.tools} onPress={() => signOut(auth).then(()=>console.log("Log out success")).catch((e)=>Alert.alert("eror",e.Message))}>
                    <View style={styles.square}>    
                        <Icon name="sign-out" style={styles.iconTools}></Icon>
                    </View>
                    <Text style={styles.textTools}>Đăng Xuất</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.cardContainer}>
                <View style={styles.avatar}>

                </View>

                <Text style={styles.textProfile}>
                    abc@gmail.com
                </Text>
            </View>
        </View>
    );
}

export default Profile;