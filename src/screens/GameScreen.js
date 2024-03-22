
import React from "react";
import { View, Text, TouchableOpacity, Alert, StyleSheet, TextInput, ImageBackground, Image} from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome.js';
import Icon2 from 'react-native-vector-icons/MaterialIcons.js';
import { ScrollView } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/core";

import styles from "../components/Styles.js";
import PlayerCard from "../components/PlayerCard.js";

function GameScreen() {
    const navigation = useNavigation();

    const handleHome = () => {
        navigation.navigate('Home');
    };

    const members = [
        {isManager: true},
        {isYou: true},
        {},
        {},
        {},
        {},
        {},
        {},
    ]

    return ( 
        <ImageBackground source={require('../assets/img/Theme2.jpg')} style={styles.backgroundImage}>
            <View style={styles.container}>
                <View style={styles.roomInfo}>
                    <Image source={require('../assets/img/RoomInfo.png')} style={styles.roomImage}></Image>
                    <Text style={styles.textRoomNumber}>Số phòng: A13</Text>
                    <Text style={styles.textWord}>Ghost</Text>
                    <TouchableOpacity style={styles.homeButton} onPress={handleHome}>
                        <Icon name="sign-out"  style={styles.homeIcon}></Icon>
                    </TouchableOpacity>
                    <View style={styles.timeClock}>
                        <Icon name="clock-o"  style={styles.clockIcon}></Icon>
                        <Text style={styles.timeLeft}>00:50</Text>
                    </View>
                    <Image source={require('../assets/img/character-EvilGhost.gif')} style={styles.characterGif}></Image>
                </View>

                <View style={styles.playContainer}>
                    <View style={styles.joinedPlayer}>
                    {
                            members.map((member,index)=>{
                                if(index%2==0){
                                    return(
                                        <PlayerCard key={index} bubbleType="left" avatarAlignment="flex-start" {...member}></PlayerCard>
                                    )
                                }else{
                                    return(
                                        <PlayerCard key={index} bubbleType="right" avatarAlignment="flex-end" {...member}></PlayerCard>
                                    )
                                }
                            })
                        }
                    </View>

                    <View style={styles.chatBoxContainer}>
                        <View style={styles.chatBox}>
        
                        </View>
                    </View>
                </View>

                <View style={styles.gameToolsContainer}>
                    <TouchableOpacity style={styles.toolsButton}>
                        <Icon name="pencil"  style={styles.toolsIcon}></Icon>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.rulesButton}>
                        <Icon name="question"  style={styles.rulesIcon}></Icon>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.messageButton}>
                        <Icon2 name="message" style={styles.messageIcon}></Icon2>
                    </TouchableOpacity>
                </View>
            </View>
         </ImageBackground>
    );
}

export default GameScreen;