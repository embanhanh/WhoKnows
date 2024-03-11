import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Buttons from "../components/Styles.js";

function Home( { navigation }) {


    return ( 
        <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
            <Text>Home</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Signin')}>
                <Text>Go to
                </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
                <Text>Go to 1
                </Text>
            </TouchableOpacity>
        </View>
    );
}

export default Home;