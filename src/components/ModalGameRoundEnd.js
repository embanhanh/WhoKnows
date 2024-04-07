import React, { useRef } from "react";
import { View, Text, Modal, StyleSheet, Image, Dimensions, TextInput, SafeAreaView, TouchableOpacity } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import { Divider } from 'react-native-paper';

import Icon from 'react-native-vector-icons/FontAwesome.js';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons.js';
import PagerView from 'react-native-pager-view';

function ModalGameRoundEnd({
    history,
    handleCloseRoundModal,
    members
}) {
    const windowWidth = Dimensions.get('window').width;
    const avatarSize = windowWidth * 0.25; // Kích thước avatarContainer dựa trên tỷ lệ màn hình
    const ref = useRef();
    return ( 
        <Modal
                animationType="fade"
                transparent={true}
                visible={true}
                onRequestClose={handleCloseRoundModal}
            >
            <View style={styles.overlay} />
            <SafeAreaView style={styles.container}>
                <View style={styles.describeContainer}>
                    <Image source={require('../assets/img/owl.png')} style={styles.owlImage}></Image>
                    <View style={styles.titleContainer}>
                        <Text style={styles.titleText}>Lịch sử</Text>
                    </View>

                    <View style={styles.answerListContainer}>
                        <View style={styles.answerListBackGround}>
                            <PagerView style={styles.pagerView} initialPage={0} ref={ref}>
                                <View key="1" style={styles.roundResult}>
                                    <View style={styles.roundContainer}>
                                        <Text style={styles.roundNumber}>Vòng 1</Text>
                                        <TouchableOpacity style={styles.rightButtonContainer} onPress={() => ref.current?.setPage(1)}>
                                            <Icon2 name="arrow-right-drop-circle" style={styles.button}></Icon2>
                                        </TouchableOpacity>
                                    </View>

                                    <Divider style={{ height: "0.5%", backgroundColor: "black", width: "85%", alignSelf: "center", marginTop: "3%" }}></Divider>

                                    <View style={styles.resultContainer}>
                                        <ScrollView style={styles.resultList}>
                                            {history.map((answer, index)=>{
                                                if(index<members){
                                                    return <Text key={index} style={styles.resultText}>{`${answer.email}: ${answer.answer}`}</Text>
                                                }
                                                else
                                                    return
                                            })}
                                        </ScrollView>
                                    </View>
                                </View>

                                <View Key="2" style={styles.roundResult}>
                                    <View style={styles.roundContainer}>
                                        <Text style={styles.roundNumber}>Vòng 2</Text>
                                        <TouchableOpacity style={styles.leftButtonContainer} onPress={() => ref.current?.setPage(0)}>
                                            <Icon2 name="arrow-left-drop-circle" style={styles.button}></Icon2>
                                        </TouchableOpacity>
                                    </View>

                                    <Divider style={{ height: "0.5%", backgroundColor: "black", width: "85%", alignSelf: "center", marginTop: "3%" }}></Divider>

                                    <View style={styles.resultContainer}>
                                        <ScrollView style={styles.resultList}>
                                        {history.map((answer, index)=>{
                                                if(index>=members){
                                                    return <Text key={index} style={styles.resultText}>{`${answer.email}: ${answer.answer}`}</Text>
                                                }
                                                else
                                                    return
                                            })}
                                        </ScrollView>
                                    </View>
                                </View>
                            </PagerView>
                        </View>
                    </View>

                    <TouchableOpacity style={styles.closeButton} onPress={handleCloseRoundModal}>
                        <Icon name="close"  style={styles.closeIcon}></Icon>
                    </TouchableOpacity>
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

    owlImage: {
        position: "absolute",
        width: '35%',
        height: '30%',
        top: "-28.2%",
        left: "5%",
    },

    describeContainer: {
        width: "75%",
        height: "55%",
        borderRadius: RFValue(20),
        backgroundColor:  "#29353B",
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

    leftButtonContainer: {
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        left: "6%",
        top: "23%"
    },

    rightButtonContainer: {
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        right: "6%",
        top: "23%"
    },


    button: {
        fontSize: RFValue(25),
    },

    pagerView: {
        flex: 1,
        paddingHorizontal: "40%",
        overflow: 'hidden',
    },

    answerListContainer: {
        flex: 9,
        justifyContent: "center",
        alignItems: "center",
    }, 

    answerListBackGround: {
        borderRadius: RFValue(20), 
        paddingHorizontal: "3%", 
        paddingVertical: "3%", 
        marginBottom: "10%", 
        backgroundColor: "#E2E4EF",
    },

    roundResult: {
        flex: 1,
    },

    roundContainer: {
        flex: 2,
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
    },

    roundNumber: {
        fontSize: RFValue(20), 
        fontWeight: "bold", 
        color: "black",
    },

    resultContainer: {
        flex: 10,
        justifyContent: "center",
        alignItems: "center",
        marginTop: "4%",
        marginBottom: "9%",
        marginHorizontal: "5%",
    },

    resultList: {
        width: "80%",
    },
    
    resultText: {
        fontSize: RFValue(15), 
        fontWeight: "bold", 
        color: "black",
        marginVertical: "3.2%",
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
})

export default ModalGameRoundEnd;