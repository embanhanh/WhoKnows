
import React from "react";
import { View, Text, TouchableOpacity, Alert, StyleSheet, TextInput, ImageBackground, Image } from "react-native";
import styles from "../components/Styles.js";

function Room() {
    
    return ( 
        <ImageBackground source={require('../assets/img/RoomScreen.jpg')} style={styles.image} resizeMode="cover">
            <View style={styles.content}>

            </View>
        </ImageBackground>
    );
}

export default Room;

