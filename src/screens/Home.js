import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Buttons from "../components/Styles.js";

function Home( { navigation }) {


    return ( 
        <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
            <Text>Home</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Signin')}>
                <Text>Sign in screen
                </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
                <Text>Sìgn Up screen
                </Text>
            </TouchableOpacity>
        </View>
    );
}

export default Home;