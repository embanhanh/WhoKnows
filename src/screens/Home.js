import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

function Home( { navigation }) {


    return ( 
        <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
            <Text>Home</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Signin')}>
                <Text>Go to
                </Text>
            </TouchableOpacity>
        </View>
    );
}

export default Home;