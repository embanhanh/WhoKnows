import { StyleSheet } from 'react-native';

const Style = StyleSheet.create({
    title: {
        flex: 1,
        position: "relative",
        justifyContent: 'center',
        alignItems: 'center',
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
});

export default Style

