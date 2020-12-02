import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'

export const Medicals = ({ medicals, onRemove, changeScreen }) => {
    return (
        <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => changeScreen(medicals.id)}
            onLongPress={() => onRemove(medicals.id)}
        >
            <View style={styles.card}>
                <Text style={styles.text}>{medicals.name}</Text>
                <Text style={styles.text}>{medicals.alertTime}</Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    card: {
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        backgroundColor: '#f194ff',
        borderRadius: 5,
    },
    text: {
        fontFamily: 'roboto-bold',
        color: '#fff',
        fontSize: 20,
    },
})
