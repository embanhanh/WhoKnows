
import React,{useState, useContext, useCallback } from "react";
import { View, Text, TouchableOpacity, Alert, StyleSheet, ImageBackground, Image, ScrollView, TextInput, Keyboard, TouchableWithoutFeedback, KeyboardAvoidingView} from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome.js';
import Icon2 from 'react-native-vector-icons/MaterialIcons.js';
import Icon3 from 'react-native-vector-icons/Ionicons.js';
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { addDoc, collection, getDocs, onSnapshot, query, orderBy, runTransaction, doc,where,deleteDoc, updateDoc } from "firebase/firestore";


import styles from "../components/Styles.js";
import PlayerCard from "../components/playerCard.js";
import MessageLine from "../components/MessageLine.js";
import { auth, database } from "../../firebaseconfig";
import userContext from "../AuthContext/AuthProvider.js";
import { SafeAreaView } from "react-native-safe-area-context";
import InputMessage from "../components/InputMessage.js";



function GameScreen({route}) {
    const navigation = useNavigation();
    const {user} = useContext(userContext)
    const [member, setMember] = useState([])
    const [host, setHost] = useState('')
    // const [memberId, setMemberId] = useState([])
    const [roomInfo, setRoomInfo] = useState({})
    const [isStart, setIsStart] = useState(false)
    //RoomInfo variables
    const memberId = roomInfo.roomMembers?.map((member)=>member.Id) || []
    const chats = roomInfo.chats || []
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

    const [isCountDown, setIsCountDown] = useState(false)
    const [time, setTime] = useState(7)
    const [msg, setMsg] = useState('')

    //Game Modal
    const [roleVisible, roleModalVisible] = useState(false);
    const [randomVisible, randomModalVisible] = useState(false);
    const [describeVisible, describeModalVisible] = useState(false);
    const [roundVisible, roundModalVisible] = useState(false);
    const [voteVisible, voteModalVisible] = useState(false);
    const [checkVisible, checkModalVisible] = useState(false);
    const [guessVisible, guessModalVisible] = useState(false);
    const [guessResultVisible, guessResultModalVisible] = useState(false);
    const [winLoseVisible, winLoseModalVisible] = useState(false);
    const [resultLoseVisible, resultModalVisible] = useState(false);

    // Fire base
    // members
    useFocusEffect(useCallback(()=>{
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
        return () => {console.log("GameScreen unmount"); unsubscribe()}
    },[]))
    // Start Game
    useFocusEffect(useCallback(()=>{
        if(roomInfo?.isStart){
            console.log("Game Start");
        }

        return ()=>{
            
        }
    },[roomInfo?.isStart]))

    // handle ready/cancel/start 
    const handleReadyCancelStart = async ()=>{
       if(user.uid === host){
            console.log('Start game')
            await updateDoc(docref, {isStart:true})
       }else{
            const docref = doc(database,"rooms",route.params)
            const index = memberId.indexOf(user?.uid)
            roomInfo.roomMembers[index].isReady = !isReady
            await updateDoc(docref, {roomMembers: [...roomInfo.roomMembers]})
       }
    }

    // handle out room
    const handleHome = async () => {
        const docRef = doc(database,"rooms", route.params)
        const index = memberId.indexOf(user?.uid)
        memberId.splice(index,1)
        roomInfo.roomMembers.splice(index,1)
        if(memberId.length !== 0){
            if(user.uid === host){
                const newHost = memberId[Math.floor(Math.random()*memberId.length)]
                await updateDoc(docRef, { roomMaster: newHost, roomMembers: [...roomInfo.roomMembers] })
            }else{
                await updateDoc(docRef, { roomMembers: [...roomInfo.roomMembers] })
            }
        }
        else{
            deleteDoc(docRef)
        }
        navigation.navigate('Home');
    };

    //Input message variable
    const [showTextInput, setShowTextInput] = useState(false);
    // const textInputRef = useRef(null);

    const handleShowTextInput = () => {
        setShowTextInput(true);
        // setTimeout(() => {
        //     if (textInputRef.current) { // Kiểm tra xem textInputRef đã được gán giá trị chưa
        //         textInputRef.current.focus(); // Gọi phương thức focus nếu textInputRef đã tồn tại
        //     }
        // }, 1);
    };

    const handleHideTextInput = () => {
        setShowTextInput(false);
    };
    // handle send message
    const handleSendMessage = async (inputMessage) => {
        console.log(inputMessage);
        if(inputMessage !== ''){
            const docRef = doc(database,"rooms", route.params)
            await updateDoc(docRef, { chats:[...chats, { email: user.email, message: inputMessage, id: user.uid}] })
            setShowTextInput(false)
        }
    }
    useFocusEffect(useCallback(() => {
        const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', handleHideTextInput);

        return () => {
            keyboardDidHideListener.remove();
        };
    }, []));


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
                        memberId.map((member,index)=> index%2==0?
                            <PlayerCard key={index} bubbleType="left" avatarAlignment="flex-start" isManager={member === host} isYou={member === user.uid}></PlayerCard>
                            :<PlayerCard key={index} bubbleType="right" avatarAlignment="flex-end" isManager={member === host} isYou={member === user.uid}></PlayerCard>
                        )
                    }
                    {
                        emptyMembers.map((e,index)=>(memberId.length + index)%2==0 ? 
                            <PlayerCard key={index} avatarAlignment="flex-start" isEmpty={true}></PlayerCard> 
                            :<PlayerCard key={index} avatarAlignment="flex-end" isEmpty={true}></PlayerCard>
                        )
                    } 
                    </View>
                    <View style={styles.chatBoxContainer}>
                        <ScrollView style={styles.chatBox}
                            showsVerticalScrollIndicator={false}
                            showsHorizontalScrollIndicator={false} 
                            contentContainerStyle={{
                            justifyContent: "flex-end", 
                            paddingVertical: "4%",
                            paddingHorizontal: "1%",
                            flexGrow: 1
                        }}
                        >
                            {
                                chats.map(({ email, message, id}, index) => (
                                    <MessageLine key={index} email={email} message={message} role={id === 'system' && 'System' || id === host && 'Manager' || id === user.uid && 'You'}/>
                                ))
                            }
                        </ScrollView>
                    </View>
                </View>

                <View style={styles.gameToolsContainer}>
                    {/* <TouchableOpacity style={styles.toolsButton}>
                        <Icon name="pencil"  style={styles.toolsIcon}></Icon>
                    </TouchableOpacity> */}
                    <TouchableOpacity style={styles.toolsButton}
                        disabled={user.uid === host && (countReady !== memberId.length || countReady < 4) }
                        onPress={handleReadyCancelStart}
                    >
                        <Text>{user.uid === host && "Bắt đầu" || isReady && "Hủy" || "Sẵn sàng"}</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.rulesButton}>
                        <Icon name="question"  style={styles.rulesIcon}></Icon>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.messageButton} onPress={handleShowTextInput}>
                        <Icon2 name="message" style={styles.messageIcon}></Icon2>
                    </TouchableOpacity>

                    {showTextInput && (
                        <InputMessage handleSendMessage={handleSendMessage}></InputMessage>
                    )}
                </View>
            </View>
        </ImageBackground>
    );
}

export default GameScreen;