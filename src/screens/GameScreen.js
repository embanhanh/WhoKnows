import React,{useState, useContext, useCallback, createContext } from "react";
import { View, Text, TouchableOpacity, ImageBackground, Image, Keyboard,  BackHandler, Alert} from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome.js';
import Icon3 from 'react-native-vector-icons/Ionicons.js';
import Icon4 from 'react-native-vector-icons/MaterialCommunityIcons.js';
import { useFocusEffect, useNavigation } from "@react-navigation/native";

import styles from "../components/Styles.js";
import PlayerCard from "../components/playerCard.js";
import userContext from "../AuthContext/AuthProvider.js";
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
import { socket } from "../util/index.js";

export const idContext = createContext("")

function GameScreen({route}) {
    const navigation = useNavigation();
    const {user} = useContext(userContext)
    const keywords = useContext(keywordContext)
    // State
    const [roomInfo, setRoomInfo] = useState({})
    const [isGhost, setIsGhost] = useState(false)
    const [keyword, setKeyword] = useState({})
    const [isAnswer, setIsAnswer] = useState(false)
    const [isVoted, setIsVoted] = useState(false)
     //RoomInfo variables
    const memberId = roomInfo.roomMembers?.map((member)=>member.Id) || []
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

    useFocusEffect(useCallback(()=>{
        socket.on('player-joined',(roomInfo)=>{
            setRoomInfo(roomInfo)
        })
        
    },[]))
    
    // handle ready/cancel/start 
    const handleReadyCancelStart = async ()=>{
        if(user.uid === roomInfo.roomMaster){
            socket.emit('start-game',{keywords: keywords, idroom: route.params})
        }else{
            socket.emit('player-toggle-ready',{userId: user.uid,idroom: route.params})
        }
    }

    // Start Game
    useFocusEffect(useCallback(()=>{
        if(roomInfo.isStart){
           roomInfo.roomMembers.forEach(mb => {
               if(mb.Id === user.uid){
                    mb.isGhost ? setIsGhost(true) : setIsGhost(false)
               }
           })
           roleModalVisible(true)
        }
        return ()=>{
            console.log("...");
        }
    },[roomInfo.isStart]))
    // handle Describe
    const handleDescribe = ()=>{
        describeModalVisible(true)
    }
    // handle out room
    const handleHome = () => {
        if(!roomInfo.isStart){
            socket.emit('out-room',{idroom:route.params, userId: user.uid, userName: user.displayName})
            navigation.navigate('Home');
        }else{
            Alert.alert('Không thể rời phòng khi đã bắt đầu vòng chơi')
        }
        return true
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

    useFocusEffect(useCallback(()=>{
        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            handleHome,
        );

        return () => {
            backHandler.remove();
        };
    },[roomInfo.isStart]))

    const handleCloseRoleModal = async () =>{
        roleModalVisible(false)
        setKeyword(roomInfo.keyword)
    }
    const handleConfirm = (text)=>{
        if(text !== "" ){
            socket.emit('player-confirm-answer',{text, userId: user.uid, idroom: route.params})
            describeModalVisible(false)
            setIsAnswer(false)
        }
    }
    useFocusEffect(useCallback(()=>{
        if(roomInfo.isStartAnswer){
            if(user.uid === roomInfo.roomMembers[roomInfo.memberAnswer].Id){
                describeModalVisible(true)
                setIsAnswer(true)
            }else{
                describeModalVisible(false)
                setIsAnswer(false)
            }
        }
    },[roomInfo.isStartAnswer, roomInfo.memberAnswer]))
    useFocusEffect(useCallback(()=>{
        if(roomInfo.isStartVote){
            describeModalVisible(false)
            setIsAnswer(false)
        }else{
            setIsVoted(false)
        }
    },[roomInfo.isStartVote]))
    const handleVote = (userId)=>{
        setIsVoted(true)
        socket.emit('player-vote',{userId, idroom: route.params})
    }
    useFocusEffect(useCallback(()=>{
        if(roomInfo.isEndRound2){
            voteResultModalVisible(true)
        }
    },[roomInfo.isEndRound2]))
    
    useFocusEffect(useCallback(()=>{
        if(roomInfo.isShowResult){
            resultModalVisible(true)
            describeModalVisible(false)
        }
    },[roomInfo.isShowResult]))
    useFocusEffect(useCallback(()=>{
        if(roomInfo.isGuessKeyword){
            if(isGhost){
                setIsAnswer(true)
                describeModalVisible(true)
            }
        }
    },[roomInfo.isGuessKeyword]))

    return ( 
            <idContext.Provider value={route.params}>
                <ImageBackground source={require('../assets/img/Theme2.jpg')} style={styles.backgroundImage} >
                    <View style={styles.container}>
                        <View style={styles.roomInfo}>
                            <Image source={require('../assets/img/RoomInfo.png')} style={styles.roomImage}></Image>
                            <Text style={styles.textRoomNumber}>ID phòng: {route.params}</Text>
                            <Text style={styles.textWord}>{roomInfo.isStart && !isGhost && keyword.key}</Text>
                            <TouchableOpacity style={styles.homeButton} onPress={handleHome}>
                                <Icon name="sign-out"  style={styles.homeIcon} ></Icon>
                            </TouchableOpacity>

                            <CountDown /> 

                            {isGhost && roomInfo.isStart &&<Image source={require('../assets/img/role-Ghost.png')} style={styles.characterGif}></Image>
                            || roomInfo.isStart && <Image source={require('../assets/img/role-Villager.png')} style={styles.characterGif}></Image>}
                        </View>
    
                    <View style={styles.playContainer}> 
                        <View style={styles.joinedPlayer}>
                        {
                            roomInfo.roomMembers?.map((member,index)=>
                                (<PlayerCard key={index} bubbleType={index%2==0?"left":"right"} avatarAlignment={index%2==0?"flex-start":"flex-end"}
                                    isManager={member.Id === roomInfo.roomMaster} isYou={member.Id === user.uid} displayName={member.displayName}  isVoted={isVoted}
                                    answer={member.answer} answering={((roomInfo.isStartVote || roomInfo.isStartAnswer)&&member.Id === roomInfo.roomMembers[roomInfo.memberAnswer]?.Id)||(roomInfo.isGuessKeyword && member.isGhost)} 
                                    handleVote={handleVote} userId={member.Id} containerWidth={"50%"} isStartVote={roomInfo.isStartVote} isGhost={isGhost && member.isGhost} isStart={roomInfo.isStart}
                                    isReady={member.isReady} playerNumber={index + 1} avatar={member.photoURL}
                                ></PlayerCard>)
                            )
                        }
                        {
                            !roomInfo.isStart && emptyMembers.map((e,index)=> 
                                <PlayerCard key={index} avatarAlignment={(memberId.length + index)%2==0 ?"flex-start":"flex-end"} isEmpty={true} containerWidth={"50%"}></PlayerCard> 
                            )
                        } 
                        </View>
                        <ChatBox idRoom={route.params} host={roomInfo.roomMaster} showTextInput={showTextInput} setShowTextInput={setShowTextInput}/>
                    </View>
    
                    <View style={styles.gameToolsContainer}>
                        {roomInfo.isStart ?
                            <TouchableOpacity style={isAnswer? [styles.toolsButton,{backgroundColor: "#ffa500"}]:styles.toolsButton} 
                                onPress={handleDescribe} disabled={!isAnswer}
                            >
                                <Icon name="pencil"  style={styles.toolsIcon}></Icon>
                            </TouchableOpacity> :
                            <TouchableOpacity style={user.uid === roomInfo.roomMaster && (countReady !== memberId.length /*|| countReady < 4*/)?styles.toolsButton:[styles.toolsButton, {backgroundColor: "#ffa500"}]}
                                disabled={user.uid === roomInfo.roomMaster && (countReady !== memberId.length /*|| countReady < 4*/) }
                                onPress={handleReadyCancelStart}
                            >
                                <Text style={styles.startText}>{user.uid === roomInfo.roomMaster && "Bắt đầu" || isReady && "Hủy" || "Sẵn sàng"}</Text>
                            </TouchableOpacity>
                        }
    
                        <TouchableOpacity style={styles.rulesButton}>
                            <Icon name="question" style={styles.rulesIcon} ></Icon>
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
                                members={roomInfo.roomMembers.length}
                                history={roomInfo.answers}
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
                                winer={roomInfo.winer}
                                keyword={keyword.key}
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