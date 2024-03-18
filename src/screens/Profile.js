import React from "react";
import { View, Text, TouchableOpacity, SafeAreaView } from "react-native";
import styles from "../components/Styles.js";

import { signOut } from "firebase/auth";
import { auth, database } from "../../firebaseconfig";
import userContext from "../AuthContext/AuthProvider";

function Profile() {
    
    return ( 
        <View style={styles.containers } >
            <SafeAreaView style={styles.login}>
                <View style={styles.headerProfile}>
                    <Text style={styles.textHeader}>Profile</Text>
                </View>

                <View style={styles.avatar}>
                    <Text></Text>
                </View>

                <TouchableOpacity onPress={() => signOut(auth).then(()=>console.log("Log out success")).catch((e)=>Alert.alert("eror",e.Message))}>
                    <Text>Log out</Text>
                </TouchableOpacity>
            </SafeAreaView>
        </View>
    );
}

export default Profile;