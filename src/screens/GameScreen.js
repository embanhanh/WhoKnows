import React,{useState, useContext, useCallback, useEffect, useRef, createContext } from "react";
import { View, Text, TouchableOpacity, Alert, StyleSheet, ImageBackground, Image, ScrollView, TextInput, Keyboard, TouchableWithoutFeedback, KeyboardAvoidingView} from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome.js';
import Icon2 from 'react-native-vector-icons/MaterialIcons.js';
import Icon3 from 'react-native-vector-icons/Ionicons.js';
import Icon4 from 'react-native-vector-icons/MaterialCommunityIcons.js';

import { useFocusEffect, useNavigation } from "@react-navigation/native";
import {onSnapshot, doc,deleteDoc, updateDoc, increment, arrayUnion, setDoc, Timestamp, serverTimestamp, Firestore } from "firebase/firestore";


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
import ModalGameVoteResult from "../components/ModalGameVoteResult.js";

export const idContext = createContext("")

function GameScreen({route}) {
    const navigation = useNavigation();
    const {user} = useContext(userContext)
    const keywords = useContext(keywordContext)
    // State
    const preState = useRef({})
    const [member, setMember] = useState([])
    const [host, setHost] = useState('')
    const [roomInfo, setRoomInfo] = useState({})
    const [isGhost, setIsGhost] = useState(false)
    const [keyword, setKeyword] = useState({})
    const [time, setTime] = useState(0)
    const [isStartAnswer, setIsStartAnswer] = useState(false)
    const [isStartAnswer2, setIsStartAnswer2] = useState(false)
    const [memberAnswer, setMemberAnswer] = useState(-1)
    const [isAnswer, setIsAnswer] = useState(false)
    const [answer, setAnswer] = useState("...")
    const [isStartVote, setIsStartVote] = useState(false)
    const [finishedCounting, setFinishCounting] = useState(0)
    const [isVoted, setIsVoted] = useState(false)
    const [isEndRound2, setIsEndRound2] = useState(false)   
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
    //Game Modal
    const [roleVisible, roleModalVisible] = useState(false);
    const [describeVisible, describeModalVisible] = useState(false);
    const [roundVisible, roundModalVisible] = useState(false);
    const [voteVisible, voteModalVisible] = useState(false);
    const [voteResultVisible, voteResultModalVisible] = useState(false);
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

    const handleCloseVoteResultModal = () =>{
        voteResultModalVisible(false)
    }

    // Fire base
    // members
    useFocusEffect(useCallback(()=>{
        const unsubscribe = onSnapshot(doc(database,"rooms",route.params), async (data)=>{
            if(data.exists()){
                try {
                    setRoomInfo(data.data())
                    const newHost = data.data().roomMaster
                    if(newHost !== preState.current.host){
                        setHost(newHost)
                    }
                    const startVote = data.data().isStartVote
                    if(startVote !== preState.current.isStartVote){
                        setIsStartVote(startVote)
                    }
                    const startAnswer = data.data().isStartAnswer
                    if(startAnswer !== preState.current.isStartAnswer){
                        setIsStartAnswer(startAnswer)
                    }
                    const startAnswer2 = data.data().isStartAnswer2
                    if(startAnswer2!==preState.current.isStartAnswer2){
                        setIsStartAnswer2(startAnswer2)
                    }
                    const newMemberAnswer = data.data().memberAnswer
                    if(preState.current.memberAnswer !== newMemberAnswer){
                        setMemberAnswer(newMemberAnswer)
                    }
                    const newFinishedCounting = data.data().finishedCounting
                    if(preState.current.finishedCounting !== newFinishedCounting){
                        setFinishCounting(data.data().finishedCounting)
                    } 
                    preState.current = {
                        host: newHost,
                        isStartVote: startVote,
                        isStartAnswer: startAnswer,
                        isStartAnswer2: startAnswer2,
                        memberAnswer: newMemberAnswer,
                        finishedCounting: newFinishedCounting
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
            await updateDoc(docref, {isStart:true, roomMembers: [...roomInfo.roomMembers], keyword: keyword, memberAnswer: answer,
                chats: arrayUnion({displayName: "Hệ thống: ", message: "Bắt đầu vòng 1", id: "system"})
            })
            // await updateTime(15)
        }else{
            const index = memberId.indexOf(user?.uid)
            roomInfo.roomMembers[index].isReady = !isReady
            await updateDoc(docref, {roomMembers: [...roomInfo.roomMembers]})
        }
    }

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
    // handle Describe
    const handleDescribe = ()=>{
        describeModalVisible(true)
    }
    // Update time 
    const updateTime = async (time)=>{
        await setDoc(doc(database,'times',route.params),{
            startTime: serverTimestamp(),
            duration: time
        })
    }
    // handle logic sau khi hiện role
    const handleCloseRoleModal = async () =>{
        roleModalVisible(false)
        setKeyword(roomInfo.keyword)
        if(user.uid === host){
            const docRef = doc(database,'rooms',route.params)
            await updateDoc(docRef,{chats: arrayUnion({displayName: "Hệ thống gợi ý", message: roomInfo.keyword.suggest[0], id: "system"})})
        }
        setTime(10)
    }
    // handle confirm answer
    const handleConfirm = async (text)=>{
        if(text !== ""){
            setAnswer(text)
            await updateDoc(doc(database,'rooms',route.params), {finishedCounting: memberId.length })
        }
    }
    // Start Vote
    useFocusEffect(useCallback(()=>{
        if(isStartVote){
            console.log("Start Vote");
            setAnswer("...")
            setTime(5)
        }else{
            setIsVoted(false)
        }
    },[isStartVote]))
    // handle Vote
    const handleVote = async (index)=>{
        roomInfo.roomMembers[index].votes += 1
        await updateDoc(doc(database,'rooms',route.params),{
            roomMembers: roomInfo.roomMembers
        })
        setIsVoted(true)
    }
    // Start Answer
    useFocusEffect(useCallback(()=>{
        const docRef = doc(database,'rooms',route.params)
        if((isStartAnswer && answers.length !== memberId.length)||(isStartAnswer2 && answers.length !== memberId.length*2)){
            setTime(15)
            if(user.uid === memberId[memberAnswer]){
                describeModalVisible(true)
                roomMembers[memberAnswer].answering = true
                updateDoc(docRef, {roomMembers: [...roomMembers]})
                setIsAnswer(true)
            }
        }
        if(answers.length === memberId.length && isStartAnswer ){
            console.log("End Round 1");
            updateDoc(docRef, {
                isStartAnswer: false, isStartVote: true,
                chats: arrayUnion({displayName: "Hệ thống: ", message: "Kết thúc vòng 1, bắt đầu bình chọn", id: "system"})
            }) 
        }
        if(answers.length === memberId.length*2 && isStartAnswer2 ){
            console.log("End Round 2");
            updateDoc(docRef, {
                isStartAnswer2: false, isStartVote: true, 
                chats: arrayUnion({displayName: "Hệ thống: ", message: "Kết thúc vòng 2", id: "system"})
            })
            setIsEndRound2(true) 
        }
    },[isStartAnswer, memberAnswer, isStartAnswer2]))
    // async countdown
    useFocusEffect(useCallback(()=>{
        if(finishedCounting === memberId.length){
            setTime(0)
            const docRef = doc(database,'rooms',route.params)
            if(user.uid === memberId[memberAnswer] && (isStartAnswer || isStartAnswer2) && !isStartVote){
                setIsAnswer(false)
                describeModalVisible(false)
                roomInfo.roomMembers[memberAnswer].answer = answer
                updateDoc(docRef,{ 
                    memberAnswer: (memberAnswer + 1)% memberId.length, 
                    answers: [...answers,{displayName: user.displayName, answer: answer}],
                    roomMembers: [...roomInfo.roomMembers],
                    finishedCounting: 0
                })
            }
            if(user.uid === host && !isStartAnswer && !isStartVote && !isStartAnswer2){
                updateDoc(docRef, {isStartAnswer: true, finishedCounting: 0})
            }
            if(!isStartAnswer2 && isStartVote && !isEndRound2){
                roomInfo.roomMembers.forEach(member => {
                    member.answer = ""
                    member.answering = false
                })
                updateDoc(docRef, {
                    isStartAnswer2: true, 
                    isStartVote: false,
                    roomMembers: [...roomInfo.roomMembers],
                    finishedCounting: 0,
                    chats: arrayUnion(
                        {displayName: "Hệ thống: ", message: "Bắt đầu vòng 2, bắt đầu bình chọn", id: "system"},
                        {displayName: "Hệ thống gợi ý", message: roomInfo.keyword.suggest[1], id: "system"}
                    )
                }) 
            }
            if(isEndRound2){
                voteResultModalVisible(true)
            }
        }
    },[finishedCounting]))
    // handle after countDown
    const handleAfterCountDown = async ()=>{
        await updateDoc(doc(database,'rooms',route.params), {finishedCounting: increment(1) })
    }
    // ------------------Logic Game End -----------------
    // random
    const random = (length) =>{
        return Math.floor(Math.random() * length)
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
            deleteDoc(doc(database,"times", route.params))
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
            await updateDoc(docRef, { chats:[...chats,{displayName: user.displayName, message: inputMessage, id: user.uid}] })
            setShowTextInput(false)
        }
    }
    useFocusEffect(useCallback(() => {
        const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', handleHideTextInput);

        return () => {
            keyboardDidHideListener.remove();
        };
    }, []));

    // Test ================================================

    const testFunc = async ()=>{
        await updateTime(10)
       
    }

    return ( 
            <idContext.Provider value={route.params}>
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
                            
                            <CountDown time={time} isStart={isStart} handleAfterCountDown={handleAfterCountDown} idRoom={route.params}/> 
    
                            {isGhost && isStart &&<Image source={require('../assets/img/role-Ghost.png')} style={styles.characterGif}></Image>
                            || isStart && <Image source={require('../assets/img/role-Villager.png')} style={styles.characterGif}></Image>}
                        </View>
    
                    <View style={styles.playContainer}>
                        <View style={styles.joinedPlayer}>
                        {
                            roomMembers.map((member,index)=>
                                (<PlayerCard key={index} bubbleType={index%2==0?"left":"right"} avatarAlignment={index%2==0?"flex-start":"flex-end"}
                                    isManager={member.Id === host} isYou={member.Id === user.uid} displayName={member.displayName}
                                    answer={member.answer} answering={member.answering} isStartVote={isStartVote} isVoted={isVoted}
                                    handleVote={handleVote} index={index} containerWidth={"50%"}
                                ></PlayerCard>)
                            )
                        }
                        {
                            !isStart && emptyMembers.map((e,index)=> 
                                <PlayerCard key={index} avatarAlignment={(memberId.length + index)%2==0 ?"flex-start":"flex-end"} isEmpty={true} containerWidth={"50%"}></PlayerCard> 
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
                                        chats.map(({ displayName, message, id}, index) => (
                                            <MessageLine key={index} displayName={displayName} message={message} role={id === 'system' && 'System' || id === host && 'Manager' || id === user.uid && 'You'}/>
                                        ))
                                    }
                                </ScrollView>
                            </View>
                    </View>
    
                    <View style={styles.gameToolsContainer}>
                        {isStart ?
                            <TouchableOpacity style={isAnswer? [styles.toolsButton,{backgroundColor: "#ffa500"}]:styles.toolsButton} 
                                onPress={handleDescribe} disabled={!isAnswer}
                            >
                                <Icon name="pencil"  style={styles.toolsIcon}></Icon>
                            </TouchableOpacity> :
                            <TouchableOpacity style={user.uid === host && (countReady !== memberId.length /*|| countReady < 4*/)?styles.toolsButton:[styles.toolsButton, {backgroundColor: "#ffa500"}]}
                                disabled={user.uid === host && (countReady !== memberId.length /*|| countReady < 4*/) }
                                onPress={handleReadyCancelStart}
                            >
                                <Text style={styles.startText}>{user.uid === host && "Bắt đầu" || isReady && "Hủy" || "Sẵn sàng"}</Text>
                            </TouchableOpacity>
                        }
    
                        <TouchableOpacity style={styles.rulesButton}>
                            <Icon name="question" style={styles.rulesIcon} onPress={() => testFunc()}></Icon>
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
                                members={memberId.length}
                                history={answers}
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

                        {       
                            voteResultVisible && 
                            <ModalGameVoteResult
                                handleCloseVoteResultModal={handleCloseVoteResultModal}
                                roomMembers={roomInfo.roomMembers}
                            />
                        }
                    </View>
                </View>
            </ImageBackground>
            </idContext.Provider>
    );
}

export default GameScreen;