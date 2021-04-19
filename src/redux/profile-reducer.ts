import {v1} from "uuid";
import {ActionsTypes, postsType, profilePageType} from "./store";

const ADD_POST= "ADD-POST";
const CHANGE_POST= "CHANGE-POST";

export const AddPostAC= (postText: string)=> {
    return {
        type: "ADD-POST", postText: postText
    } as const
}

export const ChangePostAC= (newPost: string)=> {
    return {
        type: "CHANGE-POST", newPost: newPost
    } as const
}

let initialState= {
    messageForNewPost: '',
    posts: [
        {id: v1(), message: 'Hi, how a you?', likesCount: 12},
        {id: v1(), message: "It's my first post.", likesCount: 22}
    ]
}

export const profileReducer = (state: profilePageType=initialState, action: ActionsTypes): profilePageType=> {
    switch (action.type) {
        case ADD_POST:
            const newPost: postsType = {id: v1(), message: action.postText, likesCount: 0};
            state.posts.push(newPost);
            return state;
        case CHANGE_POST:
            state.messageForNewPost = action.newPost
            return state;
        default:
            return state
    }
}




