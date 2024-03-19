import { StyleSheet } from 'react-native';
import mainStyles from './mainstyle.js';

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

    textButton: {
        fontSize: 20,
        color: "white",
        fontWeight: "bold",
    },

    backgroundBehindText: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: "#6938EF",
        borderRadius: 15,
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

    createRoomButton: {
        position: "relative",
        paddingVertical: "3%",
        justifyContent: 'center',
        alignItems: 'center',
        minWidth: "30%",
        marginRight: "5%",
    },

    findRoomButton: {
        position: "relative",
        paddingVertical: "3%",
        justifyContent: 'center',
        alignItems: 'center',
        minWidth: "50%",
    },

    //ModalSetting
    modalContainer: {
        backgroundColor: "white",
        width: "80%",
        height: "80%",
        alignSelf: "center",
        justifyContent: "center"
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
        borderRadius: 10,
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
        height: "50%",
        borderRadius: 50,
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
        fontSize: 30,
    }
});

export default styles

