import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Pressable, Alert, SafeAreaView, ScrollView, KeyboardAvoidingView } from "react-native";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import IconPass from 'react-native-vector-icons/FontAwesome'
import { signInWithEmailAndPassword } from 'firebase/auth'

import styles from "../components/Styles.js";
import LoginTitle from "../components/loginTitle.js";
import LogoGame from "../components/logoGame.js";
import { auth } from "../../firebaseconfig.js"

function Signin({ navigation }) {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleLogin = () =>{
        if(email !=="" && password !==""){
            signInWithEmailAndPassword(auth, email, password)
            .then(() => console.log("Sign in success"))
            .catch((e) => Alert.alert("Đăng nhập thất bại", "Tài khoản hoặc mật khẩu không chính xác" ))
        }
    }

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

                    <View style={styles.inputAcc}>
                        <Icon name="gmail" style={styles.iconGmail}></Icon>
                        <TextInput style={styles.email}
                                    placeholder="Gmail"
                                    keyboardType="email-address"
                                    textContentType="emailAddress"
                                    value={email}
                                    onChangeText={(text) => setEmail(text)}
                        />
                    </View>

                    
                    <View style={styles.inputPass}>
                        <IconPass name="lock" style={styles.iconPass}></IconPass>
                        <TextInput style={styles.password} 
                                    placeholder="Mật khẩu"
                                    secureTextEntry={true}
                                    textContentType="password"
                                    value={password}
                                    onChangeText={(text) => setPassword(text)}
                        />
                    </View>
                        <Text style={styles.textForgot}>Quên mật khẩu?</Text>
                    

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