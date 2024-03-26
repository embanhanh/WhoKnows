import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

function NumericUpDown({decrement, increment, value}) {
    return (
        <View style={styles.createContentContainer}>
            <Text style={styles.textCreateContent}>Số lượng người chơi: </Text>
            <TouchableOpacity onPress={decrement} style={styles.numberButton}>
                <Text style={styles.textCreateContent}>-</Text>
            </TouchableOpacity>
            <Text style={styles.textCreateContent}>{value}</Text>
            <TouchableOpacity onPress={increment} style={styles.numberButton}>
                <Text style={styles.textCreateContent}>+</Text>
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
        marginLeft: "5%",
        marginRight: "5%",
        borderBottomWidth: 0.5,
    },
    textCreateContent: {
        fontSize: 20,
        color: "black",
    },
    numberButton: {
        backgroundColor: 'lightgray',
        borderRadius: 5,
        width: 30,
        alignItems: "center",
    },
})

export default NumericUpDown;