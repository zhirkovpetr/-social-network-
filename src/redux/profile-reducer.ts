import {v1} from "uuid";
import {ActionsTypes, postsType, rootStateType} from "./state";

/*export const AddPostAC= (postText: string)=> {
    return {
        type: "ADD-POST", postText: postText
    } as const
}

export const ChangePostAC= (newPost: string)=> {
    return {
        type: "CHANGE-POST", newPost: newPost
    } as const
}*/

export const profileReducer = (_state: rootStateType, action: ActionsTypes) => {
    switch (action.type) {
        case "ADD-POST":
            const newPost: postsType = {id: v1(), message: action.postText, likesCount: 0};
            _state.profilePage.posts.push(newPost);
            return _state;
        case "CHANGE-POST":
            _state.profilePage.messageForNewPost = action.newPost
            return _state;
        default:
            return _state
    }

    /*   if (action.type === 'ADD-POST') {
           const newPost: postsType = {id: v1(), message: action.postText, likesCount: 0};
           _state.profilePage.posts.push(newPost);

       } else if (action.type === 'CHANGE-POST') {
           _state.profilePage.messageForNewPost = action.newPost
       }*/
}




