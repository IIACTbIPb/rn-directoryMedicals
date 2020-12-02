import React, { useReducer } from 'react'
import { ScreenContext } from './screenContext'
import { screenReduce } from './screenReducer'
import { CHANGE_SCREEN } from '../types'

export const ScreenState = ({ children }) => {
    const [state, dispatch] = useReducer(screenReduce, null)

    const changeScreen = (id) => {
        dispatch({ type: CHANGE_SCREEN, payload: id })
    }
    return (
        <ScreenContext.Provider value={{ changeScreen, medicalId: state }}>
            {children}
        </ScreenContext.Provider>
    )
}
