import React from "react";
import { View, Text, Modal, StyleSheet, Image, Dimensions, TextInput, SafeAreaView, TouchableOpacity } from "react-native";
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import symbolicateStackTrace from "react-native/Libraries/Core/Devtools/symbolicateStackTrace";

function ModalGameResult({
    resultVisible,
    handleCloseResultModal,
}) {
    const windowWidth = Dimensions.get('window').width;
    const avatarSize = windowWidth * 0.2; // Kích thước avatarContainer dựa trên tỷ lệ màn hình
    return ( 
        <Modal
                animationType="fade"
                transparent={true}
                visible={resultVisible}
                onRequestClose={handleCloseResultModal}
            >
            {resultVisible  && <View style={styles.overlay} />}
            <SafeAreaView style={styles.container}>
                <View style={styles.resultContainer}>
                    <View style={styles.bannerContainer}></View>
                    <Image source={require('../assets/img/Banner.png')} style={styles.resultImage}></Image>
                    <View style={styles.infoGameContainer}>
                       <View style={styles.keyWordContainer}>
                            <Text style={{fontSize: RFValue(11), fontWeight: "bold", color: "green", marginBottom: "3%"}}>Từ khóa của dân làng</Text>
                            <Text style={{fontSize: RFValue(15), fontWeight: "bold",}}>Jack Sparrow</Text>
                       </View>

                       <View style={styles.winContainer}>
                            <Text style={{fontSize: RFValue(11), fontWeight: "bold", color: "purple", marginBottom: "3%"}}>Đội chiến thắng</Text>
                            <Text style={{fontSize: RFValue(15), fontWeight: "bold",}}>Evil Ghost</Text>
                       </View>
                    </View>

                    <View style={styles.villagerContainer}>
                        <View style={styles.villagerTeam}>
                            <View style={{...styles.avatarContainer, width: avatarSize, height: avatarSize }}>
                                <Image source={require('../assets/img/role-Villager.png')} style={styles.avatar}/>
                            </View>
                        </View>
                    </View>

                    <View style={styles.ghostContainer}>

                        <View View style={styles.ghostTeam}>
                            <View style={{...styles.avatarContainer, width: avatarSize, height: avatarSize, borderColor:"black", top: "-41%", backgroundColor: "#4E3E92" }}>
                                <Image source={require('../assets/img/role-Ghost.png')} style={styles.avatar}/>
                            </View>
                        </View>
                    </View>
                </View>
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

    resultContainer: {
        position: "relative",
        width: "85%",
        height: "70%",
        borderRadius: RFValue(20),
        backgroundColor:  "#ECD1AB",
        alignItems: "center",
        justifyContent: "center",
        borderWidth: RFValue(3),
    },

    bannerContainer:{
        flex: 1,
    },

    resultImage: {
        position: "absolute",
        width: '104%',
        height: '16%',
        top: "-7%",
    },

    infoGameContainer: {
        flex: 1,
        flexDirection: "row",
    },

    keyWordContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },

    winContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },

    villagerContainer: {
        flex: 5,
        alignItems: "center",
        justifyContent: "center",
    },

    villagerTeam: {
        position: "relative",
        width: "90%",
        height: "85%",
        paddingHorizontal: "40%",
        marginTop: "18%",
        backgroundColor: "#699A3D",
        borderWidth: RFValue(2),
        borderColor: "black",
        borderRadius: RFValue(20),
    },

    ghostContainer:{
        flex: 4,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: "5%",
    },

    ghostTeam: {
        position: "relative",
        width: "90%",
        height: "60%",
        paddingHorizontal: "40%",
        marginTop: "16%",
        backgroundColor: "#4E3E92",
        borderWidth: RFValue(2),
        borderColor: "black",
        borderRadius: RFValue(20),
    },

    avatarContainer: {
        position: "absolute",
        borderRadius: 60, 
        borderWidth: RFValue(2), 
        backgroundColor: "#699A3D",
        borderColor:   'black',  
        alignItems: 'center',
        justifyContent: 'center',
        top: "-23%",
        left: "335%",
    },

    avatar: {
        width: '80%',
        height: '80%',
        borderRadius: 50, 
    },

    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
})

export default ModalGameResult;