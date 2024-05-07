import React, {useContext, useRef, useState} from "react";
import { View, Text, TextInput, TouchableOpacity, Pressable, SafeAreaView, Alert } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

import styles from "../components/Styles.js";
import LoginTitle from "../components/loginTitle.js";
import { auth } from "../../firebaseconfig.js";
import avatarContext from "../AuthContext/AvatarProvider.js";

function SignUp({ navigation }) {
    const urlAvatar = useContext(avatarContext)
    const pass1 = useRef(null)
    const pass2 = useRef(null)

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleSignup = async () => {
        if(email !== "" && password !== "" && confirmPassword !== "" && password === confirmPassword) {
            try {
                const userCredential = await createUserWithEmailAndPassword(auth, email, password);
                const user = userCredential.user;
                const displayName = email.substring(0, email.indexOf('@'));
                const random = Math.floor(Math.random()*urlAvatar.length)
                const photoURL = urlAvatar[random]
                await updateProfile(user, {
                    displayName: displayName,
                    photoURL: photoURL
                });

                Alert.alert("Đăng ký thành công", "Bạn đã vào trang chủ");
                console.log("Signup success");
                setEmail('');
                setPassword('');
                setConfirmPassword('');
            } catch (error) {
                Alert.alert("Đăng ký không thành công", error.message);
            }
        }
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
                                onSubmitEditing={()=>{ pass1.current.focus() }}
                    />
                </View>

                <View style={styles.inputText}>
                    <Icon name="lock" style={styles.icon}></Icon>
                    <TextInput style={styles.pass} 
                                    ref={pass1}
                                    placeholder="Mật khẩu"
                                    secureTextEntry={!showPassword}
                                    textContentType="password"
                                    value={password}
                                    onChangeText={(text) => setPassword(text)}
                                    onSubmitEditing={()=>{ pass2.current.focus() }}
                    />
                    <TouchableOpacity style={styles.toggleButton} onPress={()=>{setShowPassword(!showPassword);}}>
                        <Ionicons name={showPassword ? 'eye-off' : 'eye'} size={24} color="black" />
                    </TouchableOpacity>
                </View>
                
                <View style={styles.inputText}>
                    <Icon name="lock" style={styles.icon}></Icon>
                    <TextInput style={styles.pass} 
                                    ref={pass2}
                                    placeholder="Xác nhận lại mật khẩu"
                                    secureTextEntry={!showConfirmPassword}
                                    textContentType="password"
                                    value={confirmPassword}
                                    onChangeText={(text) => setConfirmPassword(text)}
                                    onSubmitEditing={handleSignup}
                    />
                    <TouchableOpacity style={styles.toggleButton} onPress={()=>{
                        setShowConfirmPassword(!showConfirmPassword)
                    }}>
                        <Ionicons name={showConfirmPassword ? 'eye-off' : 'eye'} size={24} color="black" />
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