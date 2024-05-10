import React, { useEffect } from "react";
import { View, Text, Modal, StyleSheet, Image, Dimensions,SafeAreaView } from "react-native";
import { RFValue } from 'react-native-responsive-fontsize';

import * as Animatable from 'react-native-animatable';

function ModalGameResult({
    handleCloseResultModal,
    winer,
    keyword,
}) {
    const windowWidth = Dimensions.get('window').width;
    const avatarSize = windowWidth * 0.2; // Kích thước avatarContainer dựa trên tỷ lệ màn hình

    const textColor = winer === 'Village' ? '#507033' : '#4E3E92';

    useEffect(()=>{
        const timeout = setTimeout(()=>{
            handleCloseResultModal()
        }, 5000)

        return ()=>{
            clearTimeout(timeout)
        }
    },[])

    return ( 
        <Modal
                animationType="none"
                transparent={true}
                visible={true}
                onRequestClose={handleCloseResultModal}
            >
            <View style={styles.overlay} />
            <SafeAreaView style={styles.container}>
                <Animatable.View 
                        animation="bounceIn" 
                        duration={1000} 
                        style={styles.resultContainer}>
                    <View style={styles.bannerContainer}></View>
                    <Image source={require('../assets/img/Banner1.png')} style={styles.resultImage}></Image>
                    <View style={styles.infoGameContainer}>
                       <View style={styles.keyWordContainer}>
                            <Text style={{fontSize: RFValue(11), fontWeight: "bold", color: "white", marginBottom: "5%"}}>Từ khóa của dân làng</Text>
                            <Text style={{fontSize: RFValue(25), fontWeight: "bold", color: "white"}}>{keyword}</Text>
                       </View>

                       <View style={styles.winContainer}>
                            <Text style={{fontSize: RFValue(11), fontWeight: "bold", color: "white", marginBottom: "5%"}}>Đội chiến thắng</Text>
                            <Text style={{fontSize: RFValue(25), fontWeight: "bold", color: textColor}}>{winer}</Text>
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
                            <View style={{...styles.avatarContainer, width: avatarSize, height: avatarSize, borderColor:"#121212", top: "-41%", backgroundColor: "#4E3E92" }}>
                                <Image source={require('../assets/img/role-Ghost.png')} style={styles.avatar}/>
                            </View>
                        </View>
                    </View>
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

    resultContainer: {
        position: "relative",
        width: "85%",
        height: 580,
        borderRadius: RFValue(15),
        backgroundColor:  "#1E1E1E",
        alignItems: "center",
        justifyContent: "center",
    },

    bannerContainer:{
        flex: 0.5,
    },

    resultImage: {
        position: "absolute",
        width: '103%',
        height: '14%',
        top: "-7%",
    },

    infoGameContainer: {
        flex: 2,
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
        backgroundColor: "#121212",
        borderRadius: RFValue(10),
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
        marginTop: "20%",
        backgroundColor: "#121212",
        borderRadius: RFValue(10),
    },

    avatarContainer: {
        position: "absolute",
        borderRadius: 60, 
        backgroundColor: "#507033",     
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: RFValue(3),
        borderColor: "#121212",
        top: "-23%",
        left: "300%",
    },

    avatar: {
        width: '80%',
        height: '80%',
        borderRadius: 50, 
    },

    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
    },
})

export default ModalGameResult;