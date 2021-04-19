import React, {ChangeEvent} from 'react';
import {AddPostAC, ChangePostAC} from "../../../redux/profile-reducer";
import MyPosts from "./MyPosts";
import {storeType} from "../../../redux/redux-store";


type MyPostsContainerPropsType = {
    store: storeType
}

const MyPostsContainer= (props: MyPostsContainerPropsType) => {
    let state= props.store.getState();

    const OnChangePostCallback = (e: ChangeEvent<HTMLTextAreaElement>) => {
        props.store.dispatch(ChangePostAC(e.currentTarget.value))
    }
    const AddPost = () => {
            props.store.dispatch(AddPostAC(state.profilePage.messageForNewPost.trim()));
            props.store.dispatch(ChangePostAC(''))
    }

    const onKeyPressHandler = () => {
        props.store.dispatch(AddPostAC(state.profilePage.messageForNewPost.trim()));
        props.store.dispatch(ChangePostAC(''))

    }

return (<MyPosts posts={state.profilePage.posts} ChangePostAC={OnChangePostCallback}
                 AddPostAC={AddPost} onKeyPressHandler={onKeyPressHandler}
                 messagePost={state.profilePage.messageForNewPost}/>)
}

export default MyPostsContainer;

