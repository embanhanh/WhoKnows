import { StyleSheet } from 'react-native';
import mainStyles from './mainstyle.js'

const styles = StyleSheet.create({

    containers: {
        flex: 1,
        backgroundColor: mainStyles.primaryColor,
        paddingTop: 30,
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
    },

    header: {
        paddingVertical: 0,
    },

    textHeader: {
        color: '#FFFFFF',
        fontWeight: 'bold',
        fontSize: 40,
    },

    inputAcc: {
        marginTop: "5%",
        marginHorizontal: "2%",
        paddingVertical: "3%",
        paddingHorizontal: "4%",
        flexDirection: "row",
        backgroundColor: "#00FFDF",
        borderRadius: 15,
        alignItems: "center",
    },

    email: {
        fontSize: 18,
        width: "80%",
        height: "80%",
        marginLeft: "2%",
    },

    inputPass: {
        marginTop: "5%",
        marginHorizontal: "2%",
        paddingVertical: "3%",
        paddingHorizontal: "4%",
        flexDirection: "row",
        backgroundColor: "#00FFDF",
        borderRadius: 15,
        alignItems: "center",
    },

    password: {
        fontSize: 18,
        width: "80%",
        height: "80%",
        marginLeft: "3%",
    },

    textForgot: {
        fontSize: 16,
        color: "gray",
        marginTop: 10,
        marginLeft: "57%",
    },

    iconGmail: {
        fontSize: 25,
    },

    iconPass: {
        fontSize: 25,
        marginLeft: "1%"
    },

    loginButton: {
        marginTop: 15,
        fontSize: 20,
        fontWeight: "bold",
        color: "white",
        backgroundColor: "#6938EF",
        borderRadius: 15,
        paddingHorizontal: "30%",
        paddingVertical: "3%",
        textAlign: "center",
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
    }
});

export default styles

