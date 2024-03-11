import React from "react";
import { View, Image } from "react-native"

import Style from "./style";

const LoginTitle = () => {
    return (
        <View style={Style.title}>
            <Image source={require('../../assets/img/title.png')} style={Style.titleIcon}></Image>
            <Image source={require('../../assets/img/5.png')} style={Style.plusIcon}></Image>
            <Image source={require('../../assets/img/2.png')} style={Style.minusIcon}></Image>
            <Image source={require('../../assets/img/1.png')} style={Style.multiplyIcon}></Image>
            <Image source={require('../../assets/img/6.png')} style={Style.moreThanIcon}></Image>
            <Image source={require('../../assets/img/7.png')} style={Style.lessThanIcon}></Image>
            <Image source={require('../../assets/img/8.png')} style={Style.percentageIcon}></Image>
            <Image source={require('../../assets/img/3.png')} style={Style.divideIcon}></Image>
            <Image source={require('../../assets/img/4.png')} style={Style.equalIcon}></Image>
        </View> 
    )
  }
  
  export default LoginTitle