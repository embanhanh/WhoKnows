import React, {useState} from "react";
import { View, Text, TextInput, TouchableOpacity, Pressable, SafeAreaView, Alert } from "react-native";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import IconPass from 'react-native-vector-icons/FontAwesome'
import { createUserWithEmailAndPassword } from "firebase/auth";

import styles from "../components/Styles.js";
import LoginTitle from "../components/IconAndImage/index.js"
import { auth } from "../../firebaseconfig.js";

function SignUp({ navigation }) {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

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
    }

    return ( 
        <View style={styles.containers } >
            <View style={styles.title}>
                <LoginTitle/>
            </View>

            <SafeAreaView style={styles.login}>
                <View style={styles.header}>
                    <Text style={styles.textHeader}>Welcome!!</Text>
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
                </View>

                <TouchableOpacity onPress={handleSignup}>
                    <Text style={styles.loginButton}>
                        Sign Up
                    </Text>
                </TouchableOpacity>

                <View style={styles.signUpAccount}>
                    <Text style={styles.text}>
                        Already have an account?
                    </Text>

                    <Pressable onPress={() => navigation.navigate('Signin')}>
                        <Text style={styles.textSignIU}>
                            Sign In
                        </Text>
                    </Pressable>
                </View>
            </SafeAreaView>
        </View>
    );
}

export default SignUp;