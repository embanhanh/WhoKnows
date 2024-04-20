import { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome.js';
import {  RFValue } from 'react-native-responsive-fontsize';
import { Timestamp, doc, onSnapshot, serverTimestamp, updateDoc } from 'firebase/firestore';
import { database } from '../../firebaseconfig';

function CountDown( {time, handleAfterCountDown, idRoom, isStart } ) {
    const idRef = useRef()
    const [times, settimes] = useState(0)
    const [startTime, setStartTime] = useState(0)
    // useEffect(()=>{
    //     settimes(time)
    //     idRef.current = setInterval(()=>{
    //         settimes(pre => {
    //             if(pre > 0){
    //                 return pre - 1
    //             }else{
    //                 clearInterval(idRef.current)
    //                 return pre
    //             }
    //         })
    //         console.log("count...")
    //     }, 1000)

    //     return ()=>{
    //         clearInterval(idRef.current)
    //     }
    // },[time])

    // useEffect(()=>{
    //     if(times === 0 && time > 0){
    //         handleAfterCountDown() 
    //     }
    // },[times])
    useEffect(()=>{
        const unsubscribe = onSnapshot(doc(database,"times",idRoom), async (data)=>{
            if(data.exists()){
                const duration =  data.data().duration
                const startTime =  data.data().startTime
                settimes(duration)
                setStartTime(startTime)
            }
        })
        return ()=> unsubscribe()
    },[])

    useEffect(()=>{
        idRef.current = setInterval(() => {
            settimes(pre => {
                if(pre > 0 ){
                    return pre - 1
                }else{
                    clearInterval(idRef.current)
                    return pre
                }
            });
        }, 1000);

        return () => clearInterval(idRef.current);
    },[startTime])

    useEffect(()=>{
        if(times === 0 && isStart){
            handleAfterCountDown() 
        }
        // if(times === 14 && isStart){
        //     updateDoc(doc(database,"rooms",idRoom),{
        //         finishedCounting: false
        //     })
        // }
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
        fontWeight: "bold",
        color: "white",
    },
})

export default CountDown;