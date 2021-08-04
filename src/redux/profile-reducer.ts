import {v1} from 'uuid';
import {ThunkDispatch} from 'redux-thunk';
import {AppStateType, AppThunkType} from './redux-store';
import {profileAPI} from '../API/api';
import {stopSubmit} from "redux-form";

//Const
const ADD_POST = 'SOCIAL_NETWORK/PROFILE/ADD-POST';
const ON_KEY_PRESS_HANDLER = 'SOCIAL_NETWORK/PROFILE/ON_KEY_PRESS_HANDLER';
const SET_USER_PROFILE = 'SOCIAL_NETWORK/PROFILE/SET_USER_PROFILE';
const SET_STATUS = 'SOCIAL_NETWORK/PROFILE/SET_STATUS';
const REMOVE_POST = 'SOCIAL_NETWORK/PROFILE/REMOVE_POST';
const SAVE_PHOTO_SUCCESS = 'SOCIAL_NETWORK/PROFILE/SAVE_PHOTO_SUCCESS';
const SAVE_PROFILE = 'SAVE_PROFILE';

//State
let initialState = {
    status: '',
    posts: [
        {id: v1(), message: 'Hi, how a you?', likesCount: 12},
        {id: v1(), message: "It's my first post.", likesCount: 22}
    ] as Array<postsType>,
    profile: null as ProfileType | null,
    isFetching: false
}

//Reducer
export const profileReducer = (state: initialStateType = initialState, action: ProfileActionsTypes): initialStateType => {
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
            debugger
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
        case REMOVE_POST: {
            return {
                ...state,
                posts: state.posts.filter(p => p.id !== action.postId)
            }
        }
        case SAVE_PHOTO_SUCCESS: {
            return state.profile !== null
                ? {...state, profile: {...state.profile, photos: {...state.profile.photos, small: action.photo}}}
                : {...state}
        }
        default:
            return state
    }
}

//Action type
type AddPostActionType = ReturnType<typeof AddPost>
type onKeyPressHandlerActionType = ReturnType<typeof onKeyPressHandler>
type setUserProfileActionType = ReturnType<typeof setUserProfile>
type setStatusActionType = ReturnType<typeof setStatus>
type removePostActionType = ReturnType<typeof removePost>
type savePhotoSuccessActionType = ReturnType<typeof savePhotoSuccess>

export type ProfileActionsTypes =
    AddPostActionType
    | onKeyPressHandlerActionType
    | setUserProfileActionType
    | setStatusActionType
    | removePostActionType
    | savePhotoSuccessActionType

type StopSubmitActionsType = ReturnType<typeof stopSubmit>

//Action creator
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

export const removePost = (postId: string) => {
    return {
        type: REMOVE_POST, postId
    } as const
}


export const savePhotoSuccess = (photo: string) => {
    return {
        type: SAVE_PHOTO_SUCCESS, photo
    } as const
}

export const saveProfile = (profile: ProfileType) => {
    return {
        type: SAVE_PROFILE, profile
    } as const
}

//Thunk creator
export const getUserPageTC = (userId: string): AppThunkType => {
    return async (dispatch: ThunkDispatch<AppStateType, unknown, ProfileActionsTypes>) => {
        const response = await profileAPI.getProfilePage(userId)
        dispatch(setUserProfile(response.data));
    }
}

export const getStatusTC = (userId: string): AppThunkType => {
    return async (dispatch: ThunkDispatch<AppStateType, unknown, ProfileActionsTypes>) => {
        const response = await profileAPI.getStatus(userId)
        dispatch(setStatus(response.data));
    }
}

export const updateStatusTC = (status: string): AppThunkType => {
    return async (dispatch: ThunkDispatch<AppStateType, unknown, ProfileActionsTypes>) => {
        const response = await profileAPI.updateStatus(status)
        if (response.data.resultCode === 0) {
            dispatch(setStatus(status));
        }
    }
}

export const savePhotoTC = (image: File): AppThunkType => async (dispatch) => {
    const response = await profileAPI.savePhoto(image)
    if (response.data.resultCode === 0) {
        dispatch(savePhotoSuccess(response.data.data.photos.small))
    }
}

export const saveProfileTC = (profile: ProfileType): AppThunkType => async (dispatch: ThunkDispatch<AppStateType, unknown, ProfileActionsTypes | StopSubmitActionsType>, getState ) => {
    const userId = getState().auth.id
    debugger
    const response = await profileAPI.saveProfile(profile)
    if (response.data.resultCode === 0) {
        dispatch(getUserPageTC(userId.toString()))
    } else {
        dispatch(stopSubmit('edit-profile', {_error: response.data.messages[0]}))
    }
}

//Type
export type initialStateType = typeof initialState


export type postsType = {
    id: string
    message: string
    likesCount: number
}

export type PhotoType = {
    small: string
    large: string
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
    aboutMe: string
    contacts: contactsType
    lookingForAJob: boolean
    lookingForAJobDescription: string
    fullName: string
    userId: string
    photos: PhotoType
}




