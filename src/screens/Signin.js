import React from "react";
import { View, Text, Image, TextInput, TouchableOpacity, Pressable, KeyboardAvoidingView } from "react-native";

import styles from "../components/Styles.js";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import IconPass from 'react-native-vector-icons/FontAwesome'
import { useRoute } from "@react-navigation/native";

function Signin() {
    return ( 
        <View style={styles.containers } >
            <View style={styles.title}>
                <Image source={require('../assets/img/title.png')} style={styles.titleIcon}></Image>
                <Image source={require('../assets/img/5.png')} style={styles.plusIcon}></Image>
                <Image source={require('../assets/img/2.png')} style={styles.minusIcon}></Image>
                <Image source={require('../assets/img/1.png')} style={styles.multiplyIcon}></Image>
                <Image source={require('../assets/img/6.png')} style={styles.moreThanIcon}></Image>
                <Image source={require('../assets/img/7.png')} style={styles.lessThanIcon}></Image>
                <Image source={require('../assets/img/8.png')} style={styles.percentageIcon}></Image>
                <Image source={require('../assets/img/3.png')} style={styles.divideIcon}></Image>
                <Image source={require('../assets/img/4.png')} style={styles.equalIcon}></Image>
            </View>

            <View style={styles.login}>
                <View style={styles.header}>
                    <Text style={styles.textHeader}>Sign In</Text>
                </View>

                <KeyboardAvoidingView>
                    <View style={styles.inputAcc}>
                        <Icon name="gmail" size={30}></Icon>
                        <TextInput style={styles.email}
                                    placeholder="Gmail adress"/>
                    </View>

                    <View>
                        <View style={styles.inputPass}>
                            <IconPass name="lock" size={30}></IconPass>
                            <TextInput style={styles.password} 
                                        placeholder="Password"/>
                        </View>
                        <Text style={styles.textForgot}>Forgot your password ?</Text>
                    </View>
                </KeyboardAvoidingView>

                <TouchableOpacity>
                    <Text style={styles.loginButton}>
                        Login
                    </Text>
                </TouchableOpacity>

                <View style={styles.signUpAccount}>
                    <Text style={styles.text}>
                        Don't have an account?
                    </Text>

                    <Pressable>
                        <Text style={styles.textSignIU}>
                            SignUp
                        </Text>
                    </Pressable>
                </View>
            </View>
        </View>
    );
}

export default Signin;