import React from 'react';
import {AddPost, ChangePost, ProfilePageType, onKeyPressHandler, postsType} from "../../../redux/profile-reducer";
import {AppStateType} from "../../../redux/redux-store";
import {connect} from "react-redux";
import MyPosts from "./MyPosts";


export type profilePageType = {
    messageForNewPost: string
    posts: Array<postsType>
}

type mapStatePropsType = {
    profilePage: ProfilePageType
}
/*type mapDispatchPropsType = {
    ChangePostAC: (newPost: string) => void
    AddPostAC: () => void
    onKeyPressHandler: () => void
}*/

let mapToStateToProps = (state: AppStateType): mapStatePropsType => {
    return {
        profilePage: state.profilePage
    }
}

/*let mapDispatchToProps = (dispatch: Dispatch): mapDispatchPropsType => {
    return {
        ChangePostAC: (newPost: string) => {
            dispatch(ChangePostAC(newPost))
        },
        AddPostAC: () => {
            dispatch(AddPostAC())
        },
        onKeyPressHandler: ()=> {
           dispatch(AddPostAC());
            dispatch(ChangePostAC(''))
        }
    }
}*/

export const MyPostsContainer = connect(mapToStateToProps, {ChangePost, AddPost, onKeyPressHandler})(MyPosts)

