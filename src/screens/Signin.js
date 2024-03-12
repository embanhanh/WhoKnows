import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Pressable, Alert, SafeAreaView } from "react-native";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import IconPass from 'react-native-vector-icons/FontAwesome'
import { signInWithEmailAndPassword } from 'firebase/auth'

import styles from "../components/Styles.js";
import LoginTitle from "../components/IconAndImage/index.js";
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
        <View style={styles.containers } >
            <View style={styles.title}>
                <LoginTitle/>
            </View>

            <SafeAreaView style={styles.login}>
                <View style={styles.header}>
                    <Text style={styles.textHeader}>Sign In</Text>
                </View>

                <View style={styles.inputAcc}>
                    <Icon name="gmail" size={30}></Icon>
                    <TextInput style={styles.email}
                                placeholder="Gmail adress"
                                keyboardType="email-address"
                                textContentType="emailAddress"
                                value={email}
                                onChangeText={(text) => setEmail(text)}
                    />
                </View>

                <View>
                    <View style={styles.inputPass}>
                        <IconPass name="lock" size={30}></IconPass>
                        <TextInput style={styles.password} 
                                    placeholder="Password"
                                    secureTextEntry={true}
                                    textContentType="password"
                                    value={password}
                                    onChangeText={(text) => setPassword(text)}
                        />
                    </View>
                    <Text style={styles.textForgot}>Forgot your password ?</Text>
                </View>

                <TouchableOpacity onPress={handleLogin}>
                    <Text style={styles.loginButton}>
                        Login
                    </Text>
                </TouchableOpacity>

                <View style={styles.signUpAccount}>
                    <Text style={styles.text}>
                        Don't have an account?
                    </Text>

                    <Pressable onPress={() => navigation.navigate('Signup')}>
                        <Text style={styles.textSignIU}>
                            SignUp
                        </Text>
                    </Pressable>
                </View>
            </SafeAreaView>
        </View>
    );
}

export default Signin;