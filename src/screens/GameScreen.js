
import React,{useState, useContext, useCallback, useEffect } from "react";
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
import CountDown from "../components/CountDown.js";
import ModalGameResultGuess from "../components/ModalGameResultGuess.js";
import ModalGameResult from "../components/ModalGameResult.js";



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
    const [time, setTime] = useState(0)
    const [isCountDown, setIsCountDown] = useState(false)
    const [isStartAnswer, setIsStartAnswer] = useState(false)
    const [memberAnswer, setMemberAnswer] = useState(-1)
    const [isAnswer, setIsAnswer] = useState(false)
    const [answer, setAnswer] = useState("...")
    const [countAnswer, setCountAnswer] = useState(0)
    //RoomInfo variables
    const answers = roomInfo.answers || []
    const roomMembers = roomInfo.roomMembers || []
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


    //Game Modal
    const [roleVisible, roleModalVisible] = useState(false);
    const [describeVisible, describeModalVisible] = useState(false);
    const [roundVisible, roundModalVisible] = useState(false);
    const [voteVisible, voteModalVisible] = useState(false);
    const [checkVisible, checkModalVisible] = useState(false);
    const [guessVisible, guessModalVisible] = useState(false);
    const [guessResultVisible, guessResultModalVisible] = useState(false);
    const [winLoseVisible, winLoseModalVisible] = useState(false);
    const [resultVisible, resultModalVisible] = useState(false);

    const handleCloseDescribeModal = () =>{
        describeModalVisible(false)
    }

    const handleCloseGuessModal = () =>{
        guessModalVisible(!guessVisible)
    }

    const handleCloseRoundModal = () =>{
        roundModalVisible(!roundVisible)
    }

    const handleCloseGuessResultModal = () =>{
        guessResultModalVisible(!guessResultVisible)
    }

    const handleCloseResultModal = () =>{
        resultModalVisible(!resultVisible)
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
                    const startAnswer = data.data().isStartAnswer
                    if(startAnswer){
                        setIsStartAnswer(true)
                    }
                    const newMemberAnswer = data.data().memberAnswer
                    if(memberAnswer !== newMemberAnswer){
                        setMemberAnswer(newMemberAnswer)
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
    useFocusEffect(useCallback(()=>{
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
    // Start Answer
    useFocusEffect(useCallback(()=>{
       if(isStartAnswer && answers.length !== memberId.length){
            setTime(30)
            setIsCountDown(true)
            if(user.uid === memberId[memberAnswer]){
                setIsAnswer(true)
            }
       }
       if(answers.length === memberId.length){
            console.log("End Answer");
       }
    },[isStartAnswer, memberAnswer]))
    // handle Describe
    const handleDescribe = ()=>{
        describeModalVisible(true)
    }
    // handle logic sau khi hiện role
    const handleCloseRoleModal = async () =>{
        roleModalVisible(false)
        setKeyword(roomInfo.keyword)
        if(user.uid === host){
            const docRef = doc(database,'rooms',route.params)
            await updateDoc(docRef,{chats: [...chats, {email: "Hệ thống gợi ý", message: roomInfo.keyword.suggest[0], id: "system"}]})
        }
        setMemberAnswer(roomInfo.memberAnswer)
        setTime(10)
        setIsCountDown(() =>{console.log("Set CountDown"); return true})
    }
    // handle confirm answer
    const handleConfirm = (text)=>{
        setAnswer(text)
        describeModalVisible(false)
        setIsAnswer(false)
    }
    // handle after countDown
    const handleAfterCountDown = async ()=>{
        setIsCountDown(false)
        if(user.uid === memberId[memberAnswer] && isStartAnswer){
            setIsAnswer(false)
            roomInfo.roomMembers[memberAnswer].answer = answer
            await updateDoc(doc(database,'rooms',route.params),{ 
                memberAnswer: (memberAnswer + 1)% memberId.length, 
                answers: [...answers, {id: user.uid, answer: answer}],
                roomMembers: [...roomInfo.roomMembers]
            })
        }
        if(user.uid === host && !isStartAnswer){
            await updateDoc(doc(database,'rooms',route.params), {isStartAnswer: true})
        }
    }
    // ------------------Logic Game End -----------------
    // random
    const random = (length) =>{
        return Math.floor(Math.random() * length)
    }

    // handle ready/cancel/start 
    const handleReadyCancelStart = async ()=>{
        const docref = doc(database,"rooms",route.params)
        if(user.uid === host){
            console.log('Start game')
            const num1 = random(memberId.length)
            roomInfo.roomMembers[num1].isGhost = true
            if(memberId.length > 5){
                let num2;
                do {
                    num2 = random(memberId.length); 
                } while (num2 === num1); 
                roomInfo.roomMembers[num2].isGhost = true
            }
            const keyword = keywords[random(keywords.length)]
            const answer = random(memberId.length)
            await updateDoc(docref, {isStart:true, roomMembers: [...roomInfo.roomMembers], keyword: keyword, memberAnswer: answer})
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

                        {/* <TouchableOpacity style={styles.testButton} onPress={() => guessModalVisible(!guessVisible)}>
                            <Icon name="hourglass"  style={styles.testIcon}></Icon>
                        </TouchableOpacity> */}
                        
                        {
                            isCountDown && <CountDown time={time} handleAfterCountDown={handleAfterCountDown}/> 
                        }
                        {isGhost && isStart &&<Image source={require('../assets/img/role-Ghost.png')} style={styles.characterGif}></Image>
                        || isStart && <Image source={require('../assets/img/role-Villager.png')} style={styles.characterGif}></Image>}
                    </View>

                <View style={styles.playContainer}>
                    <View style={styles.joinedPlayer}>
                    {
                        roomMembers.map((member,index)=> index%2==0?
                            <PlayerCard key={index} bubbleType="left" avatarAlignment="flex-start" 
                                isManager={member.Id === host} isYou={member.Id === user.uid}
                                answer={member.answer}
                            ></PlayerCard>
                            :<PlayerCard key={index} bubbleType="right" 
                                avatarAlignment="flex-end" isManager={member.Id === host} isYou={member.Id === user.uid}
                                answer={member.answer}
                            ></PlayerCard>
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
                        <TouchableOpacity style={styles.toolsButton} onPress={handleDescribe} disabled={!isAnswer}>
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
                        <Icon name="question" style={styles.rulesIcon} onPress={() => resultModalVisible(!resultVisible)}></Icon>
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
                            handleCloseDescribeModal={handleCloseDescribeModal}
                            handleConfirm={handleConfirm}
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

                    {
                        guessResultVisible && 
                        <ModalGameResultGuess
                            guessResultVisible={guessResultVisible}
                            handleCloseGuessResultModal={handleCloseGuessResultModal}
                        />
                    }

                    {
                        resultVisible && 
                        <ModalGameResult
                            resultVisible={resultVisible}
                            handleCloseResultModal={handleCloseResultModal}
                        />
                    }
                </View>
            </View>
        </ImageBackground>
    );
}

export default GameScreen;