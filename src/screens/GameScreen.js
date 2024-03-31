
import React,{useState, useContext, useCallback } from "react";
import { View, Text, TouchableOpacity, Alert, StyleSheet, ImageBackground, Image, ScrollView, TextInput, Keyboard, TouchableWithoutFeedback, KeyboardAvoidingView} from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome.js';
import Icon2 from 'react-native-vector-icons/MaterialIcons.js';
import Icon3 from 'react-native-vector-icons/Ionicons.js';
import Icon4 from 'react-native-vector-icons/MaterialCommunityIcons.js';

import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { addDoc, collection, getDocs, onSnapshot, query, orderBy, runTransaction, doc,where,deleteDoc, updateDoc, getDoc } from "firebase/firestore";


import styles from "../components/Styles.js";
import PlayerCard from "../components/playerCard.js";
import MessageLine from "../components/MessageLine.js";
import { auth, database } from "../../firebaseconfig";
import userContext from "../AuthContext/AuthProvider.js";
import { SafeAreaView } from "react-native-safe-area-context";
import InputMessage from "../components/InputMessage.js";
import ModalGameRole from "../components/ModalGameRole.js";
import ModalGameDescribeInput from "../components/ModalGameDescribeInput.js";
import keywordContext from "../AuthContext/KeywordProvider.js";
import ModalGameGuessWord from "../components/ModalGameGuessWord.js";
import ModalGameRoundEnd from "../components/ModalGameRoundEnd.js";



function GameScreen({route}) {
    const navigation = useNavigation();
    const {user} = useContext(userContext)
    const keywords = useContext(keywordContext)
    // State
    const [member, setMember] = useState([])
    const [host, setHost] = useState('')
    const [roomInfo, setRoomInfo] = useState({})
    const [isGhost, setIsGhost] = useState(false)
    const [keyword, setKeyword] = useState({})
    //RoomInfo variables
    const memberId = roomInfo.roomMembers?.map((member)=>member.Id) || []
    const chats = roomInfo.chats || []
    const emptyMembers = new Array((roomInfo?.maxPlayers-memberId.length) || 0)
    emptyMembers.fill(1)
    const isReady = roomInfo.roomMembers?.find((member)=>member.Id === user.uid)?.isReady || false
    const countReady = roomInfo.roomMembers?.reduce((acc, member)=>{
        if(member.isReady)
            return acc+1;
        else
            return acc
    },0)
    const isStart = roomInfo.isStart || false
    console.log(user.email, countReady);

    const [isCountDown, setIsCountDown] = useState(false)
    const [time, setTime] = useState(7)

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

    const handleCloseRoleModal = () =>{
        roleModalVisible(!roleVisible)
        setKeyword(roomInfo.keyword)
    }

    const handleCloseDescribeModal = () =>{
        describeModalVisible(!describeVisible)
    }

    const handleCloseGuessModal = () =>{
        guessModalVisible(!guessVisible)
    }

    const handleCloseRoundModal = () =>{
        roundModalVisible(!roundVisible)
    }

    // Fire base
    // members
    useFocusEffect(useCallback(()=>{
        const unsubscribe = onSnapshot(doc(database,"rooms",route.params), async (data)=>{
            if(data.exists()){
                try {
                    setRoomInfo(()=>{console.log("setRoom", user.uid); return data.data()})
                    const newHost = data.data().roomMaster
                    if(newHost !== host){
                        setHost((pre)=>{ console.log(pre === newHost); return newHost})
                    }
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

    // ---------------Logic Game Start ---------------
    // Start Game
    useFocusEffect(useCallback( ()=>{
        if(isStart){
           roomInfo.roomMembers.forEach(mb => {
               if(mb.Id === user.uid && mb.isGhost){
                    setIsGhost(true)
               }
           })
           roleModalVisible(true)
        }
        return ()=>{
            console.log("...");
        }
    },[isStart]))
    // handle Describe
    const handleDescribe = ()=>{
        describeModalVisible(true)
    }

    // ------------------Logic Game End -----------------

    // handle ready/cancel/start 
    const handleReadyCancelStart = async ()=>{
        const docref = doc(database,"rooms",route.params)
        if(user.uid === host){
            console.log('Start game')
            const num1 = Math.floor(Math.random() * memberId.length)
            roomInfo.roomMembers[num1].isGhost = true
            if(memberId.length > 5){
                let num2;
                do {
                    num2 = Math.floor(Math.random() * memberId.length); 
                } while (num2 === num1); 
                roomInfo.roomMembers[num2].isGhost = true
            }
            const keyword = keywords[Math.floor(Math.random()*keywords.length)]
            await updateDoc(docref, {isStart:true, roomMembers: [...roomInfo.roomMembers], keyword: keyword})
        }else{
            const index = memberId.indexOf(user?.uid)
            roomInfo.roomMembers[index].isReady = !isReady
            await updateDoc(docref, {roomMembers: [...roomInfo.roomMembers]})
        }
    }

    // handle out room
    const handleHome = async () => {
        navigation.navigate('Home');
        const docRef = doc(database,"rooms", route.params)
        const index = memberId.indexOf(user?.uid)
        memberId.splice(index,1)
        roomInfo.roomMembers.splice(index,1)
        if(memberId.length !== 0){
            if(user.uid === host){
                const random = Math.floor(Math.random()*memberId.length)
                const newHost = memberId[random]
                roomInfo.roomMembers[random].isReady = true
                await updateDoc(docRef, { roomMaster: newHost, roomMembers: [...roomInfo.roomMembers] })
            }else{
                await updateDoc(docRef, { roomMembers: [...roomInfo.roomMembers] })
            }
        }
        else{
            deleteDoc(docRef)
        }
    };

    //Input message variable
    const [showTextInput, setShowTextInput] = useState(false);

    const handleShowTextInput = () => {
        setShowTextInput(true);
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
                        <Text style={styles.textWord}>{isStart && !isGhost && keyword.key}</Text>
                        <TouchableOpacity style={styles.homeButton} onPress={handleHome}>
                            <Icon name="sign-out"  style={styles.homeIcon}></Icon>
                        </TouchableOpacity>

                        {/* Test */}
                        <TouchableOpacity style={styles.testButton} onPress={() => guessModalVisible(!guessVisible)}>
                            <Icon name="hourglass"  style={styles.testIcon}></Icon>
                        </TouchableOpacity>
                        
                        <View style={styles.timeClock}>
                            <Icon name="clock-o"  style={styles.clockIcon}></Icon>
                            <Text style={styles.timeLeft}>00:51</Text>
                        </View>
                        {isGhost && isStart &&<Image source={require('../assets/img/role-Ghost.png')} style={styles.characterGif}></Image>
                        || isStart && <Image source={require('../assets/img/role-Villager.png')} style={styles.characterGif}></Image>}
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
                                paddingVertical: "10%",
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
                    {isStart ?
                        <TouchableOpacity style={styles.toolsButton} onPress={handleDescribe}>
                            <Icon name="pencil"  style={styles.toolsIcon}></Icon>
                        </TouchableOpacity> :
                        <TouchableOpacity style={styles.toolsButton}
                            disabled={user.uid === host && (countReady !== memberId.length /*|| countReady < 4*/) }
                            onPress={handleReadyCancelStart}
                        >
                            <Text>{user.uid === host && "Bắt đầu" || isReady && "Hủy" || "Sẵn sàng"}</Text>
                        </TouchableOpacity>
                    }


                    <TouchableOpacity style={styles.rulesButton}>
                        <Icon name="question"  style={styles.rulesIcon}></Icon>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.historyButton} onPress={() => roundModalVisible(!roundVisible)}>
                        <Icon4 name="clipboard-text-clock"  style={styles.historyIcon}></Icon4>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.messageButton} onPress={handleShowTextInput}>
                        <Icon3 name="chatbubble-ellipses-sharp" style={styles.messageIcon}></Icon3>
                    </TouchableOpacity>

                    {showTextInput && (
                        <InputMessage handleSendMessage={handleSendMessage}></InputMessage>
                    )}

                    {
                        roleVisible && 
                        <ModalGameRole
                            isGhost={isGhost}
                            handleCloseRoleModal={handleCloseRoleModal}
                        />
                    }

                    {
                        describeVisible && 
                        <ModalGameDescribeInput
                            describeVisible={describeVisible}
                            handleCloseDescribeModal={handleCloseDescribeModal}
                        />
                    }

                    {
                        guessVisible && 
                        <ModalGameGuessWord
                            guessVisible={guessVisible}
                            handleCloseGuessModal={handleCloseGuessModal}
                        />
                    }

                    {
                        roundVisible && 
                        <ModalGameRoundEnd
                            roundVisible={roundVisible}
                            handleCloseRoundModal={handleCloseRoundModal}
                        />
                    }
                </View>
            </View>
        </ImageBackground>
    );
}

export default GameScreen;