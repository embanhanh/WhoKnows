import React from "react";
import { View, Text, Image, TextInput, TouchableOpacity, Pressable } from "react-native";

import styles from "../components/Styles.js";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import IconPass from 'react-native-vector-icons/FontAwesome'

function Signup() {
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
                    <Text style={styles.textHeader}>Welcome</Text>
                </View>

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
                </View>

                <TouchableOpacity>
                    <Text style={styles.loginButton}>
                        Sign Up
                    </Text>
                </TouchableOpacity>

                <View style={styles.signUpAccount}>
                    <Text style={styles.text}>
                        Already have an account?
                    </Text>

                    <Text style={styles.textSignIU}>
                        Sign In
                    </Text>
                </View>
            </View>
        </View>
    );
}

export default Signup;