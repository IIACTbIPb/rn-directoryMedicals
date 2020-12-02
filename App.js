import { StatusBar } from 'expo-status-bar'
import React, { useState } from 'react'
import { StyleSheet, View, Alert } from 'react-native'
import * as Font from 'expo-font'
import { AppLoading } from 'expo'
import { MainLayout } from './src/MainLayout'
import { MedicalState } from './src/context/medical/MedicalState'
import { ScreenState } from './src/context/screen/ScreenState'

async function LoadApliccation() {
    await Font.loadAsync({
        'roboto-bold': require('./assets/fonts/Roboto-Bold.ttf'),
    })
}

export default function App() {
    const [isReady, setIsReady] = useState(false)

    if (!isReady) {
        return (
            <AppLoading
                startAsync={LoadApliccation}
                onError={(err) => console.log(err)}
                onFinish={() => setIsReady(true)}
            />
        )
    }

    return (
        <ScreenState>
            <MedicalState>
                <MainLayout />
            </MedicalState>
        </ScreenState>
    )
}
