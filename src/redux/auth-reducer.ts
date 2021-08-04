import {ThunkDispatch} from 'redux-thunk';
import {AppStateType, AppThunkType} from './redux-store';
import {authAPI} from '../API/api';
import {stopSubmit} from 'redux-form';

//Const
const SET_USER_DATA = 'SOCIAL_NETWORK/AUTH/SET_USER_DATA';
const TOGGLE_IS_FETCHING = 'SOCIAL_NETWORK/AUTH/TOGGLE_IS_FETCHING';

//State
let initialState= {
    id: 0 as number,
    login: null as string | null,
    email: null as string | null,
    resultCode: 0,
    isFetching: false,
    isAuth: false
}

//Reducer
export const authReducer = (state: InitialStateType = initialState, action: AuthActionsTypes): InitialStateType => {
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

//Action type
type setUserDataActionType = ReturnType<typeof setUserData>
type toggleIsFetchingActionType = ReturnType<typeof toggleIsFetching>
type StopSubmitActionsType = ReturnType<typeof stopSubmit>

export type AuthActionsTypes = setUserDataActionType | toggleIsFetchingActionType

//Action creator
export const setUserData = (id: number, email: string | null, login: string | null, isAuth: boolean) => {
    return {
        type: SET_USER_DATA, payload: {id, email, login, isAuth}
    } as const
}

export const toggleIsFetching = (isFetching: boolean) => {
    return {
        type: TOGGLE_IS_FETCHING, isFetching: isFetching
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

export const loginTC = (email: string, password: string, rememberMe: boolean): AppThunkType => {
    return async (dispatch: ThunkDispatch<AppStateType, unknown, AuthActionsTypes | StopSubmitActionsType>) => {
        const response= await authAPI.login(email, password, rememberMe)
                if (response.data.resultCode === 0) {
                    dispatch(getUserLoginTC())
                } else {
                    let message = response.data.messages.length > 0 ? response.data.messages[0] : 'Email or password is not correct'
                    dispatch(stopSubmit('login', {_error: message}))
                }
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
