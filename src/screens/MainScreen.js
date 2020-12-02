import React, { useCallback, useContext, useEffect, useState } from 'react'
import { StyleSheet, View, FlatList, Dimensions, Text } from 'react-native'
import { Medicals } from '../components/Medicals'
import { AddMedicines } from '../components/AddMedicines'
import { MedicalContext } from '../context/medical/MedicalContext'
import { ScreenContext } from '../context/screen/screenContext'
import { AppLoader } from '../components/ui/AppLoader'
import { AppButton } from '../components/ui/AppButton'

export const MainScreen = () => {
    const {
        addMedical,
        medicals,
        removeMedical,
        fetchMedicals,
        error,
        loading,
    } = useContext(MedicalContext)
    const { changeScreen } = useContext(ScreenContext)
    const [deviceWidth, setDeviceWidth] = useState(
        Dimensions.get('window').width - 30 * 2
    )

    const loadMedicals = useCallback(async () => await fetchMedicals(), [
        fetchMedicals,
    ]) //позволяет оптимизировать приложение

    useEffect(() => {
        loadMedicals()
    }, [])

    useEffect(() => {
        const update = () => {
            const width = Dimensions.get('window').width - 30 * 2
            setDeviceWidth(width)
        }

        Dimensions.addEventListener('change', update)

        return () => {
            Dimensions.removeEventListener('change', update)
        }
    })
    if (loading) {
        return <AppLoader />
    }
    if (error) {
        return (
            <View style={styles.center}>
                <Text style={styles.error}>Ошибка: {error}</Text>
                <AppButton color="#aaa" onPress={loadMedicals}>
                    Повторить
                </AppButton>
            </View>
        )
    }

    let content = (
        <View style={{ width: deviceWidth }}>
            <FlatList
                data={medicals}
                renderItem={({ item }) => (
                    <Medicals
                        medicals={item}
                        onRemove={removeMedical}
                        changeScreen={changeScreen}
                    />
                )}
                keyExtractor={(item) => item.id.toString()}
            />
        </View>
    )

    return (
        <View>
            <AddMedicines addMedical={addMedical} />
            {content}
        </View>
    )
}
const styles = StyleSheet.create({
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    error: {
        fontSize: 20,
        color: 'red',
        paddingBottom: 20,
    },
})
