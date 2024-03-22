import React from "react";
import { View, Image, StyleSheet } from "react-native"

const LogoGame = () => {
    return (
        <View style={Style.title}>
            <Image source={require('../assets/img/LogoGif.gif')} style={Style.logoImage}></Image>
            <Image source={require('../assets/img/logoTitle.png')} style={Style.titleIcon}></Image>
        </View> 
    )
  }
  
  export default LogoGame

  const Style = StyleSheet.create({
    title: {
        flex: 1,
        position: "relative",
        justifyContent: 'center',
        alignItems: 'center',
    },

    titleIcon: {
        position:"absolute",
        width: "80%",
        height: "80%",
        top: "55%"
    },

    logoImage: {
        position:"absolute",
        width: "80%",
        height: "80%",
        bottom: "20%",
        resizeMode: "contain"
    },
});