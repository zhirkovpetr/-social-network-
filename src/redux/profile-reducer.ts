import {v1} from 'uuid';
import {ThunkAction, ThunkDispatch} from "redux-thunk";
import {AppStateType} from "./redux-store";
import {profileAPI} from "../API/api";

export type postsType = {
    id: string
    message: string
    likesCount: number
}

type PhotoType = {
    small: null | string
    large: null | string
}

type contactsType = {
    facebook: null | string
    website: null | string
    vk: null | string
    twitter: null | string
    instagram: null | string
    youtube: null | string
    github: null | string
    mainLink: null | string
}

export type ProfileType = {
    aboutMe: string
    contacts: contactsType
    lookingForAJob: boolean
    lookingForAJobDescription: string
    fullName: string
    userId: number
    photos: PhotoType
}

export type ProfilePageType = {
    profile: ProfileType | null
    status: string
    posts: postsType[]
}


const ADD_POST = 'ADD-POST';
const ON_KEY_PRESS_HANDLER = 'ON_KEY_PRESS_HANDLER';
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_STATUS = 'SET_STATUS';

export type ActionsTypes =
    AddPostActionType
    | onKeyPressHandlerActionType
    | setUserProfileActionType
    | setStatusActionType

type AddPostActionType = ReturnType<typeof AddPost>
type onKeyPressHandlerActionType = ReturnType<typeof onKeyPressHandler>
type setUserProfileActionType = ReturnType<typeof setUserProfile>
type setStatusActionType = ReturnType<typeof setStatus>


export const AddPost = (newPost: string) => {
    return {
        type: ADD_POST, newPost
    } as const
}

export const onKeyPressHandler = (newPost: string) => {
    return {
        type: ON_KEY_PRESS_HANDLER, newPost: newPost
    } as const
}
export const setUserProfile = (profile: ProfileType | null) => {
    return {
        type: SET_USER_PROFILE, profile: profile
    } as const
}

export const setStatus = (status: string) => {
    return {
        type: SET_STATUS, status
    } as const
}

let initialState = {
    profile: null,
    status: '',
    posts: [
        {id: v1(), message: 'Hi, how a you?', likesCount: 12},
        {id: v1(), message: "It's my first post.", likesCount: 22}
    ] as Array<postsType>
}

export const profileReducer = (state: ProfilePageType = initialState, action: ActionsTypes): ProfilePageType => {
    switch (action.type) {
        case ADD_POST: {
            const newPost = action.newPost;
            return {
                ...state,
                posts: [...state.posts, {id: v1(), message: newPost, likesCount: 0}]
            }
        }
        case ON_KEY_PRESS_HANDLER: {
            const newPost = action.newPost;
            return {
                ...state,
                posts: [...state.posts, {id: v1(), message: newPost, likesCount: 0}],
            }
        }
        case SET_USER_PROFILE: {
            return {
                ...state,
                profile: action.profile
            }
        }
        case SET_STATUS: {
            return {
                ...state,
                status: action.status
            }
        }
        default:
            return state
    }
}

type ThunkType = ThunkAction<void, AppStateType, unknown, ActionsTypes>

export const getUserPageTC = (userId: number): ThunkType => {
    return (dispatch: ThunkDispatch<AppStateType, unknown, ActionsTypes>,
            getState: () => AppStateType) => {
        profileAPI.getProfilePage(userId)
            .then(data => {
                dispatch(setUserProfile(data));
            })
    }
}

export const getStatusTC = (userId: number): ThunkType => {
    return (dispatch: ThunkDispatch<AppStateType, unknown, ActionsTypes>,
            getState: () => AppStateType) => {
        profileAPI.getStatus(userId)
            .then(data => {
                dispatch(setStatus(data));
            })
    }
}

export const updateStatusTC = (status: string): ThunkType => {
    return (dispatch: ThunkDispatch<AppStateType, unknown, ActionsTypes>,
            getState: () => AppStateType) => {
        profileAPI.updateStatus(status)
            .then(data => {
                if (data.resultCode === 0) {
                    dispatch(setStatus(status));
                }
            })
    }
}




