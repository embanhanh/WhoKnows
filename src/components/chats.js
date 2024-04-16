import { ScrollView, StyleSheet, View } from "react-native";
import MessageLine from "./MessageLine";
import { useEffect, useRef, useState } from "react";
import { onSnapshot, doc, updateDoc } from "firebase/firestore";
import InputMessage from "./InputMessage";
import { RFValue } from 'react-native-responsive-fontsize';
import { database } from "../../firebaseconfig";

function ChatBox({
    idRoom,
    isStart,
    isStartAnswer,
    isStartVote,
    isGuessAnswer,
    round,
    suggest,
    host,
    userId,
    showTextInput,
    displayName,
    setShowTextInput
}) {
    const [chats, setChats] = useState([])
    const preState = useRef([])
    useEffect(()=>{
        const unsubscribe = onSnapshot(doc(database,"chats",idRoom), async (data)=>{
            if(data.exists()){
                if(data.data().chats.length !== 0){
                    setChats(pre => [...pre,data.data().chats.pop()])
                }
            }
        })

        return ()=> unsubscribe()
    },[])
    useEffect(()=>{
        if(isStart){
            setChats(pre=> [...pre,
                {displayName: "Hệ thống: ", message: "Bắt đầu vòng 1", id: "system"},
                {displayName: "Hệ thống gợi ý: ", message: suggest[0], id: "system"},
            ])
        }
    },[isStart])
    useEffect(()=>{
        if(isStartAnswer && round === 2){
            setChats(pre=> [...pre,
                {displayName: "Hệ thống: ", message: "Bắt đầu vòng 2", id: "system"},
                {displayName: "Hệ thống gợi ý: ", message: suggest[1], id: "system"},
            ])
        }
    },[isStartAnswer])  
    useEffect(()=>{
        if(isStartVote){
            setChats(pre=> [...pre,
                {displayName: "Hệ thống: ", message: `Kết thúc vòng ${round}, bắt đầu bình chọn`, id: "system"},
            ])
        }
    },[isStartVote])  
    useEffect(()=>{
        if(isGuessAnswer){
            setChats(pre=> [...pre,
                {displayName: "Hệ thống: ", message: "Mời Evil Ghost đoán từ khóa", id: "system"},
            ])
        }
    },[isGuessAnswer]) 
    // handle send message
    const handleSendMessage = async (inputMessage) => {
        console.log(inputMessage);
        if(inputMessage !== ''){
            setShowTextInput(false)
            const docRef = doc(database,"chats", idRoom)
            await updateDoc(docRef, { chats:[...preState.current,{displayName: displayName, message: inputMessage, id: userId}] })
        }
    }
    return ( 
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
                        <MessageLine key={index} displayName={displayName} message={message} role={id === 'system' && 'System' || id === host && 'Manager' || id === userId && 'You'}/>
                    ))
                }
            </ScrollView>
            {showTextInput && (
                <InputMessage handleSendMessage={handleSendMessage}/>
            )}
        </View>
    );
}

export default ChatBox;

const styles = StyleSheet.create({
    chatBoxContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    chatBox: {
        borderRadius: RFValue(20),
        width: "90%",
        marginBottom: "7%",
        backgroundColor: "#171D63",
    },
})