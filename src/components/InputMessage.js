
import React,{useState } from "react";
import { View, TouchableOpacity, StyleSheet, TextInput} from "react-native";
import Icon3 from 'react-native-vector-icons/Ionicons.js';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';


function InputMessage({
    handleSendMessage
}) {
    const [inputMessage, setInputMessage] = useState('');
    return ( 
        <View style={styles.inputContainer}>
            <TextInput
                autoFocus
                // ref={textInputRef}
                style={styles.textInput}
                placeholder="Nhập tin nhắn..."
                onChangeText={(text) => setInputMessage(text)}
                value={inputMessage}
                onSubmitEditing={()=>handleSendMessage(inputMessage)}
            />
            <TouchableOpacity style={styles.sendButton} onPress={()=>handleSendMessage(inputMessage)}>
                <Icon3 name="send" style={styles.sendIcon}></Icon3>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    inputContainer: {
        position: "absolute",
        bottom: "-20%",
        zIndex: 100,
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: "4%",
        marginBottom: "3%",
        width: "95%",
        height: "25%",
        backgroundColor: "#00FFDF",
        borderRadius: RFValue(15),
        justifyContent: "space-between",
    },
    textInput:{
        fontSize: RFValue(16),
        maxWidth: "85%",
    },
    sendButton: {
        marginRight: "4%",
    },
    sendIcon: {
        fontSize: RFValue(20),
        color: "black",
    },
})

export default InputMessage;