import {ThunkAction, ThunkDispatch} from "redux-thunk";
import {AppStateType} from "./redux-store";
import {authAPI} from "../API/api";
import {stopSubmit} from "redux-form";

export type AuthPageType = {
    resultCode: number
    messages: []
    id: null | number
    email: null | string
    login: null | string
    isFetching: boolean
    isAuth: boolean
}

type StopSubmitActionsType = ReturnType<typeof stopSubmit>

const SET_USER_DATA = 'SET_USER_DATA';
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';

export const setUserData = (id: number | null, email: string | null, login: string | null, isAuth: boolean) => {
    return {
        type: SET_USER_DATA, payload: {id, email, login, isAuth}
    } as const
}

export const toggleIsFetching = (isFetching: boolean) => {
    return {
        type: TOGGLE_IS_FETCHING, isFetching: isFetching
    } as const
}

type setUserDataActionType = ReturnType<typeof setUserData>
type toggleIsFetchingActionType = ReturnType<typeof toggleIsFetching>

export type ActionsTypes = setUserDataActionType | toggleIsFetchingActionType

export type InitialStateType = typeof initialState

let initialState: AuthPageType = {
    resultCode: 0,
    messages: [],
    id: null,
    email: null,
    login: null,
    isFetching: false,
    isAuth: false
}

export const authReducer = (state: AuthPageType = initialState, action: ActionsTypes): AuthPageType => {
    switch (action.type) {
        case SET_USER_DATA:
            return {
                ...state,
                ...action.payload
            }
        case TOGGLE_IS_FETCHING:
            return {
                ...state, isFetching: action.isFetching
            }
        default:
            return state;
    }
}


type ThunkType = ThunkAction<void, AppStateType, unknown, ActionsTypes>

export const getUserLoginTC = (): ThunkType => {
    return (dispatch: ThunkDispatch<AppStateType, unknown, ActionsTypes>) => {
        dispatch(toggleIsFetching(true))
        return authAPI.me()
            .then(data => {
                if (data.resultCode === 0) {
                    let {id, login, email} = data.data
                    dispatch(setUserData(id, email, login, true))
                }
                dispatch(toggleIsFetching(false))
            })
    }
}

export const loginTC = (email: string | null, password: string | null, rememberMe: boolean): ThunkType => {

    return (dispatch: ThunkDispatch<AppStateType, unknown, ActionsTypes | StopSubmitActionsType>) => {
        authAPI.login(email, password, rememberMe)
            .then(data => {
                if (data.resultCode === 0) {
                    dispatch(getUserLoginTC())
                } else {
                    let message = data.messages.length > 0 ? data.messages[0] : 'Email or password is not correct'
                    dispatch(stopSubmit('login', {_error: message}))
                }
            })
    }
}

export const logoutTC = (): ThunkType => {
    return (dispatch: ThunkDispatch<AppStateType, unknown, ActionsTypes>) => {
        authAPI.logout()
            .then(data => {
                if (data.resultCode === 0) {
                    dispatch(setUserData(null, null, null, false))
                }
            })
    }
}