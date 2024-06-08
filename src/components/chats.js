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
    setShowTextInput,
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
    return ( 
        <View style={styles.chatBoxContainer}>
            <ScrollView style={styles.chatBox}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false} 
                contentContainerStyle={{
                justifyContent: "flex-start", 
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
        </View>
    );
}

export default ChatBox;

const styles = StyleSheet.create({
    chatBoxContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        maxHeight: "45%",
        marginBottom: 5
    },

    chatBox: {
        borderRadius: RFValue(20),
        width: "90%",
        backgroundColor: "#171D63",
    },
})