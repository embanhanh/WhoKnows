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
        justifyContent: 'center',
        alignItems: 'center',
        position: "relative",
    },

    titleIcon: {
        position:"absolute",
        bottom: "17%"
    },

    plusIcon:{
        position:"absolute",
        top: "50%",
        right:"15%",
    },

    minusIcon:{
        position:"absolute",
        top: "76%",
        right:"15%",
    },

    divideIcon: {
        position:"absolute",
        top: "60%",
        left: "14%",
    },

    equalIcon: {
        position:"absolute",
        top: "77%",
        left: "25%",
    },

    multiplyIcon: {
        position:"absolute",
        top: "25%",
        right:"2%",
    },

    moreThanIcon: {
        position:"absolute",
        top: "2%",
        right:"10%",
    },

    lessThanIcon: {
        position:"absolute",
        top: "35%",
        left: "4%",
    },

    percentageIcon: {
        position:"absolute",
        top: "5%",
        left: "21%",
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
        fontSize: 26,
        fontWeight: "bold",
        color: "white",
        paddingHorizontal: 125,
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

