import React from 'react'
import { ActivityIndicator, StyleSheet, View } from 'react-native'

export const AppLoader = () => (
    <View style={styles.center}>
        <ActivityIndicator size="large" color="red" />
    </View>
)

const styles = StyleSheet.create({
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
})
