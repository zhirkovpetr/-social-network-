import {ThunkAction, ThunkDispatch} from "redux-thunk";
import {AppStateType} from "./redux-store";
import {getUserLoginTC} from "./auth-reducer";

const SET_INITIALIZED = 'SET_INITIALIZED';

type setInitializedAT = ReturnType<typeof setInitializedAC>

export const setInitializedAC = (isInitialized: boolean) => {
    return {
        type: SET_INITIALIZED, isInitialized
    } as const
}

export type ActionsTypes = setInitializedAT

export type InitialStateType = typeof initialState

export let initialState = {
    isInitialized: false
}

export const appReducer = (state: InitialStateType = initialState, action: ActionsTypes): InitialStateType => {
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


type ThunkType = ThunkAction<void, AppStateType, unknown, ActionsTypes>

export const initializedTC = (): ThunkType => {
    return (dispatch: ThunkDispatch<AppStateType, unknown, ActionsTypes>) => {
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

