import React, { useState } from 'react'
import { StyleSheet, View, Text, TextInput, Modal, Alert } from 'react-native'
import { AppButton } from './ui/AppButton'
import { AntDesign } from '@expo/vector-icons'

export const EditModal = ({
    medicalName,
    medicalDescribe,
    medicalAlertTime,
    visible,
    onSave,
    closeModal,
}) => {
    const [name, setName] = useState(medicalName)
    const [describe, setDescribe] = useState(medicalDescribe)
    const [alertTime, setAlertTime] = useState(medicalAlertTime)
    const saveData = () => {
        if (name.trim().length < 3) {
            Alert.alert('Название должно быть больше 2 символов')
        } else {
            onSave(name, describe, alertTime)
        }
    }
    const cancelHandler = () => {
        setName(medicalName)
        setDescribe(medicalDescribe)
        setAlertTime(medicalAlertTime)
        closeModal()
    }

    return (
        <Modal visible={visible} animationType="slide">
            <View style={styles.edit}>
                <Text style={styles.text}>Название:</Text>
                <View style={styles.separator}></View>
                <TextInput
                    placeholder="Введите текст"
                    maxLength={30}
                    style={styles.input}
                    defaultValue={name}
                    onChangeText={setName}
                />
                <View style={styles.separator}></View>
                <Text style={styles.text}>Описание:</Text>
                <TextInput
                    style={styles.TextArea}
                    placeholder="Введите Описание"
                    multiline
                    numberOfLines={4}
                    onChangeText={setDescribe}
                    value={describe}
                />
                <View style={styles.separator}></View>
                <Text style={styles.text}>Время оповещения:</Text>
                <TextInput
                    style={styles.text}
                    placeholder="Время"
                    value={alertTime}
                    onChangeText={setAlertTime}
                />
                <View style={styles.separator}></View>
                <View style={styles.buttons}>
                    <AppButton color="#aaa" onPress={cancelHandler}>
                        <AntDesign name="back" size={20} />
                    </AppButton>
                    <AppButton color="green" onPress={saveData}>
                        Сохранить
                    </AppButton>
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    edit: {
        flexDirection: 'column',
        paddingHorizontal: 30,
        paddingVertical: 20,
    },
    text: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 10,
    },
    input: {
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: '#aaa',
        fontSize: 15,
        padding: 8,
    },
    TextArea: {
        borderWidth: 1,
        height: 80,
        borderStyle: 'solid',
        borderColor: '#aaa',
        padding: 10,
    },

    separator: {
        height: 1,
        backgroundColor: '#000',
        marginTop: 8,
        marginBottom: 8,
    },
})
