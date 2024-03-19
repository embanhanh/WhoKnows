
import React from "react";
import { View, Text, TouchableOpacity, Alert, StyleSheet, TextInput, ImageBackground, Image } from "react-native";
import styles from "../components/Styles.js";

function GameScreen() {
    
    return ( 
        <ImageBackground source={require('../assets/img/Theme.jpg')} style={styles.container} resizeMode="contain">
            <View style={styles.content}>

            </View>
        </ImageBackground>
    );
}

export default GameScreen;