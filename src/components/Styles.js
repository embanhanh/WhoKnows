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
        paddingVertical: "1%",
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

    loginButton: {
        marginTop: "5%",
        fontSize: 20,
        fontWeight: "bold",
        color: "white",
        backgroundColor: "#6938EF",
        borderRadius: 15,
        paddingHorizontal: "30%",
        paddingVertical: "3%",
        textAlign: "center",
    },

    signUpButton: {
        marginTop: "5%",
        fontSize: 20,
        fontWeight: "bold",
        color: "white",
        backgroundColor: "#6938EF",
        borderRadius: 15,
        paddingHorizontal: "33%",
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

