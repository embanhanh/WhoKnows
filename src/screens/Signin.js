import React, { useRef, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Pressable, Alert, SafeAreaView } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithCredential } from 'firebase/auth'

import styles from "../components/Styles.js";
import LogoGame from "../components/logoGame.js";
import { auth } from "../../firebaseconfig.js"
import LoadingScreen from "./LoadingScreen.js";
import { GoogleSignin, GoogleSigninButton } from '@react-native-google-signin/google-signin'

function Signin({ navigation }) {

    GoogleSignin.configure(
        {
            webClientId:"557430720915-7cdupqhfkg2gq57vmpjktukth4i82g1d.apps.googleusercontent.com",
            iosClientId: "557430720915-45ll33mu9lhe3lan26t9164kqb1gqnur.apps.googleusercontent.com"
        }
    )

     const onGoogleButtonPress = async() =>{
        // Check if your device supports Google Play
        await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
        // Get the users ID token
        const { idToken } = await GoogleSignin.signIn();
      
        // Create a Google credential with the token
        const googleCredential =  GoogleAuthProvider.credential(idToken);
        // Sign-in the user with the credential
        signInWithCredential(auth,googleCredential)
            .then((user)=>{
                // console.log(user);
            })
            .catch((e)=>{
                console.log("login failed:", e);
            });
      }

    const passwordRef = useRef(null)
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
                                onSubmitEditing={()=>{ passwordRef.current.focus() }}
                    />
                </View>

                <View style={styles.inputText}>
                    <Icon name="lock" style={styles.icon}></Icon>
                    <TextInput style={styles.pass} 
                                ref={passwordRef}
                                placeholder="Mật khẩu"
                                secureTextEntry={!showPassword}
                                textContentType="password"
                                value={password}
                                onChangeText={(text) => setPassword(text)}
                                onSubmitEditing={handleLogin}
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

                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.mainButton} onPress={onGoogleButtonPress}>
                        <View style={styles.backgroundBehindText}/>
                        <Text style={styles.textButton}>
                            Đăng nhập bằng Google
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