import { StyleSheet } from 'react-native';
import mainStyles from './mainstyle.js';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';

import * as Font from 'expo-font';

const styles = StyleSheet.create({

    containers: {
        flex: 1,
        backgroundColor: mainStyles.primaryColor,
        paddingTop: "10%",
    },

    title: {
        flex: 3,
    },

    login: {
        flex: 4,
        alignItems: "center",
        alignSelf: "center"
    },

    header: {
        paddingVertical: "0%",
    },

    textHeader: {
        color: '#FFFFFF',
        fontWeight: 'bold',
        fontSize: 40,
    },

    inputText: {
        marginTop: "5%",
        paddingVertical: "3%",
        paddingHorizontal: "3%",
        width: "85%",
        flexDirection: "row",
        backgroundColor: "#00FFDF",
        borderRadius: 15,
        alignItems: "center",
        justifyContent: "space-between",
    },

    icon:{
        fontSize: 25,
    },

    email: {
        fontSize: 18,
        width: "89%"
    },

    pass: {
        fontSize: 18,
        width: "76%",
    },

    toggleButton:{
        width: "10%",
    },

    buttonContainer: {
        marginTop: "6%",
        alignItems: 'center',
        flexDirection: "row",
        justifyContent: "space-between",
    },

    mainButton: {
        position: "relative",
        paddingVertical: "3%",
        justifyContent: 'center',
        alignItems: 'center',
        minWidth: "85%",
    },

    backgroundBehindText: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: "#6938EF",
        backgroundImage: "linear",
        borderRadius: 15,
    },
    textButton: {
        fontSize: 20,
        color: "white",
        fontWeight: "bold",
    },
    createRoomButton: {
        position: "relative",
        paddingVertical: "3%",
        justifyContent: 'center',
        alignItems: 'center',
        minWidth: "40%",
        marginRight: "5%",
    },
    signUpAccount: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 20,
    },

    text: {
        fontSize: 16,
        color: "gray",
    },

    textSignIU: {
        fontSize: 16,
        color: "white",
        fontWeight: "bold",
        marginLeft: 5,
    },

    setting: {
        flex: 1,
        marginTop: "20%",
        marginLeft: "60%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },

    settingButton: {
        borderWidth: 3,
        borderColor: "white",
        alignItems: "center",
        marginHorizontal: "5%",
        justifyContent: "center",
    },

    settingIcon: {
        fontSize: 30,
        color: "#ffffff",
        marginHorizontal: "4%",
        marginVertical: "4%",
    },

    //Home
    container: {
        flex: 1,
        paddingTop: "20%",
    },

    backgroundImage: {
        flex: 1,
        width: '100%',
        height: '100%',
        resizeMode: "cover",
    },
    findRoomButton: {
        position: "relative",
        paddingVertical: "3%",
        justifyContent: 'center',
        alignItems: 'center',
        minWidth: "40%",
    },
    //createRoom
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    iconHome: {
        fontSize: 35,
        marginRight: "80%",
    },
    //ModalSetting
    modalContainer: {
        backgroundColor: "white",
        top: "35%",
        width: "90%",
        height: "30%",
        alignSelf: "center",
        justifyContent: "center",
        borderRadius: 20,
    },
    //Profile
    profileContainer: {
        flex: 1,
    },
    headerProfile: {
        flex: 2,
        backgroundColor: mainStyles.primaryColor,
        alignItems: "center",
        justifyContent: "center",
    },
    toolsProfile: {
        flex: 4,
        backgroundColor: "#363442",
        justifyContent: "center",
        paddingTop: "20%",
    },
    cardContainer: {
        position: "absolute",
        top: "20%", 
        marginHorizontal: "5%",
        width: "90%",
        height: "27%",
        backgroundColor: "#363442",
        borderRadius: RFValue(10),
        elevation: 5, 
        shadowColor: "#000", 
        shadowOffset: { width: 0, height: 7 },
        shadowOpacity: 0.25, 
        shadowRadius: 3.84, 
        justifyContent: "center",
        alignItems: "center"
    },
    avatar: {
        width: "30%",
        height: "45%",
        borderRadius: RFValue(50),
        backgroundColor: "white",
    },

    textProfile: {
        marginTop: "5%",
        fontSize: 20,
        color: "white",
    },
    tools: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginHorizontal: "5%",
        borderRadius: 10,
        height: "10%",
        marginTop: "10%",
    },
    textTools: {
        fontSize: 22,
        color: "white",
        fontWeight: "bold",
        width: "78%"
    },
    square: {
        backgroundColor: mainStyles.primaryColor,
        width: "16%",
        height: "120%",
        borderRadius: 30,
        alignItems: "center",
        justifyContent: "center",
    },
    iconTools: {
        color: "white",
        fontSize: RFValue(30),
    },
    //GameRoom
    roomInfo: {
        flex: 1.5,
        alignItems: "center",
        justifyContent: "center",
    },    
    roomImage: {
        resizeMode: "stretch",
        marginLeft: "3%",
        marginBottom: "15%",
        width: "56%",
        height: "170%",
        position: "relative",
    },
    textRoomNumber: {
        position: 'absolute',
        bottom: "95%",
        color: 'black', 
        fontSize: RFValue(15), 
        fontWeight: 'bold', 
        padding: 5, 
    },
    textWord: {
        bottom: "50%",
        position: 'absolute',
        color: 'black', 
        fontSize: RFValue(24),
        fontWeight: 'bold', 
        padding: 5, 
    },
    homeButton: {
        position: 'absolute',
        borderRadius: 25,
        borderColor: "white",
        alignItems: "center",
        justifyContent: "center",
        right: "6%",
        top: "-30%",
    },
    homeIcon: {
        fontSize: RFValue(30),
        color: "#ffffff",
        marginHorizontal: "2%",
        marginVertical: "2%",
    },
    timeClock:{
        position: 'absolute',
        flexDirection: "row",
        borderRadius: RFValue(25),
        alignItems: "center",
        justifyContent: "space-between",
        left: "2%",
        right: "74%",
        top: "-35%",
        backgroundColor: "purple",
    },
    clockIcon: {
        fontSize: RFValue(20),
        color: "white",
        marginLeft: "8%",
    },
    timeLeft: {
        width: "65%",
        fontSize: RFValue(18),
        color: "white",
    },

    characterGif: {
        position: 'absolute',
        resizeMode: "stretch",
        width: "20%",
        height: "70%",
        left: "2%",
        top: "3%",
    },
    playContainer: {
        flex: 9,
    },
    joinedPlayer: {
        flexDirection: 'row',
        flexWrap: "wrap",
        justifyContent: 'space-between',
        marginBottom: "5%",
    },
    chatBoxContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    chatBox: {
        borderRadius: RFValue(20),
        width: "90%",
        marginBottom: "7%",
        backgroundColor: "#171D63",
    },
    gameToolsContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
    },
    rulesButton: {
        backgroundColor: "#353B63",
        borderRadius: RFValue(30),
        paddingHorizontal: "4%", 
        paddingVertical: "3%", 
        position: "absolute",
        bottom: "30%",
        left: "10%",
        justifyContent: "center",
        alignItems: "center",
    },
    rulesIcon: {
        fontSize: RFValue(20),
        color: "#ffffff",
    },
    toolsButton: {
        backgroundColor: "#353B63",
        borderRadius: RFValue(30),
        paddingHorizontal: "3.5%", 
        paddingVertical: "3%", 
        position: "absolute",
        bottom: "30%",
        justifyContent: "center",
        alignItems: "center",
    },    toolsIcon: {
        fontSize: RFValue(30),
        color: "#ffffff",
    },
    messageButton: {
        backgroundColor: "#353B63",
        borderRadius: RFValue(25),
        paddingHorizontal: "3%", 
        paddingVertical: "3%", 
        position: "absolute",
        bottom: "30%",
        right: "10%",
        justifyContent: "center",
        alignItems: "center",
    },
    messageIcon: {
        fontSize: RFValue(20),
        color: "#ffffff",
    },
});

export default styles

