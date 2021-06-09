import {ThunkAction, ThunkDispatch} from "redux-thunk";
import {AppStateType} from "./redux-store";
import {authAPI} from "../API/api";

export type AuthPageType = {
    id: number | null,
    email: string | null,
    login: string | null,
    isFetching: boolean,
    isAuth: boolean,
}

const SET_USER_DATA = 'SET_USER_DATA';
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';

export const setUserData = (id:  number | null, email: string | null, login: string | null, isAuth: boolean) => {
    return {
        type: SET_USER_DATA, data: {id, email, login, isAuth}
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

export let initialState = {
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
                ...action.data
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
    return (dispatch: ThunkDispatch<AppStateType, unknown, ActionsTypes>,
            getState: () => AppStateType) => {
        dispatch(toggleIsFetching(true))
        authAPI.me()
            .then(data => {
                if(data.resultCode === 0) {
                    let {id, login, email}= data.data
                    dispatch(setUserData(id, email, login, true))
                }
                dispatch(toggleIsFetching(false))
            })
    }
}

export const loginTC = (email: string, password: string, rememberMe: boolean): ThunkType => {
    return (dispatch: ThunkDispatch<AppStateType, unknown, ActionsTypes>,
            getState: () => AppStateType) => {
        authAPI.login(email,password, rememberMe)
            .then(data => {
                if(data.resultCode === 0) {
                    dispatch(getUserLoginTC())
                }
            })
    }
}

export const logoutTC = (): ThunkType => {
    return (dispatch: ThunkDispatch<AppStateType, unknown, ActionsTypes>,
            getState: () => AppStateType) => {
        authAPI.logout()
            .then(data => {
                if(data.resultCode === 0) {
                    dispatch(setUserData(null, null, null, false))
                }
            })
    }
}