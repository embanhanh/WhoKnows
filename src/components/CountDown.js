import { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome.js';
import {  RFValue } from 'react-native-responsive-fontsize';
import { socket } from '../util';

function CountDown( ) {
    const [times, settimes] = useState(0)

    useEffect(()=>{
        socket.on('updateCountdown',(remainTime)=>{
            settimes(remainTime)
        })

        return ()=>{
            socket.off('updateCountdown')
        }
    },[])

    return ( 
        <View style={styles.timeClock}>
            <Icon name="clock-o"  style={styles.clockIcon}></Icon>
            <Text style={styles.timeLeft}>00:{times < 10 ? `0${times}`: times}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    timeClock:{
        position: 'absolute',
        flexDirection: "row",
        borderRadius: RFValue(25),
        alignItems: "center",
        justifyContent: "space-between",
        left: "2%",
        right: "74%",
        top: "-35%",
        backgroundColor: "purple",
    },
    clockIcon: {
        fontSize: RFValue(20),
        color: "white",
        marginLeft: "8%",
    },
    timeLeft: {
        width: "65%",
        fontSize: RFValue(18),
        fontWeight: "bold",
        color: "white",
    },
})

export default CountDown;