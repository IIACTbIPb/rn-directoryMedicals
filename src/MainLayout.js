import React, { useState, useContext } from 'react'
import { StyleSheet, View, Alert } from 'react-native'
import { Navbar } from './components/Navbar'
import { MainScreen } from './screens/MainScreen'
import { MedicalScreen } from './screens/MedicalScreen'
import { MedicalContext } from './context/medical/MedicalContext'
import { ScreenContext } from './context/screen/screenContext'

export const MainLayout = () => {
    const { medicalId } = useContext(ScreenContext)

    return (
        <View style={styles.wrapper}>
            <Navbar title="Справочник лекарств" />
            <View style={styles.container}>
                {medicalId ? <MedicalScreen /> : <MainScreen />}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 30,
        paddingVertical: 20,
    },
    wrapper: {
        flex: 1,
    },
})
