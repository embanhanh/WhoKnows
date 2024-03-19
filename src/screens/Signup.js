import React, {useState} from "react";
import { View, Text, TextInput, TouchableOpacity, Pressable, SafeAreaView, Alert } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { createUserWithEmailAndPassword } from "firebase/auth";

import styles from "../components/Styles.js";
import LoginTitle from "../components/loginTitle.js";
import { auth } from "../../firebaseconfig.js";

function SignUp({ navigation }) {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false);

    const handleSignup = () =>{
        if(email !== "" && password !== "")
        {
            createUserWithEmailAndPassword(auth, email,password)
            .then(() => {
                console.log("Signup success")
                setEmail('')
                setPassword('')
            })
            .catch((e) => Alert.alert("Đăng ký không thành công", e.Message))
        }
    };

    const toggleShowPassword = () =>{
        setShowPassword(!showPassword);
    };

    return ( 
        <View style={styles.containers } >
            <View style={styles.title}>
                <LoginTitle/>
            </View>

            <SafeAreaView style={styles.login}>
                <View style={styles.header}>
                    <Text style={styles.textHeader}>Welcome!!</Text>
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
                
                <View style={styles.inputText}>
                    <Icon name="lock" style={styles.icon}></Icon>
                    <TextInput style={styles.pass} 
                                    placeholder="Xác nhận lại mật khẩu"
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
                    <TouchableOpacity style={styles.mainButton} onPress={handleSignup}>
                        <View style={styles.backgroundBehindText}/>
                        <Text style={styles.textButton}>
                            Đăng ký
                        </Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.signUpAccount}>
                    <Text style={styles.text}>
                        Bạn đã có tài khoản?
                    </Text>

                    <Pressable onPress={() => navigation.navigate('Signin')}>
                        <Text style={styles.textSignIU}>
                            Đăng nhập
                        </Text>
                    </Pressable>
                </View>
            </SafeAreaView>
        </View>
    );
}

export default SignUp;