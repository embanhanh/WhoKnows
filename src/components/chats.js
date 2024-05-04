import { ScrollView, StyleSheet, View } from "react-native";
import MessageLine from "./MessageLine";
import { useContext, useEffect, useState } from "react";
import InputMessage from "./InputMessage";
import { RFValue } from 'react-native-responsive-fontsize';
import { socket } from "../util";
import userContext from "../AuthContext/AuthProvider";

function ChatBox({
    idRoom,
    host,
    showTextInput,
    setShowTextInput
}) {

    const {user} = useContext(userContext)
    const [chats, setChats] = useState([])
    useEffect(()=>{
        socket.on('chats',(chats)=>{
            setChats(chats)
        })
        return ()=>{
            socket.off('chats')
        }
    },[])
    const handleSendMessage = async (inputMessage) => {
        console.log(inputMessage);
        if(inputMessage !== ''){
            setShowTextInput(false)
            socket.emit('send-msg',{idroom: idRoom, userName: user.displayName, message: inputMessage, userId: user.uid})
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
                    
                    chats?.map(({ displayName, message, id}, index) => (
                        <MessageLine key={index} displayName={displayName} message={message} role={id === 'system' && 'System' || id === host && 'Manager' || id === user.uid && 'You'}/>
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