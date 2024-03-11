import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({

    commonStyle: {
        primaryColor: '#0e252d'
    },

    containers: {
        flex: 1,
        backgroundColor: '#0e252d',
        paddingTop: 30,
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
        marginTop: 30,
        paddingHorizontal: 10,
        flexDirection: "row",
        backgroundColor: "#00FFDF",
        borderRadius: 15,
        alignItems: "center",
        paddingVertical: 10,
    },

    email: {
        fontSize: 16,
        width: 280,
        marginLeft: 10,
    },

    inputPass: {
        marginTop: 15,
        paddingHorizontal: 15,
        flexDirection: "row",
        backgroundColor: "#00FFDF",
        borderRadius: 15,
        alignItems: "center",
        paddingVertical: 10,
    },

    password: {
        fontSize: 16,
        width: 280,
        marginLeft: 10,
    },

    textForgot: {
        fontSize: 16,
        color: "gray",
        marginTop: 10,
        marginLeft: 170,
    },

    loginButton: {
        marginTop: 15,
        fontSize: 24,
        fontWeight: "bold",
        color: "white",
        paddingHorizontal: 128,
        paddingVertical: 10,
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
    }
});

export default styles

