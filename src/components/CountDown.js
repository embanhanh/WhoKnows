import { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome.js';
import {  RFValue } from 'react-native-responsive-fontsize';

function CountDown( {time} ) {

    const [times, settimes] = useState( time || 5 )

    useEffect(()=>{
        const id = setInterval(()=>{
            settimes(pre => {
                if(pre === 0){
                    clearInterval(id)
                    return pre
                }
                return pre - 1
            })
            console.log("count...")
        }, 1000)

        return ()=>{
            clearInterval(id)
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
        borderRadius: 25,
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
        fontSize: RFValue(19),
        color: "white",
    },
})

export default CountDown;