
import React from "react";
import { View, Text, TouchableOpacity, Alert, StyleSheet, TextInput, ImageBackground, Image} from "react-native";
import styles from "../components/Styles.js";
import PlayerCard from "../components/playerCard.js";
import ManagerCard from "../components/managerCard.js";
import Icon from 'react-native-vector-icons/FontAwesome.js';
import { ScrollView } from "react-native-gesture-handler";
import FriendsCard from "../components/friendsCard.js";

function GameScreen() {
    
    return ( 
        <ImageBackground source={require('../assets/img/Theme2.jpg')} style={styles.backgroundImage}>
            <View style={styles.container}>
                <View style={styles.roomInfo}>
                    <Image source={require('../assets/img/RoomInfo.png')} style={styles.roomImage}></Image>
                    <Text style={styles.textRoomNumber}>Số phòng:</Text>
                    <Text style={styles.textRole}>Vai trò:</Text>
                    <Text style={styles.textWord}>CONCAC</Text>
                </View>

                <View style={styles.joinedPlayer}>
                    <View style={styles.leftJoinedPlayer}>
                        <ManagerCard></ManagerCard>
                        <PlayerCard></PlayerCard>
                        <FriendsCard></FriendsCard>
                        <FriendsCard></FriendsCard>
                    </View>

                    <View style={styles.rightJoinedPlayer}>
                        <FriendsCard></FriendsCard>
                        <FriendsCard></FriendsCard>
                        <FriendsCard></FriendsCard>
                        <FriendsCard></FriendsCard>
                    </View>
                </View>

                <View style={styles.chatBoxContainer}>
                    <View style={styles.chatBox}>

                    </View>
                </View>

                <View style={styles.gameToolsContainer}>
                    <TouchableOpacity style={styles.toolsButton}>
                        <Icon name="pencil"  style={styles.toolsIcon}></Icon>
                    </TouchableOpacity>
                </View>
            </View>
         </ImageBackground>
    );
}

export default GameScreen;