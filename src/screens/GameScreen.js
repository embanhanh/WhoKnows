
import React,{useState, useLayoutEffect, useContext, useRef, useEffect } from "react";
import { View, Text, TouchableOpacity, Alert, StyleSheet, ImageBackground, Image, ScrollView, TextInput, Keyboard, TouchableWithoutFeedback, KeyboardAvoidingView} from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome.js';
import Icon2 from 'react-native-vector-icons/MaterialIcons.js';
import Icon3 from 'react-native-vector-icons/Ionicons.js';
import { useNavigation } from "@react-navigation/core";
import { addDoc, collection, getDocs, onSnapshot, query, orderBy, runTransaction, doc,where,deleteDoc, updateDoc } from "firebase/firestore";


import styles from "../components/Styles.js";
import PlayerCard from "../components/playerCard.js";
import MessageLine from "../components/MessageLine.js";
import { auth, database } from "../../firebaseconfig";
import userContext from "../AuthContext/AuthProvider.js";
import { SafeAreaView } from "react-native-safe-area-context";



function GameScreen({route}) {
    const navigation = useNavigation();
    const {user} = useContext(userContext)
    const [member, setMember] = useState([])
    const [host, setHost] = useState('')
    const [memberId, setMemberId] = useState([])

    const [isCountDown, setIsCountDown] = useState(false)
    const [time, setTime] = useState(7)
    const [msg, setMsg] = useState('')
    const [chats, setChats] = useState([])

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
                    const cc = data.data().roomMembers
                    setMemberId(cc)
                    // console.log(data.data().roomMembers);
                    // const userQuery = query(collection(database, "user"), where('userId', "in", data.data().roomMembers));
                    // const membersSnapshot = await getDocs(userQuery);
                    // const members = membersSnapshot.docs.map((dt) => dt.data());
                    // setMember(members)
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
            setMemberId(newMemberId)
        }
        navigation.navigate('Home');
    };

    const [inputMessage, setInputMessage] = useState('');
    const [showTextInput, setShowTextInput] = useState(false);
    const textInputRef = useRef(null);

    const handleShowTextInput = () => {
        setShowTextInput(true);
        setTimeout(() => {
            if (textInputRef.current) { // Kiểm tra xem textInputRef đã được gán giá trị chưa
                textInputRef.current.focus(); // Gọi phương thức focus nếu textInputRef đã tồn tại
            }
        }, 1);
    };

    const handleHideTextInput = () => {
        setShowTextInput(false);
    };

    useEffect(() => {
        const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', handleHideTextInput);

        return () => {
            keyboardDidHideListener.remove();
        };
    }, []);


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
                                            <PlayerCard key={index} bubbleType="left" avatarAlignment="flex-start" isManager={member === host} isYou={member === user.uid}></PlayerCard>
                                        )
                                    }else{
                                        return(
                                            <PlayerCard key={index} bubbleType="right" avatarAlignment="flex-end" isManager={member === host} isYou={member === user.uid}></PlayerCard>
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
                                justifyContent: "flex-start", 
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


                        <TouchableOpacity style={styles.messageButton} onPress={handleShowTextInput}>
                            <Icon2 name="message" style={styles.messageIcon}></Icon2>
                        </TouchableOpacity>

                        {showTextInput && (
                            <View style={styles.inputContainer}>
                                <TextInput
                                    ref={textInputRef}
                                    style={styles.textInput}
                                    placeholder="Nhập tin nhắn..."
                                    onChangeText={(text) => setInputMessage(text)}
                                    value={inputMessage}
                                    onSubmitEditing={() => {
                                        setInputMessage('');
                                    }}
                                />
                                <TouchableOpacity style={styles.sendButton}>
                                    <Icon3 name="send" style={styles.sendIcon}></Icon3>
                                </TouchableOpacity>
                            </View>
                        )}
                    </View>
                </View>
            </ImageBackground>
    );
}

export default GameScreen;