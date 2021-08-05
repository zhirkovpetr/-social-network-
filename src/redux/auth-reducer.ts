import {ThunkDispatch} from 'redux-thunk';
import {AppStateType, AppThunkType} from './redux-store';
import {authAPI, securityAPI} from '../API/api';
import {stopSubmit} from 'redux-form';

//Const
const SET_USER_DATA = 'SOCIAL_NETWORK/AUTH/SET_USER_DATA';
const TOGGLE_IS_FETCHING = 'SOCIAL_NETWORK/AUTH/TOGGLE_IS_FETCHING';
const GET_CAPTCHA_URL_SUCCESS = 'GET_CAPTCHA_URL_SUCCESS';

//State
let initialState= {
    id: 0 as number,
    login: null as string | null,
    email: null as string | null,
    resultCode: 0,
    isFetching: false,
    isAuth: false,
    captchaUrl: null as string | null
}

//Reducer
export const authReducer = (state: InitialStateType = initialState, action: AuthActionsTypes): InitialStateType => {
    switch (action.type) {
        case SET_USER_DATA:
        case TOGGLE_IS_FETCHING:
        case GET_CAPTCHA_URL_SUCCESS:
            return {
                ...state,
                ...action.payload
            }
        default:
            return state;
    }
}

//Action type
type setUserDataActionType = ReturnType<typeof setUserData>
type toggleIsFetchingActionType = ReturnType<typeof toggleIsFetching>
type StopSubmitActionsType = ReturnType<typeof stopSubmit>
type getCaptchaUrlSuccessActionsType = ReturnType<typeof getCaptchaUrlSuccess>

export type AuthActionsTypes = setUserDataActionType | toggleIsFetchingActionType | getCaptchaUrlSuccessActionsType

//Action creator
export const setUserData = (id: number, email: string | null, login: string | null, isAuth: boolean) => {
    return {
        type: SET_USER_DATA, payload: {id, email, login, isAuth}
    } as const
}

export const toggleIsFetching = (isFetching: boolean) => {
    return {
        type: TOGGLE_IS_FETCHING, payload: {isFetching}
    } as const
}

export const getCaptchaUrlSuccess = (captchaUrl: string | null) => {
    return {
        type: GET_CAPTCHA_URL_SUCCESS, payload: {captchaUrl}
    } as const
}

//Thunk creator
export const getUserLoginTC = (): AppThunkType => {
    return async (dispatch: ThunkDispatch<AppStateType, unknown, AuthActionsTypes>) => {
        dispatch(toggleIsFetching(true))
        const response= await authAPI.me()
                if (response.data.resultCode === 0) {
                    let {id, login, email} = response.data.data
                    dispatch(setUserData(id, email, login, true))
                }
                dispatch(toggleIsFetching(false))
    }
}

export const loginTC = (email: string, password: string, rememberMe: boolean, captcha: string): AppThunkType => {
    return async (dispatch: ThunkDispatch<AppStateType, unknown, AuthActionsTypes | StopSubmitActionsType>) => {
        const response= await authAPI.login(email, password, rememberMe, captcha)
                if (response.data.resultCode === 0) {
                    dispatch(getUserLoginTC())
                } else if (response.data.resultCode === 10) {
                    dispatch(getCaptchaUrlTC())
                } else {
                    let message = response.data.messages.length > 0 ? response.data.messages[0] : 'Email or password is not correct'
                    dispatch(stopSubmit('login', {_error: message}))
                }
    }
}

export const getCaptchaUrlTC = (): AppThunkType => {
    return async (dispatch: ThunkDispatch<AppStateType, unknown, AuthActionsTypes>) => {
        const response= await securityAPI.getCaptchaUrl()
        const captchaUrl= response.data.url
        dispatch(getCaptchaUrlSuccess(captchaUrl))

    }
}

export const logoutTC = (): AppThunkType => {
    return async (dispatch: ThunkDispatch<AppStateType, unknown, AuthActionsTypes>) => {
        const response= await authAPI.logout()
                if (response.data.resultCode === 0) {
                    dispatch(setUserData(0, null, null, false))
                }
    }
}

//Type
export type InitialStateType = typeof initialState
