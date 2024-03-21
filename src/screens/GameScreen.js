
import React from "react";
import { View, Text, TouchableOpacity, Alert, StyleSheet, TextInput, ImageBackground, Image} from "react-native";
import styles from "../components/Styles.js";
import PlayerCard from "../components/playerCard.js";
import ManagerCard from "../components/managerCard.js";
import Icon from 'react-native-vector-icons/FontAwesome.js';
import Icon2 from 'react-native-vector-icons/MaterialIcons.js';
import { ScrollView } from "react-native-gesture-handler";
import FriendsCard from "../components/friendsCard.js";
import { useNavigation } from "@react-navigation/core";

function GameScreen() {
    const navigation = useNavigation();

    const handleHome = () => {
        navigation.navigate('Home');
    };

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
                    <View style={styles.timeLeft}>
                        <Icon name="clock-o"  style={styles.homeIcon}></Icon>
                        <Text>00:50</Text>
                    </View>
                </View>

                <View style={styles.playContainer}>
                    <View style={styles.joinedPlayer}>
                        <ManagerCard></ManagerCard>
                        <PlayerCard></PlayerCard>
                        <FriendsCard></FriendsCard>
                        <FriendsCard></FriendsCard>
                        <FriendsCard></FriendsCard>
                        <FriendsCard></FriendsCard>
                        <FriendsCard></FriendsCard>
                        <FriendsCard></FriendsCard>
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