import {v1} from "uuid";
import {ActionsTypes} from "./store";


export type postsType = {
    id: string
    message: string
    likesCount: number
}

export type InitialStateType = typeof initialState;


const ADD_POST = "ADD-POST";
const CHANGE_POST = "CHANGE-POST";

export const AddPostAC = () => {
    return {
        type: "ADD-POST"
    } as const
}

export const ChangePostAC = (newPost: string) => {
    return {
        type: "CHANGE-POST", newPost: newPost
    } as const
}

let initialState = {
    messageForNewPost: '',
    posts: [
        {id: v1(), message: 'Hi, how a you?', likesCount: 12},
        {id: v1(), message: "It's my first post.", likesCount: 22}
    ] as Array<postsType>
}

export const profileReducer = (state: InitialStateType = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case ADD_POST:
            const newPost = state.messageForNewPost;
            return {
                ...state,
                messageForNewPost: '',
                posts: [...state.posts, {id: v1(), message: newPost, likesCount: 0}]
            }
        case CHANGE_POST:
            return {
                ...state,
                messageForNewPost: action.newPost
            }
        default:
            return state
    }
}




