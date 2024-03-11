import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import ButtonType from "../components/ButtonType";

function Home( { navigation }) {


    return ( 
        <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
            <Text>Home</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Signin')}>
                <Text>Go to
                </Text>
            </TouchableOpacity>
            <ButtonType></ButtonType>
        </View>
    );
}

export default Home;