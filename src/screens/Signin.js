import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Pressable, Alert, SafeAreaView, ScrollView, KeyboardAvoidingView } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { signInWithEmailAndPassword } from 'firebase/auth'

import styles from "../components/Styles.js";
import LoginTitle from "../components/loginTitle.js";
import LogoGame from "../components/logoGame.js";
import { auth } from "../../firebaseconfig.js"
import LoadingScreen from "./LoadingScreen.js";

function Signin({ navigation }) {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false);
    const [isloading,setIsloading] = useState(false);

    const handleLogin = async () =>{
        if(email !=="" && password !==""){
            setIsloading(true);
            await signInWithEmailAndPassword(auth, email, password)
            .then(() => {console.log("Sign in success")})
            .catch((e) => {Alert.alert("Đăng nhập thất bại", "Tài khoản hoặc mật khẩu không chính xác" )})
            setIsloading(false)
        }
    }

    const toggleShowPassword = () =>{
        setShowPassword(!showPassword);
    };

    if(isloading){
        return <LoadingScreen></LoadingScreen>
    }

    return ( 
        <View style={styles.containers } >
            <View style={styles.title}>
                <LogoGame/>
            </View>

            <SafeAreaView style={styles.login}>
                <View style={styles.header}>
                    <Text style={styles.textHeader}></Text>
                </View>

                <View style={styles.inputText}>
                    <Icon name="gmail" style={styles.icon}></Icon>
                    <TextInput style={styles.email}
                                placeholder="Gmail"
                                keyboardType="email-address"
                                textContentType="emailAddress"
                                value={email}
                                onChangeText={(text) => setEmail(text)}
                    />
                </View>

                <View style={styles.inputText}>
                    <Icon name="lock" style={styles.icon}></Icon>
                    <TextInput style={styles.pass} 
                                placeholder="Mật khẩu"
                                secureTextEntry={!showPassword}
                                textContentType="password"
                                value={password}
                                onChangeText={(text) => setPassword(text)}
                    />
                    <TouchableOpacity style={styles.toggleButton} onPress={toggleShowPassword}>
                        <Ionicons name={showPassword ? 'eye-off' : 'eye'} size={24} color="black" />
                    </TouchableOpacity>
                </View>
                

                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.mainButton} onPress={handleLogin}>
                        <View style={styles.backgroundBehindText}/>
                        <Text style={styles.textButton}>
                            Đăng nhập
                        </Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.signUpAccount}>
                    <Text style={styles.text}>
                        Bạn chưa có tài khoản?
                    </Text>

                    <Pressable onPress={() => navigation.navigate('Signup')}>
                        <Text style={styles.textSignIU}>
                            Đăng ký
                        </Text>
                    </Pressable>
                </View>
            </SafeAreaView>
        </View>
    );
}

export default Signin;