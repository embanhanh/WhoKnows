import React from "react";
import { View, Image, StyleSheet } from "react-native"

const LoginTitle = () => {
    return (
        <View style={Style.title}>
            <Image source={require('../assets/img/title.png')} style={Style.titleIcon}></Image>
            <Image source={require('../assets/img/5.png')} style={Style.plusIcon}></Image>
            <Image source={require('../assets/img/2.png')} style={Style.minusIcon}></Image>
            <Image source={require('../assets/img/1.png')} style={Style.multiplyIcon}></Image>
            <Image source={require('../assets/img/6.png')} style={Style.moreThanIcon}></Image>
            <Image source={require('../assets/img/7.png')} style={Style.lessThanIcon}></Image>
            <Image source={require('../assets/img/8.png')} style={Style.percentageIcon}></Image>
            <Image source={require('../assets/img/3.png')} style={Style.divideIcon}></Image>
            <Image source={require('../assets/img/4.png')} style={Style.equalIcon}></Image>
        </View> 
    )
  }
  
  export default LoginTitle

  const Style = StyleSheet.create({
    title: {
        flex: 1,                      
        position: "relative",
        justifyContent: 'center',
        alignItems: 'center',
    },

    titleIcon: {
        position:"absolute",
        bottom: "17%"
    },

    plusIcon:{
        position:"absolute",
        top: "50%",
        right:"15%",
    },

    minusIcon:{
        position:"absolute",
        top: "76%",
        right:"15%",
    },

    divideIcon: {
        position:"absolute",
        top: "60%",
        left: "14%",
    },

    equalIcon: {
        position:"absolute",
        top: "77%",
        left: "25%",
    },

    multiplyIcon: {
        position:"absolute",
        top: "25%",
        right:"2%",
    },

    moreThanIcon: {
        position:"absolute",
        top: "2%",
        right:"10%",
    },

    lessThanIcon: {
        position:"absolute",
        top: "35%",
        left: "4%",
    },

    percentageIcon: {
        position:"absolute",
        top: "5%",
        left: "21%",
    },
});