import {
    ADD_MEDICAL,
    UPDATE_MEDICAL,
    REMOVE_MEDICAL,
    SHOW_LOADER,
    HIDE_LOADER,
    CLEAR_ERROR,
    SHOW_ERROR,
    FETCH_MEDICALS,
} from '../types'

const handlers = {
    [ADD_MEDICAL]: (
        state,
        { name, description = 'Добавьте описание', id, alertTime }
    ) => ({
        ...state,
        medicals: [
            ...state.medicals,
            {
                id,
                name,
                description,
                alertTime,
            },
        ],
    }),
    [UPDATE_MEDICAL]: (state, action) => ({
        ...state,
        medicals: state.medicals.map((medical) => {
            if (medical.id === action.id) {
                medical.name = action.name
                medical.description = action.description
                medical.alertTime = action.alertTime
            }
            return medical
        }),
    }),
    [REMOVE_MEDICAL]: (state, { id }) => ({
        ...state,
        medicals: state.medicals.filter((medical) => medical.id !== id),
    }),
    [SHOW_LOADER]: (state) => ({ ...state, loading: true }),
    [HIDE_LOADER]: (state) => ({ ...state, loading: false }),
    [CLEAR_ERROR]: (state) => ({ ...state, error: null }),
    [SHOW_ERROR]: (state, { error }) => ({ ...state, error }),
    [FETCH_MEDICALS]: (state, { medicals }) => ({ ...state, medicals }),
    DEFAULT: (state) => state,
}

export const medicalReducer = (state, action) => {
    const handler = handlers[action.type] || handlers.DEFAULT
    return handler(state, action)
}
