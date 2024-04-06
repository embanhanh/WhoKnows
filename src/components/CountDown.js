import { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome.js';
import {  RFValue } from 'react-native-responsive-fontsize';

function CountDown( {time, handleAfterCountDown } ) {
    const idRef = useRef()
    const [times, settimes] = useState(time)
    useEffect(()=>{
        settimes(time)
        idRef.current = setInterval(()=>{
            settimes(pre => {
                if(pre > 0){
                    return pre - 1
                }else{
                    clearInterval(idRef.current)
                    return pre
                }
            })
            console.log("count...")
        }, 1000)

        return ()=>{
            clearInterval(idRef.current)
        }
    },[time])

    useEffect(()=>{
        if(times === 0 && time > 0){
            handleAfterCountDown() 
        }
    },[times])
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
        color: "white",
    },
})

export default CountDown;