import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Pressable, Alert, SafeAreaView, ScrollView, KeyboardAvoidingView } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { signInWithEmailAndPassword } from 'firebase/auth'

import styles from "../components/Styles.js";
import LoginTitle from "../components/loginTitle.js";
import LogoGame from "../components/logoGame.js";
import { auth } from "../../firebaseconfig.js"

function Signin({ navigation }) {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false);

    const handleLogin = () =>{
        if(email !=="" && password !==""){
            signInWithEmailAndPassword(auth, email, password)
            .then(() => console.log("Sign in success"))
            .catch((e) => Alert.alert("Đăng nhập thất bại", "Tài khoản hoặc mật khẩu không chính xác" ))
        }
    }

    const toggleShowPassword = () =>{
        setShowPassword(!showPassword);
    };

    return ( 
        <KeyboardAvoidingView style = {{ flex: 1}}>
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
                    

                    <TouchableOpacity onPress={handleLogin}>
                        <Text style={styles.loginButton}>
                            Đăng nhập
                        </Text>
                    </TouchableOpacity>

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
        </KeyboardAvoidingView>
    );
}

export default Signin;