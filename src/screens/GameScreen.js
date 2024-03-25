
import React,{useState, useLayoutEffect} from "react";
import { View, Text, TouchableOpacity, Alert, StyleSheet, TextInput, ImageBackground, Image, ScrollView} from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome.js';
import Icon2 from 'react-native-vector-icons/MaterialIcons.js';
import { useNavigation } from "@react-navigation/core";
import { addDoc, collection, getDocs, onSnapshot, query, orderBy, runTransaction, doc } from "firebase/firestore";


import styles from "../components/Styles.js";
import PlayerCard from "../components/playerCard.js";
import MessageLine from "../components/MessageLine.js";
import { auth, database } from "../../firebaseconfig";


function GameScreen() {
    const navigation = useNavigation();

    const [isCountDown, setIsCountDown] = useState(false)
    const [time, setTime] = useState(7)
    const [msg, setMsg] = useState('')
    const [chats, setChats] = useState([])

    // Fire base
    useLayoutEffect(()=>{
        const q = query(collection(database, "chats"), orderBy("createAt","asc") );
        const unsubscribe = onSnapshot(q, (data)=>{
            if(data){
                setChats(data.docs?.map((dt) => dt.data()))
            }
        },(e)=>{
            Alert.alert("Error: ", e.message)
        })
        return () => unsubscribe()
    },[])

    const handleHome = () => {
        navigation.navigate('Home');
    };

    const members = [
        {isManager: true},
        {isYou: true},
        {},
        {},
        {},
        {},
        {},
        {},
    ]

    return ( 
        <ImageBackground source={require('../assets/img/Theme2.jpg')} style={styles.backgroundImage}>
            <View style={styles.container}>
                <View style={styles.roomInfo}>
                    <Image source={require('../assets/img/RoomInfo.png')} style={styles.roomImage}></Image>
                    <Text style={styles.textRoomNumber}>Số phòng: A13</Text>
                    <Text style={styles.textWord}>Ghost</Text>
                    <TouchableOpacity style={styles.homeButton} onPress={handleHome}>
                        <Icon name="sign-out"  style={styles.homeIcon}></Icon>
                    </TouchableOpacity>
                    <View style={styles.timeClock}>
                        <Icon name="clock-o"  style={styles.clockIcon}></Icon>
                        <Text style={styles.timeLeft}>00:51</Text>
                    </View>
                    <Image source={require('../assets/img/character-EvilGhost.gif')} style={styles.characterGif}></Image>
                </View>

                <View style={styles.playContainer}>
                    <View style={styles.joinedPlayer}>
                    {
                            members.map((member,index)=>{
                                if(index%2==0){
                                    return(
                                        <PlayerCard key={index} bubbleType="left" avatarAlignment="flex-start" {...member}></PlayerCard>
                                    )
                                }else{
                                    return(
                                        <PlayerCard key={index} bubbleType="right" avatarAlignment="flex-end" {...member}></PlayerCard>
                                    )
                                }
                            })
                        }
                    </View>

                    <View style={styles.chatBoxContainer}>
                        <ScrollView style={styles.chatBox}
                        showsVerticalScrollIndicator={false}
                        showsHorizontalScrollIndicator={false} 
                        contentContainerStyle={{
                            justifyContent: "center", 
                            paddingVertical: "4%",
                            paddingHorizontal: "1%",
                            flexGrow: 1
                        }}>
                            {
                                chats.map(({ email, message, role }, index) => (
                                    <MessageLine key={index} email={email} message={message} role={role}/>
                                ))
                            }
                        </ScrollView>
                    </View>
                </View>

                <View style={styles.gameToolsContainer}>
                    <TouchableOpacity style={styles.toolsButton}>
                        <Icon name="pencil"  style={styles.toolsIcon}></Icon>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.rulesButton}>
                        <Icon name="question"  style={styles.rulesIcon}></Icon>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.messageButton}>
                        <Icon2 name="message" style={styles.messageIcon}></Icon2>
                    </TouchableOpacity>
                </View>
            </View>
         </ImageBackground>
    );
}

export default GameScreen;