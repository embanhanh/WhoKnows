import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import Icon from 'react-native-vector-icons/FontAwesome.js';


function NumericUpDown({decrement, increment, value}) {
    return (
        <View style={styles.createContentContainer}>
            <Text style={styles.textCreateContent}>Số lượng: </Text>

            <TouchableOpacity onPress={decrement} style={styles.minusButton}>
                <Icon name="minus" style={styles.iconButton}></Icon>
            </TouchableOpacity>

            <View style={styles.numberContainer}>
                <Text style={styles.textCreateContent}>{value}</Text>
            </View>

            <TouchableOpacity onPress={increment} style={styles.plusButton}>
                <Icon name="plus" style={styles.iconButton}></Icon>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    createContentContainer: {
        flex: 0.75,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginLeft: "12.5%",
        marginRight: "12.5%",
    },

    textCreateContent: {
        fontSize: RFValue(16),
        color: "white",
        fontWeight: "bold",
    },

    numberContainer:{
        justifyContent: "center",
        alignItems: "center",
        borderWidth: RFValue(3),
        borderRadius: RFValue(5),
        paddingHorizontal: "4%",
        borderColor: "#F8C630",
        marginHorizontal: "5%",
    },

    plusButton: {
        backgroundColor: 'lightgray',
        borderRadius: RFValue(5),
        paddingHorizontal: "4%",
        paddingVertical: "2%",
        alignItems: "center",
        justifyContent: "center",
    },

    minusButton: {
        backgroundColor: 'lightgray',
        borderRadius: RFValue(5),
        paddingHorizontal: "4%",
        paddingVertical: "2%",
        alignItems: "center",
        justifyContent: "center",
    },

    iconButton: {
        fontSize: RFValue(12),
    },
})

export default NumericUpDown;