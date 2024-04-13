import { ScrollView, View } from "react-native";
import MessageLine from "./MessageLine";
import { useEffect, useState } from "react";


function ChatBox({idRoom}) {
    const [chats, setChats] = useState([])
    useEffect(()=>{
        const unsubscribe = onSnapshot(doc(database,"chats",idRoom), async (data)=>{
            if(data.exists()){
                setChats(data)
            }
        })

        return ()=> unsubscribe()
    },[])

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
                        <MessageLine key={index} displayName={displayName} message={message} role={id === 'system' && 'System' || id === host && 'Manager' || id === user.uid && 'You'}/>
                    ))
                }
            </ScrollView>
        </View>
    );
}

export default ChatBox;