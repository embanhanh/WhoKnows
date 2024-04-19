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
import ChatBox from "../components/chats.js";

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
    // const [isStartAnswer2, setIsStartAnswer2] = useState(false)
    const [memberAnswer, setMemberAnswer] = useState(-1)
    const [isAnswer, setIsAnswer] = useState(false)
    // const [answer, setAnswer] = useState("...")
    const [isStartVote, setIsStartVote] = useState(false)
    const [finishedCounting, setFinishCounting] = useState(false)
    const [isVoted, setIsVoted] = useState(false)
    const [isEndRound2, setIsEndRound2] = useState(false)
    const [winer, setWiner] = useState() 
    const [isGuessKeyword, setIsGuessKeyword] = useState(false)  
    const [isStart, setIsStart] = useState(false)
    const [round,setRound] = useState(0)
     //RoomInfo variables
    const answers = roomInfo.answers || []
    const roomMembers = roomInfo.roomMembers || []
    const memberId = roomInfo.roomMembers?.map((member)=>member.Id) || []
    // const chats = roomInfo.chats || []
    const emptyMembers = new Array((roomInfo?.maxPlayers-memberId.length) || 0)
    emptyMembers.fill(1)
    const isReady = roomInfo.roomMembers?.find((member)=>member.Id === user.uid)?.isReady || false
    const countReady = roomInfo.roomMembers?.reduce((acc, member)=>{
        if(member.isReady)
            return acc+1;
        else
            return acc
    },0)
    //Game Modal
    const [roleVisible, roleModalVisible] = useState(false);
    const [describeVisible, describeModalVisible] = useState(false);
    const [roundVisible, roundModalVisible] = useState(false);
    const [voteVisible, voteModalVisible] = useState(false);
    const [voteResultVisible, voteResultModalVisible] = useState(false);
    const [guessVisible, guessModalVisible] = useState(false);
    const [guessResultVisible, guessResultModalVisible] = useState(false);
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
    // setState
    useFocusEffect(useCallback(()=>{
        const unsubscribe = onSnapshot(doc(database,"rooms",route.params), async (data)=>{
            if(data.exists()){
                try {
                    setRoomInfo(data.data())
                    const newFinishedCounting = data.data().finishedCounting
                    if(preState.current.finishedCounting !== newFinishedCounting){
                        setFinishCounting(newFinishedCounting)
                        preState.current.finishedCounting = newFinishedCounting
                    } 
                    const keyWord = data.data().keyword
                    if(keyWord !== preState.current.keyword){
                        setKeyword(keyWord)
                        preState.current.keyword = keyWord
                    }
                    const isStartGame = data.data().isStart
                    if(preState.current.isStart !== isStartGame){
                        setIsStart(isStartGame)
                        preState.current.isStart = isStartGame
                    }
                    const newHost = data.data().roomMaster
                    if(newHost !== preState.current.host){
                        setHost(newHost)
                        preState.current.host = newHost
                    }
                    const startVote = data.data().isStartVote
                    if(startVote !== preState.current.isStartVote){
                        setIsStartVote(startVote)
                        preState.current.isStartVote = startVote
                    }
                    const roundGame = data.data().round
                    if(roundGame !== preState.current.round){
                        setRound(roundGame)
                        preState.current.round = roundGame
                    }
                    const startAnswer = data.data().isStartAnswer
                    if(startAnswer !== preState.current.isStartAnswer){
                        setIsStartAnswer(startAnswer)
                        preState.current.isStartAnswer = startAnswer
                    }
                    const newMemberAnswer = data.data().memberAnswer
                    if(preState.current.memberAnswer !== newMemberAnswer){
                        setMemberAnswer(newMemberAnswer)
                        preState.current.memberAnswer = newMemberAnswer
                    }
                    const endRound2 = data.data().isEndRound2
                    if(preState.current.isEndRound2 !== endRound2){
                        setIsEndRound2(endRound2)
                        preState.current.isEndRound2 = endRound2
                    } 
                    const guessKeyword = data.data().isGuessKeyword
                    if(preState.current.isGuessKeyword !== guessKeyword){
                        setIsGuessKeyword(guessKeyword)
                        preState.current.isGuessKeyword = guessKeyword
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
            await updateDoc(docref, {
                isStart:true, roomMembers: [...roomInfo.roomMembers], keyword: keyword,
                memberAnswer: answer, finishedCounting: false,
            })
            await updateDoc(doc(database,"times",route.params),{
                startTime: Date.now(),
                duration: 15
            })
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
    // handle logic sau khi hiện role
    // const handleCloseRoleModal = async () =>{
    //     roleModalVisible(false)
    //     setKeyword(roomInfo.keyword)
    //     if(user.uid === host){
    //         const docRef = doc(database,'rooms',route.params)
    //         await updateDoc(docRef,{chats: arrayUnion({displayName: "Hệ thống gợi ý", message: roomInfo.keyword.suggest[0], id: "system"})})
    //     }
    //     setTime(10)
    // }
   
    // handle confirm answer
    // const handleConfirm = async (text)=>{
    //     if(text !== "" && !isGuessKeyword){
    //         setAnswer(text)
    //         await updateDoc(doc(database,'rooms',route.params), {finishedCounting: memberId.length })
    //     }
    //     else if(isGuessKeyword && isGhost){
    //         setIsAnswer(false)
    //         describeModalVisible(false)
    //         roomInfo.roomMembers.forEach(mb=>{
    //             if(mb.Id === user.uid){
    //                 mb.answer = text
    //             }
    //         })
    //         await updateDoc(doc(database,'rooms',route.params), {roomMembers: [...roomInfo.roomMembers] , guessKeyword: arrayUnion(handleString(text))})
    //     }
    // }
    // Start Vote
    // useFocusEffect(useCallback(()=>{
    //     if(isStartVote){
    //         console.log("Start Vote");
    //         setAnswer("...")
    //         setTime(10)
    //     }else{
    //         setIsVoted(false)
    //     }
    // },[isStartVote]))
    // // handle Vote
    // const handleVote = async (index)=>{
    //     roomInfo.roomMembers[index].votes += 1
    //     await updateDoc(doc(database,'rooms',route.params),{
    //         roomMembers: roomInfo.roomMembers
    //     })
    //     setIsVoted(true)
    // }
    // Start Answer
    // useFocusEffect(useCallback(()=>{
    //     const docRef = doc(database,'rooms',route.params)
    //     if((isStartAnswer && answers.length !== memberId.length)||(isStartAnswer2 && answers.length !== memberId.length*2)){
    //         setTime(15)
    //         if(user.uid === memberId[memberAnswer]){
    //             describeModalVisible(true)
    //             roomInfo.roomMembers[memberAnswer].answering = true
    //             updateDoc(docRef, {roomMembers: [...roomInfo.roomMembers]})
    //             setIsAnswer(true)
    //         }
    //     }
    //     if(answers.length === memberId.length && isStartAnswer ){
    //         console.log("End Round 1");
    //         updateDoc(docRef, {
    //             isStartAnswer: false, isStartVote: true,
    //             chats: arrayUnion({displayName: "Hệ thống: ", message: "Kết thúc vòng 1, bắt đầu bình chọn", id: "system"})
    //         }) 
    //     }
    //     if(answers.length === memberId.length*2 && isStartAnswer2 ){
    //         console.log("End Round 2");
    //         updateDoc(docRef, {
    //             isStartAnswer2: false, isStartVote: true, isEndRound2: true,
    //             chats: arrayUnion({displayName: "Hệ thống: ", message: "Kết thúc vòng 2, bắt đầu bình chọn", id: "system"})
    //         })
    //     }
    // },[isStartAnswer, memberAnswer, isStartAnswer2]))
    // async countdown
    // useFocusEffect(useCallback(()=>{
    //     if(finishedCounting === memberId.length && isStart){
    //         setTime(0)
    //         const docRef = doc(database,'rooms',route.params)
    //         if(user.uid === memberId[memberAnswer] && (isStartAnswer || isStartAnswer2) && !isStartVote){
    //             setIsAnswer(false)
    //             describeModalVisible(false)
    //             roomInfo.roomMembers[memberAnswer].answer = answer
    //             updateDoc(docRef,{ 
    //                 memberAnswer: (memberAnswer + 1)% memberId.length, 
    //                 answers: [...answers,{displayName: user.displayName, answer: answer}],
    //                 roomMembers: [...roomInfo.roomMembers],
    //                 finishedCounting: 0
    //             })
    //         }
    //         if(!isStartAnswer && !isStartVote && !isStartAnswer2 && !isEndRound2){
    //             updateDoc(docRef, {isStartAnswer: true, finishedCounting: 0})
    //         }
    //         if(!isStartAnswer2 && isStartVote && !isEndRound2){
    //             roomInfo.roomMembers.forEach(member => {
    //                 member.answer = ""
    //                 member.answering = false
    //             })
    //             updateDoc(docRef, {
    //                 isStartAnswer2: true, 
    //                 isStartVote: false,
    //                 roomMembers: [...roomInfo.roomMembers],
    //                 finishedCounting: 0,
    //                 chats: arrayUnion(
    //                     {displayName: "Hệ thống: ", message: "Bắt đầu vòng 2", id: "system"},
    //                     {displayName: "Hệ thống gợi ý", message: roomInfo.keyword.suggest[1], id: "system"}
    //                 )
    //             }) 
    //         }
    //         if(isEndRound2 && !isGuessKeyword){
    //             roomInfo.roomMembers.forEach(member => {
    //                 member.answer = ""
    //                 member.answering = false
    //             })
    //             updateDoc(docRef,{isStartVote: false,roomMembers: [...roomInfo.roomMembers],finishedCounting: 0,})
    //             voteResultModalVisible(true)
    //         }
    //         if(isGuessKeyword){
    //             let ghostWin = false
    //             roomInfo.guessKeyword.forEach((text)=>{
    //                 if(text === handleString(keyword.key)){
    //                     ghostWin = true
    //                 }
    //             })
    //             ghostWin ? setWiner('Evil Ghost') : setWiner('Village')
    //             resultModalVisible(true)
    //         }
    //     }
    // },[finishedCounting]))
    // handle string

    // handle after countDown
    // const handleAfterCountDown = async ()=>{
    //     await updateDoc(doc(database,'rooms',route.params), {finishedCounting: increment(1) })
    // }
    // const handleAfterShowVoteResult = async (topVotes)=>{
    //     setAnswer('...')
    //     let d = 0
    //     let ghost = 1
    //     let votes = 2
    //     if(topVotes.length > 5){
    //         ghost = 2
    //         votes = 3
    //     }
    //     for(let i = 0; i < votes; ++i){
    //         if(topVotes[i].isGhost){
    //             ++d;
    //         }
    //     }
    //     if(d===ghost){
    //         roomInfo.roomMembers.forEach(member => {
    //             if(member.isGhost){
    //                 member.answering = true
    //             }
    //         })
    //         setTime(15)
    //         if(isGhost){
    //             setIsAnswer(true)
    //             describeModalVisible(true)
    //         }
    //         await updateDoc(doc(database,'rooms',route.params), {
    //             isGuessKeyword: true,
    //             chats: arrayUnion({displayName: "Hệ thống: ", message: "Mời Evil Ghost đoán từ khóa", id: "system"}),
    //             roomMembers: [...roomInfo.roomMembers]
    //         })
    //     }else{
    //         setWiner('Evil Ghost')
    //         resultModalVisible(true)
    //     }
    // }
    // const handleAfterShowResult = async ()=>{
    //     roomInfo.roomMembers.forEach((mb)=>{
    //         if(mb.Id !== host){
    //             mb.isReady = false
    //         }
    //         mb.answering = false
    //         mb.answer = ''
    //         mb.isGhost = false
    //     })
    //     await updateDoc(doc(database, "rooms",route.params),{
    //         isStart: false,
    //         isGuessKeyword: false,
    //         roomMembers: [...roomInfo.roomMembers],
    //         finishedCounting: 0,
    //         answers: [], 
    //         guessKeyword: [],
    //         isEndRound2: false,
    //         chats: arrayUnion({displayName: "Hệ thống: ", message: "Kết thúc vòng chơi", id: "system"})
    //     })
    // }
    // ------------------Logic Game End -----------------
    const handleString = (string)=>{
        return string.trim().toLowerCase()
    }
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
        if(roomInfo.roomMembers.length !== 0){
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
            await deleteDoc(docRef)
            await deleteDoc(doc(database,"times", route.params))
            await deleteDoc(doc(database,"chats", route.params))
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

    
    useFocusEffect(useCallback(() => {
        const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', handleHideTextInput);

        return () => {
            keyboardDidHideListener.remove();
        };
    }, []));

    // Test ================================================

    const testFunc = async ()=>{
        console.log(new Date().getTime()/1000);
    }

    const handleCloseRoleModal = async () =>{
        roleModalVisible(false)
        setKeyword(roomInfo.keyword)
    }
    const handleConfirm = async (text)=>{
        if(text !== "" && !isGuessKeyword){
            answers.push({displayName: user.displayName, answer: text})
            roomInfo.roomMembers[memberAnswer].answer = text
            const newMemberAnswer = (memberAnswer + 1)% memberId.length
            if(answers.length === memberId.length || answers.length === memberId.length*2){
                await updateDoc(doc(database,'rooms',route.params),{
                    memberAnswer: newMemberAnswer, 
                    answers: [...answers],
                    roomMembers: [...roomInfo.roomMembers],
                    isStartVote: true,
                    isStartAnswer: false,
                    finishedCounting: true
                })
            }else{
                await updateDoc(doc(database,'rooms',route.params),{
                    memberAnswer: newMemberAnswer, 
                    answers: [...answers],
                    roomMembers: [...roomInfo.roomMembers],
                    finishedCounting: true
                })
            }
            await updateDoc(doc(database,"times",route.params),{
                duration: 15,
                startTime: Date.now()
            })
        }
        else if(isGuessKeyword && isGhost){
            setIsAnswer(false)
            describeModalVisible(false)
            roomInfo.roomMembers.forEach(mb=>{
                if(mb.Id === user.uid){
                    mb.answer = text
                }
            })
            await updateDoc(doc(database,'rooms',route.params), {roomMembers: [...roomInfo.roomMembers] , guessKeyword: arrayUnion(handleString(text))})
        }
    }
    const handleAfterCountDown = async ()=>{
        const docRef = doc(database,"rooms", route.params)
        if(round === 0 && !finishedCounting){
            await updateDoc(docRef,{
                round: 1,
                isStartAnswer: true, 
                finishedCounting: true
            })
            await updateDoc(doc(database,"times",route.params),{
                duration: 15,
                startTime: Date.now()
            })
        }
        if(isStartAnswer && !finishedCounting){
            roomInfo.roomMembers[memberAnswer].answer = "..."
            answers.push({displayName: roomInfo.roomMembers[memberAnswer].displayName, answer: "..."})
            const newMemberAnswer = (memberAnswer + 1)% memberId.length
            if(answers.length === memberId.length || answers.length === memberId.length*2){
                await updateDoc(docRef,{ 
                    memberAnswer: newMemberAnswer, 
                    answers: [...answers],
                    roomMembers: [...roomInfo.roomMembers],
                    isStartVote: true,
                    isStartAnswer: false,
                    finishedCounting: true
                })
            }else{
                await updateDoc(docRef,{ 
                    memberAnswer: newMemberAnswer, 
                    answers: [...answers],
                    roomMembers: [...roomInfo.roomMembers],
                    finishedCounting: true
                })
            }
            await updateDoc(doc(database,"times",route.params),{
                duration: 15,
                startTime: Date.now()
            })
        }
        if(isStartVote && round === 1 && !finishedCounting){
            roomInfo.roomMembers.forEach(member => {
                member.answer = ""
            })
            await updateDoc(docRef,{ 
                isStartAnswer: true,
                isStartVote: false,
                round: 2,
                roomMembers: [...roomInfo.roomMembers],
                finishedCounting: true
            })
            await updateDoc(doc(database,"times",route.params),{
                duration: 15,
                startTime: Date.now()
            })
        }
        if(isStartVote && round === 2 && !finishedCounting){
            roomInfo.roomMembers.forEach(member => {
                member.answer = ""
            })
            await updateDoc(docRef,{ 
                isStartVote: false,
                isEndRound2: true,
                roomMembers: [...roomInfo.roomMembers],
                finishedCounting: true
            })
        }
        if(isGuessKeyword){
            if(isGhost){
                describeModalVisible(false)
                setIsAnswer(false)
            }
            let ghostWin = false
            roomInfo.guessKeyword.forEach((text)=>{
                if(text === handleString(keyword.key)){
                    ghostWin = true
                }
            })
            ghostWin ? setWiner('Evil Ghost') : setWiner('Village')
            await updateDoc(docRef,{ 
                finishedCounting: false
            })
            resultModalVisible(true)
        }
    }
    useFocusEffect(useCallback(()=>{
        if(isStartAnswer){
            if(user.uid === memberId[memberAnswer]){
                describeModalVisible(true)
                setIsAnswer(true)
            }else{
                describeModalVisible(false)
                setIsAnswer(false)
            }
            const update = async ()=>{
                await updateDoc(doc(database, "rooms", route.params),{
                    finishedCounting: false
                })
            }
            update()
        }
    },[isStartAnswer, memberAnswer]))
    useFocusEffect(useCallback(()=>{
        if(isStartVote){
            describeModalVisible(false)
            setIsAnswer(false)
            const update = async()=>{
                await updateDoc(doc(database, "rooms", route.params),{
                    finishedCounting: false
                })
            }
            update()
        }else{
            setIsVoted(false)
        }
    },[isStartVote]))
    const handleVote = async (index)=>{
        roomInfo.roomMembers[index].votes += 1
        await updateDoc(doc(database,'rooms',route.params),{
            roomMembers: roomInfo.roomMembers
        })
        setIsVoted(true)
    }
    useFocusEffect(useCallback(()=>{
        if(isEndRound2){
            const update = async ()=>{
                await updateDoc(doc(database, "rooms", route.params),{
                    finishedCounting: false
                })
                voteResultModalVisible(true)
            }
            update()
        }
    },[isEndRound2]))
    const handleAfterShowVoteResult = async (topVotes)=>{
        let d = 0
        let ghost = 1
        let votes = 2
        if(topVotes.length > 5){
            ghost = 2
            votes = 3
        }
        for(let i = 0; i < votes; ++i){
            if(topVotes[i].isGhost){
                ++d;
            }
        }
        if(d===ghost ){
            if(!finishedCounting){ 
                await updateDoc(doc(database, "rooms", route.params),{
                    isGuessKeyword: true,
                    finishedCounting: true
                })
                await updateDoc(doc(database,"times",route.params),{
                    duration: 15,
                    startTime: Date.now()
                })
            }
        }else{
            setWiner('Evil Ghost')
            resultModalVisible(true)
        }
    }
    useFocusEffect(useCallback(()=>{
        if(isGuessKeyword){
            const update = async ()=>{
                await updateDoc(doc(database, "rooms", route.params),{
                    finishedCounting: false
                })
                if(isGhost){
                    setIsAnswer(true)
                    describeModalVisible(true)
                }
            }
            update()
        }
    },[isGuessKeyword]))
    const handleAfterShowResult = async ()=>{
        if(!finishedCounting){
            roomInfo.roomMembers.forEach((mb)=>{
                if(mb.Id !== host){
                    mb.isReady = false
                }
                mb.answer = ''
                mb.isGhost = false
                mb.votes = 0
            })
            await updateDoc(doc(database, "rooms",route.params),{
                isStart: false,
                isGuessKeyword: false,
                roomMembers: [...roomInfo.roomMembers],
                finishedCounting: true,
                answers: [], 
                guessKeyword: [],
                isEndRound2: false,
                round: 0
            })
        }
        if(isGhost){
            setIsGhost(false)
        }
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
                            
                            <CountDown time={time} isStart={isStart} handleAfterCountDown={handleAfterCountDown} idRoom={route.params}/> 
    
                            {isGhost && isStart &&<Image source={require('../assets/img/role-Ghost.png')} style={styles.characterGif}></Image>
                            || isStart && <Image source={require('../assets/img/role-Villager.png')} style={styles.characterGif}></Image>}
                        </View>
    
                    <View style={styles.playContainer}> 
                        <View style={styles.joinedPlayer}>
                        {
                            roomMembers.map((member,index)=>
                                (<PlayerCard key={index} bubbleType={index%2==0?"left":"right"} avatarAlignment={index%2==0?"flex-start":"flex-end"}
                                    isManager={member.Id === host} isYou={member.Id === user.uid} displayName={member.displayName}  isVoted={isVoted}
                                    answer={member.answer} answering={((isStartVote || isStartAnswer)&&member.Id === memberId[memberAnswer])||(isGuessKeyword && member.isGhost)} 
                                    handleVote={handleVote} index={index} containerWidth={"50%"} isStartVote={isStartVote} isGhost={isGhost && member.isGhost} isStart={isStart}
                                    isReady={member.isReady}
                                ></PlayerCard>)
                            )
                        }
                        {
                            !isStart && emptyMembers.map((e,index)=> 
                                <PlayerCard key={index} avatarAlignment={(memberId.length + index)%2==0 ?"flex-start":"flex-end"} isEmpty={true} containerWidth={"50%"}></PlayerCard> 
                            )
                        } 
                        </View>
                        <ChatBox idRoom={route.params} isStartAnswer={isStartAnswer} isStartVote={isStartVote} host={host} 
                            showTextInput={showTextInput} setShowTextInput={setShowTextInput}
                            isGuessAnswer={isGuessKeyword} isStart={isStart} round={round} suggest={keyword.suggest} userId={user.uid} displayName={user.displayName}
                        />
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
                                winer={winer}
                                keyword={keyword.key}
                                handleCloseResultModal={handleCloseResultModal}
                                handleAfterShowResult={handleAfterShowResult}
                            />
                        }

                        {       
                            voteResultVisible && 
                            <ModalGameVoteResult
                                handleCloseVoteResultModal={handleCloseVoteResultModal}
                                roomMembers={roomInfo.roomMembers}
                                handleAfterShowVoteResult={handleAfterShowVoteResult}
                            />
                        }
                    </View>
                </View>
            </ImageBackground>
        </idContext.Provider>
    );
}

export default GameScreen;