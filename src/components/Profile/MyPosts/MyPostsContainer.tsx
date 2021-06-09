import React from 'react';
import {AddPost, initialStateType, onKeyPressHandler, postsType} from "../../../redux/profile-reducer";
import {AppStateType} from "../../../redux/redux-store";
import {connect} from "react-redux";
import MyPosts from "./MyPosts";


export type profilePageType = {
    posts: Array<postsType>
}

type mapStatePropsType = {
    profilePage: initialStateType
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

export const MyPostsContainer = connect(mapToStateToProps, {AddPost, onKeyPressHandler})(MyPosts)

