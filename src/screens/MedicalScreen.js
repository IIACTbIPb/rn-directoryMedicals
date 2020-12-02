import React, { useContext, useState } from 'react'
import { StyleSheet, View, ScrollView, Text, Button } from 'react-native'
import { AppCard } from '../components/ui/AppCard'
import { EditModal } from '../components/EditModal'
import { FontAwesome, Feather, AntDesign } from '@expo/vector-icons'
import { AppButton } from '../components/ui/AppButton'
import { MedicalContext } from '../context/medical/MedicalContext'
import { ScreenContext } from '../context/screen/screenContext'

export const MedicalScreen = () => {
    const [modal, setModal] = useState(false)
    const { medicals, removeMedical, updateMedical } = useContext(
        MedicalContext
    )
    const { medicalId, changeScreen } = useContext(ScreenContext)

    const medical = medicals.find((m) => m.id === medicalId)
    const deleteMedical = () => {
        removeMedical(medical.id)
    }

    const saveHandler = async (name, describe, alertTime) => {
        await updateMedical(medical.id, name, describe, alertTime)
        setModal(false)
    }

    return (
        <View>
            <EditModal
                visible={modal}
                closeModal={() => setModal(false)}
                medicalName={medical.name}
                medicalDescribe={medical.description}
                medicalAlertTime={medical.alertTime}
                onSave={saveHandler}
            />
            <AppCard>
                <Text style={styles.title}>{medical.name}</Text>
                {/*<Button title="Ред." color="#f47413" onPress={()=>setModal(true)}/>*/}
                {/*<FontAwesome5 name="edit" size={24} color="#f47413" onPress={()=>setModal(true)} />*/}
                <AppButton color="#f47413" onPress={() => setModal(true)}>
                    <FontAwesome name="edit" size={20} color="#fff" />
                </AppButton>
            </AppCard>
            <View style={styles.separator}></View>
            <AppCard>
                <View>
                    <Text style={styles.text}>Описание препарата:</Text>
                    <Text>{medical.description}</Text>
                </View>
            </AppCard>
            <View style={styles.separator}></View>
            <AppCard>
                <View>
                    <Text style={styles.text}>Время оповещения:</Text>
                    <Text style={styles.time}>{medical.alertTime}</Text>
                </View>
            </AppCard>
            <View style={styles.separator}></View>
            <View style={styles.buttons}>
                <View style={styles.button}>
                    <AppButton color="#aaa" onPress={() => changeScreen(null)}>
                        <AntDesign name="back" size={20} />
                    </AppButton>
                </View>
                <View style={styles.button}>
                    <AppButton
                        color="red"
                        onPress={() => deleteMedical(medical.id)}
                    >
                        <Feather name="delete" size={20} />
                    </AppButton>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    buttons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 10,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    separator: {
        height: 1,
        backgroundColor: '#000',
        marginTop: 8,
        marginBottom: 8,
    },
    button: {
        width: '40%',
    },
    text: {
        fontSize: 20,
        fontFamily: 'roboto-bold',
        paddingBottom: 10,
    },
    time: {
        fontSize: 20,
        color: 'red',
    },
})
