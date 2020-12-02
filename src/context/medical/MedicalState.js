import React, { useReducer, useContext } from 'react'
import { Alert } from 'react-native'
import { MedicalContext } from './MedicalContext'
import { medicalReducer } from './medicalReducer'
import {
    ADD_MEDICAL,
    UPDATE_MEDICAL,
    REMOVE_MEDICAL,
    SHOW_LOADER,
    HIDE_LOADER,
    SHOW_ERROR,
    CLEAR_ERROR,
    FETCH_MEDICALS,
} from '../types'
import { ScreenContext } from '../screen/screenContext'
import { Http } from '../../http'

export const MedicalState = ({ children }) => {
    const initialState = {
        medicals: [],
        loading: false,
        error: null,
    }
    const { changeScreen } = useContext(ScreenContext)
    const [state, dispatch] = useReducer(medicalReducer, initialState)

    const showLoader = () => {
        dispatch({ type: SHOW_LOADER })
    }

    const hideLoader = () => {
        dispatch({ type: HIDE_LOADER })
    }

    const showError = (error) => {
        dispatch({ type: SHOW_ERROR, error })
    }
    const clearError = () => {
        dispatch({ type: CLEAR_ERROR })
    }

    const addMedical = async (name) => {
        const data = await Http.post(
            'https://react-native-9bf1c.firebaseio.com/medicals.json',
            { name }
        )
        dispatch({ type: ADD_MEDICAL, name, id: data.name })
    }

    const fetchMedicals = async () => {
        try {
            showLoader()
            clearError()
            const response = await fetch(
                'https://react-native-9bf1c.firebaseio.com/medicals.json',
                {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' },
                }
            )
            const data = await response.json()
            const medicals = Object.keys(data).map((key) => ({
                ...data[key],
                id: key,
            }))
            dispatch({ type: FETCH_MEDICALS, medicals })
        } catch (e) {
            showError('Что то пошло не так...')
        } finally {
            hideLoader()
        }
    }
    const removeMedical = (id) => {
        const medical = state.medicals.find((m) => m.id === id)
        Alert.alert(
            'Удаление элемента',
            `Вы уверены, что хотите удалить "${medical.name}"?`,
            [
                {
                    text: 'Отмена',
                    style: 'cancel',
                },
                {
                    text: 'Удалить',
                    style: 'destructive',
                    onPress: async () => {
                        changeScreen(null)
                        const data = await Http.delete(
                            `https://react-native-9bf1c.firebaseio.com/medicals/${id}.json`
                        )
                        dispatch({ type: REMOVE_MEDICAL, id })
                    },
                },
            ],
            { cancelable: false }
        )
    }

    const updateMedical = async (id, name, description, alertTime) => {
        const data = await Http.put(
            `https://react-native-9bf1c.firebaseio.com/medicals/${id}.json`,
            { name, description, alertTime }
        )
        dispatch({ type: UPDATE_MEDICAL, id, name, description, alertTime })
    }

    return (
        <MedicalContext.Provider
            value={{
                medicals: state.medicals,
                loading: state.loading,
                error: state.error,
                addMedical,
                removeMedical,
                updateMedical,
                fetchMedicals,
            }}
        >
            {children}
        </MedicalContext.Provider>
    )
}
