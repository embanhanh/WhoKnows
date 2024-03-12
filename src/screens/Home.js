import { signOut } from "firebase/auth";
import React, { useContext, useState } from "react";
import { View, Text, TouchableOpacity, Alert, StyleSheet, TextInput } from "react-native";
import { auth, database } from "../../firebaseconfig";
import userContext from "../AuthContext/AuthProvider";

function Home() {
    
    return ( 
        <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
            <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
                <Text>Home</Text>
                <TouchableOpacity   hableOpacity onPress={() => signOut(auth).then(()=>console.log("Log out success")).catch((e)=>Alert.alert("eror",e.Message))}>
                    <Text>Log out
                    </Text>
                </TouchableOpacity>
            </View>
            <View  style={styles.chatbox}>
                <View style={styles.chatspace}>

                </View>
                <View style={styles.inputchat}>
                    <TextInput style={styles.message}></TextInput>
                    <TouchableOpacity style={styles.btnSend}>
                        <Text>gửi</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

export default Home;

const styles = StyleSheet.create({
    chatbox: {
        alignSelf:"flex-end",
        flex: 1,
        width: "100%",
        backgroundColor: "#333"
    },
    chatspace:{
        height: "90%",
        backgroundColor: "#fff"
    },
    inputchat:{
        flexDirection: "row"
    },
    message:{
        width: "80%",
        backgroundColor: "#fff",
        borderWidth: 1,
        borderColor: "#000",
        fontSize: 15
    },
    btnSend:{
        backgroundColor: "blue",
        alignItems:"center",
        justifyContent:"center",
        borderWidth: 1,
        borderColor: "#000",
        width: 50
    }
})