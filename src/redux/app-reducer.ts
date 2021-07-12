import {ThunkDispatch} from 'redux-thunk';
import {AppStateType, AppThunkType} from './redux-store';
import {getUserLoginTC} from './auth-reducer';

//Const
const SET_INITIALIZED = 'SOCIAL_NETWORK/APP/SET_INITIALIZED';

//State
export let initialState = {
    isInitialized: false
}

//Reducer
export const appReducer = (state: InitialStateType = initialState, action: AppActionsTypes): InitialStateType => {
    switch (action.type) {
        case SET_INITIALIZED:
            return {
                ...state,
                isInitialized: action.isInitialized
            }
        default:
            return state;
    }
}

//Action type
type setInitializedAT = ReturnType<typeof setInitializedAC>

export type AppActionsTypes = setInitializedAT

//Action creator
export const setInitializedAC = (isInitialized: boolean) => {
    return {
        type: SET_INITIALIZED, isInitialized
    } as const
}

//Thunk creator
export const initializedTC = (): AppThunkType => {
    return (dispatch: ThunkDispatch<AppStateType, unknown, AppActionsTypes>) => {
        let promise = dispatch(getUserLoginTC())
        Promise.all([promise])
            .then(() => {
                dispatch(setInitializedAC(true))
            })
            .catch(error => {
                console.warn(error)
            })
    }
}

//Type
export type InitialStateType = typeof initialState
