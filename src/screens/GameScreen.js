
import React,{useState, useLayoutEffect, useContext} from "react";
import { View, Text, TouchableOpacity, Alert, StyleSheet, TextInput, ImageBackground, Image, ScrollView} from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome.js';
import Icon2 from 'react-native-vector-icons/MaterialIcons.js';
import { useNavigation } from "@react-navigation/core";
import { addDoc, collection, getDocs, onSnapshot, query, orderBy, runTransaction, doc,where,deleteDoc, updateDoc } from "firebase/firestore";


import styles from "../components/Styles.js";
import PlayerCard from "../components/playerCard.js";
import MessageLine from "../components/MessageLine.js";
import { auth, database } from "../../firebaseconfig";
import userContext from "../AuthContext/AuthProvider.js";



function GameScreen({route}) {
    const navigation = useNavigation();
    const {user} = useContext(userContext)
    const [member, setMember] = useState([])
    const [host, setHost] = useState('')
    // const [memberId, setMemberId] = useState([])
    const [roomInfo, setRoomInfo] = useState({})

    const [isCountDown, setIsCountDown] = useState(false)
    const [time, setTime] = useState(7)
    const [msg, setMsg] = useState('')
    const [chats, setChats] = useState([])

    // RoomInfo variables
    const memberId = roomInfo.roomMembers?.map((member)=>member.Id) || []
    const emptyMembers = new Array((roomInfo?.maxPlayers-memberId.length) || 0)
    emptyMembers.fill(1)
    const isReady = roomInfo.roomMembers?.find((member)=>member.Id === user.uid).isReady || false
    const countReady = roomInfo.roomMembers?.reduce((acc, member)=>{
        if(member.isReady)
            return acc+1;
        else
            return acc
    },0)
    console.log(countReady);
    // Fire base
    // chats
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
    // members
    useLayoutEffect(()=>{
        const unsubscribe = onSnapshot(doc(database,"rooms",route.params), async (data)=>{
            if(data.exists()){
                try {
                    setRoomInfo(data.data())
                    const newHost = data.data().roomMaster
                    if(newHost !== host)
                        setHost(newHost)
                } catch (error) {
                    console.error("Lỗi khi lấy dữ liệu thành viên:", error);
                    Alert.alert("Lỗi", "Lấy dữ liệu thành viên thất bại"); 
                }
            }
        },(e)=>{
            Alert.alert("Error: ", e.message)
        })
        return () => unsubscribe()
    },[])

    // handle ready/cancel/start 
    const handleReadyCancelStart = async ()=>{
        //logic
    }

    // handle out room
    const handleHome = async () => {
        const docRef = doc(database,"rooms", route.params)
        if(typeof memberId === "object"){
            const index = memberId.indexOf(user?.uid)
            const newMemberId = memberId
            newMemberId.splice(index,1)
            if(newMemberId.length !== 0){
                if(user.uid === host){
                    const newHost = newMemberId[Math.floor(Math.random()*newMemberId.length)]
                    await updateDoc(docRef, { roomMaster: newHost, roomMembers: [...newMemberId] })
                }else{
                    await updateDoc(docRef, { roomMembers: [...newMemberId] })
                }
            }
            else{
                deleteDoc(docRef)
            }
        }
        navigation.navigate('Home');
    };

    return ( 
        <ImageBackground source={require('../assets/img/Theme2.jpg')} style={styles.backgroundImage}>
            <View style={styles.container}>
                <View style={styles.roomInfo}>
                    <Image source={require('../assets/img/RoomInfo.png')} style={styles.roomImage}></Image>
                    <Text style={styles.textRoomNumber}>ID phòng: {route.params}</Text>
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
                            memberId.map((member,index)=>{
                                if(index%2==0){
                                    return(
                                        <PlayerCard key={member} bubbleType="left" avatarAlignment="flex-start" isManager={member === host} isYou={member === user.uid}></PlayerCard>
                                    )
                                }else{
                                    return(
                                        <PlayerCard key={member} bubbleType="right" avatarAlignment="flex-end" isManager={member === host} isYou={member === user.uid}></PlayerCard>
                                    )
                                }
                            })
                        }
                        {
                           emptyMembers.map((e,index)=>{
                            if((memberId.length + index)%2==0){
                                return(
                                    <PlayerCard key={index} avatarAlignment="flex-start" isEmpty={true}></PlayerCard>
                                )
                            }else{
                                return(
                                    <PlayerCard key={index} avatarAlignment="flex-end" isEmpty={true}></PlayerCard>
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
                    {/* <TouchableOpacity style={styles.toolsButton}>
                        <Icon name="pencil"  style={styles.toolsIcon}></Icon>
                    </TouchableOpacity> */}
                    <TouchableOpacity style={styles.toolsButton} disabled={user.uid === host && countReady !== memberId.length}>
                        {/* <Icon name="pencil"  style={styles.toolsIcon}></Icon> */}
                        <Text>{user.uid === host && "Bắt đầu" || isReady && "Hủy" || "Sẵn sàng"}</Text>
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