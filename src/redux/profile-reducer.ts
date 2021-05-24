import {v1} from 'uuid';
import {ThunkAction, ThunkDispatch} from "redux-thunk";
import {AppStateType} from "./redux-store";
import {usersAPI} from "../API/api";

export type postsType = {
    id: string
    message: string
    likesCount: number
}

type PhotoType = {
    small: null | string
    large: null | string
}

type contactsType={
    facebook: null | string
    website: null | string
    vk: null | string
    twitter: null | string
    instagram: null | string
    youtube: null | string
    github: null | string
    mainLink: null | string
}

export type ProfileType={
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
    posts: postsType[]
    messageForNewPost: string
}


const ADD_POST = 'ADD-POST';
const CHANGE_POST = 'CHANGE-POST';
const ON_KEY_PRESS_HANDLER = 'ON_KEY_PRESS_HANDLER';
const SET_USER_PROFILE= 'SET_USER_PROFILE';

export type ActionsTypes = AddPostActionType | ChangePostActionType | onKeyPressHandlerActionType | setUserProfileActionType

type AddPostActionType = ReturnType<typeof AddPost>
type ChangePostActionType = ReturnType<typeof ChangePost>
type onKeyPressHandlerActionType = ReturnType<typeof onKeyPressHandler>
type setUserProfileActionType = ReturnType<typeof setUserProfile>




export const AddPost= () => {
    return {
        type: ADD_POST
    } as const
}

export const ChangePost= (newPost: string) => {
    return {
        type: CHANGE_POST, newPost: newPost
    } as const
}
export const onKeyPressHandler= () => {
    return {
        type: ON_KEY_PRESS_HANDLER
    } as const
}
export const setUserProfile= (profile: ProfileType | null) => {
    return {
        type: SET_USER_PROFILE, profile: profile
    } as const
}

let initialState = {
    profile: null,
    messageForNewPost: '',
    posts: [
        {id: v1(), message: 'Hi, how a you?', likesCount: 12},
        {id: v1(), message: "It's my first post.", likesCount: 22}
    ] as Array<postsType>
}

export const profileReducer = (state: ProfilePageType = initialState, action: ActionsTypes): ProfilePageType => {
    switch (action.type) {
        case ADD_POST: {
            const newPost = state.messageForNewPost;
            return {
                ...state,
                messageForNewPost: '',
                posts: [...state.posts, {id: v1(), message: newPost, likesCount: 0}]
            }
        }
        case CHANGE_POST: {
            return {
                ...state,
                messageForNewPost: action.newPost
            }
        }
        case ON_KEY_PRESS_HANDLER: {
            const newPost = state.messageForNewPost;
            return {
                ...state,
                posts: [...state.posts, {id: v1(), message: newPost, likesCount: 0}],
                messageForNewPost: '',
            }
        }
        case SET_USER_PROFILE: {
            return {
                ...state,
                profile: action.profile
            }
        }
        default:
            return state
    }
}

type ThunkType = ThunkAction<void, AppStateType, unknown, ActionsTypes>

export const getUserPageTC = (userId: number | undefined): ThunkType => {
    return (dispatch: ThunkDispatch<AppStateType, unknown, ActionsTypes>,
            getState: () => AppStateType) => {
        if(!userId){
            userId=2
        }
        usersAPI.getUserPage(userId)
            .then(data => {
                dispatch(setUserProfile(data));
            })
}}




