import { StyleSheet } from 'react-native';
import mainStyles from './mainstyle.js'

const styles = StyleSheet.create({

    containers: {
        flex: 1,
        backgroundColor: mainStyles.primaryColor,
        paddingTop: "10%",
    },

    scrollViewContent: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
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

    //ModalSetting
    modalContainer: {
        backgroundColor: "white",
        width: "80%",
        height: "80%",
        alignSelf: "center",
        justifyContent: "center"
    },

    //Profile
    headerProfile: {
        paddingVertical: "0%",
        marginRight: "50%",
    },

    avatar: {
        marginTop: "10%",
        paddingHorizontal: "13%",
        paddingVertical: "11%",
        borderRadius: 50,
        backgroundColor: "white",
    },
});

export default styles

