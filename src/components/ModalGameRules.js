import React, { useRef, useContext, useState, useCallback } from "react";
import { View, Text, Modal, StyleSheet, Image, SafeAreaView, TouchableOpacity } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { ScrollView } from "react-native-gesture-handler";
import { RFValue } from 'react-native-responsive-fontsize';
import { Divider } from 'react-native-paper';
import { Audio } from 'expo-av';

import Icon from 'react-native-vector-icons/FontAwesome.js';
import * as Animatable from 'react-native-animatable';
import SoundVolumeContext from "../AuthContext/SoundProvider.js";

function ModalGameRules({
    handleCloseRulesModal,
}) {
    const { volume } = useContext(SoundVolumeContext);
    const [sound, setSound] = useState(null);

    async function playSound(filepath) {
        const { sound } = await Audio.Sound.createAsync(filepath, { volume });
        setSound(sound);
        await sound.playAsync();
    }

    useFocusEffect(useCallback(() => {
        return sound
            ? () => {
                sound.unloadAsync();
            }
            : undefined;
    }, [sound]));

    return (
        <Modal
            animationType="none"
            transparent={true}
            visible={true}
            onRequestClose={handleCloseRulesModal}
        >
            <View style={styles.overlay} />
            <SafeAreaView style={styles.container}>
                <Animatable.View
                    animation="bounceIn"
                    duration={1000}
                    style={styles.rulesContainer}>
                    <Image source={require('../assets/img/owl.png')} style={styles.owlImage}></Image>
                    <View style={styles.titleContainer}>
                        <Text style={styles.titleText}>Luật chơi</Text>
                    </View>

                    <View style={styles.answerListContainer}>
                    <ScrollView>
                            <Text style={styles.text}>
                                - Hệ thống sẽ cung cấp 1 từ khóa.
                                {"\n"}- Người chơi sẽ được chia vào hai phe: Evil Ghost và Villager:
                                {"\n"}+ Phòng chơi 4-5 người: 1 Evil Ghost.
                                {"\n"}+ Phòng chơi 6-8 người: 2 Evil Ghost.
                                {"\n"}- Tất cả người chơi sẽ được nhận gợi ý từ hệ thống. Riêng Villager sẽ biết được từ khóa của trò chơi.
                                {"\n"}- Có 2 vòng chơi, ở mỗi vòng lần lượt người chơi phải mô tả từ khóa của game bằng một từ/cụm từ gồm 1-3 tiếng.
                                {"\n"}- Evil ghost sẽ dựa vào gợi ý của hệ thống và các mô tả của các người chơi trước đó để đưa ra mô tả liên quan với từ khóa.
                                {"\n"}- Villager sẽ dựa vào mô tả để tìm ra Evil Ghost.
                                {"\n"}- Sau vòng chơi đầu tiên, người chơi sẽ được bỏ phiếu (kín) lượt 1 cho một người chơi khác.
                                {"\n"}- Sau vòng chơi thứ hai, người chơi sẽ được bỏ phiếu lượt 2.
                                {"\n"}- Sau hai vòng chơi, 2 người (với phòng 4-5 người) hoặc 3 người (với phòng 6-8 người) có tổng số phiếu cao nhất sẽ bị xét danh tính.
                                {"\n"}- Phe Villager sẽ chiến thắng nếu tìm ra được tất cả Evil Ghost. Tuy nhiên, nếu có Evil Ghost đoán đúng từ khóa khi bị xét danh tính thì phe Evil Ghost sẽ chiến thắng.
                            </Text>

                            <Text style={styles.sectionTitle}>* Mẹo:</Text>
                            <Text style={styles.text}>
                                - Hãy dùng đoạn chat để đánh lạc hướng nhau bằng những câu nói vu vơ.
                                {"\n"}- Thời gian trong game rất quan trọng, hãy tận dụng từng giây từng phút!
                            </Text>
                        </ScrollView>
                    </View>

                    <TouchableOpacity style={styles.closeButton} onPress={handleCloseRulesModal}>
                        <Icon name="close" style={styles.closeIcon}></Icon>
                    </TouchableOpacity>
                </Animatable.View>
            </SafeAreaView>
        </Modal>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    owlImage: {
        position: "absolute",
        width: '30%',
        height: '25%',
        top: "-23.2%",
        left: "5%",
    },
    rulesContainer: {
        width: "75%",
        height: "52%",
        borderRadius: RFValue(20),
        backgroundColor: "#29353B",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
    },
    titleContainer: {
        flex: 2,
        justifyContent: "center",
        alignItems: "center",
    },
    titleText: {
        fontSize: RFValue(25),
        fontWeight: "bold",
        color: "white",
    },
    answerListContainer: {
        flex: 9,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#E2E4EF",
        marginHorizontal: "10%",
        marginBottom: "10%",
        paddingVertical: "3%",
        paddingHorizontal: "5%",
        borderRadius: RFValue(10),
    },
    
    sectionTitle: {
        fontSize: RFValue(15),
        fontWeight: "bold",
        color: "black",
        marginTop: "10%",
    },

    text: {
        fontSize: RFValue(11), 
        fontWeight: "bold", 
        color: "black",
    },
    
    closeButton: {
        backgroundColor: "#022728",
        borderRadius: RFValue(30),
        paddingHorizontal: "3%",
        paddingVertical: "2%",
        position: "absolute",
        top: "-3%",
        right: "-3%",
        justifyContent: "center",
        alignItems: "center",
    },
    closeIcon: {
        fontSize: RFValue(14),
        color: "white",
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
    },
});

export default ModalGameRules;
