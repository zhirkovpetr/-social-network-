import React, {ChangeEvent} from 'react';
import {AddPostAC, ChangePostAC} from "../../../redux/profile-reducer";
import MyPosts from "./MyPosts";
import StoreContext from '../../../storeContext';

const MyPostsContainer = () => {
    return (
        <StoreContext.Consumer>
            {(store) => {
                let state = store.getState();
                const OnChangePostCallback = (e: ChangeEvent<HTMLTextAreaElement>) => {
                    store.dispatch(ChangePostAC(e.currentTarget.value))
                }
                const AddPost = () => {
                    store.dispatch(AddPostAC(state.profilePage.messageForNewPost.trim()));
                    store.dispatch(ChangePostAC(''))
                }
                const onKeyPressHandler = () => {
                    store.dispatch(AddPostAC(state.profilePage.messageForNewPost.trim()));
                    store.dispatch(ChangePostAC(''))

                }

                return (
                    <MyPosts posts={state.profilePage.posts} ChangePostAC={OnChangePostCallback}
                             AddPostAC={AddPost} onKeyPressHandler={onKeyPressHandler}
                             messagePost={state.profilePage.messageForNewPost}/>
                )
            }
            }
        </StoreContext.Consumer>)
}

export default MyPostsContainer;

