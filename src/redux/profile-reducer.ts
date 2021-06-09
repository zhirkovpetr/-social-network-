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
    small: string | null
    large: string | null
}

type contactsType = {
    facebook: string | null
    website: string | null
    vk: string | null
    twitter: string | null
    instagram: string | null
    youtube: string | null
    github: string | null
    mainLink: string | null
}

export type ProfileType = {
    aboutMe: string | null
    contacts: contactsType
    lookingForAJob: boolean
    lookingForAJobDescription: string | null
    fullName: string | null
    userId: number | null
    photos: PhotoType
}

export type ActionsTypes =
    AddPostActionType
    | onKeyPressHandlerActionType
    | setUserProfileActionType
    | setStatusActionType

type AddPostActionType = ReturnType<typeof AddPost>
type onKeyPressHandlerActionType = ReturnType<typeof onKeyPressHandler>
type setUserProfileActionType = ReturnType<typeof setUserProfile>
type setStatusActionType = ReturnType<typeof setStatus>

export type initialStateType = typeof initialState

const ADD_POST = 'ADD-POST';
const ON_KEY_PRESS_HANDLER = 'ON_KEY_PRESS_HANDLER';
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_STATUS = 'SET_STATUS';

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
export const setUserProfile = (profile: ProfileType) => {
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
    status: '',
    posts: [
        {id: v1(), message: 'Hi, how a you?', likesCount: 12},
        {id: v1(), message: "It's my first post.", likesCount: 22}
    ] as Array<postsType>,
    profile: {
        aboutMe: null,
        contacts: {
            facebook: null,
            website: null,
            vk: null,
            twitter: null,
            instagram: null,
            youtube: null,
            github: null,
            mainLink: null
        },
        lookingForAJob: true,
        lookingForAJobDescription: null,
        fullName: null as string | null,
        userId: 1,
        photos: {
            small: null,
            large: null
        }
    } as ProfileType,
    isFetching: false
}

export const profileReducer = (state: initialStateType = initialState, action: ActionsTypes): initialStateType => {
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




