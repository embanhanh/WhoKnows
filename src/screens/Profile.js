import React, { useContext } from "react";
import { View, Text, TouchableOpacity, SafeAreaView, StyleSheet } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome.js';
import { doc, deleteDoc } from "firebase/firestore";
import { signOut } from "firebase/auth";
import { useNavigation } from "@react-navigation/core";

import styles from "../components/Styles.js";
import { auth, database } from "../../firebaseconfig";
import userContext from "../AuthContext/AuthProvider";

function Profile() {
    const {user} = useContext(userContext)
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

                <TouchableOpacity style={styles.tools} onPress={async() => {
                        await signOut(auth).then(()=>console.log("Log out success")).catch((e)=>Alert.alert("eror",e.Message))
                        const refDoc = doc(database,"user",user?.uid)
                        await deleteDoc(refDoc)
                    }}
                >
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
                    {user?.email}
                </Text>
            </View>
        </View>
    );
}

export default Profile;