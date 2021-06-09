import React from 'react';
import Post from "./Post/Post";
import s from './MyPosts.module.css';
import {profilePageType} from "./MyPostsContainer";
import {FormDataType, MyPostsReduxForm} from "./MyPostsForm";



type MyPostsPropsType = {
    AddPost: (newPost: string) => void
   onKeyPressHandler: (newPost: string) => void
    profilePage: profilePageType
}


const MyPosts: React.FC<MyPostsPropsType> = (props: MyPostsPropsType) => {

    let postsElements = props.profilePage.posts.map(p => <Post key={p.id} message={p.message}
                                                               likesCount={p.likesCount}/>)

    const onKeyPressHandler = (post: FormDataType) => {
        props.onKeyPressHandler(post.newPost)
        post.newPost=''
    }

    const onAddPost = (post: FormDataType) => {
        props.AddPost(post.newPost)
        post.newPost=''
    }

    return <div className={s.postsBlock}>
        <h3>My posts</h3>
        <MyPostsReduxForm onSubmit={onAddPost} />
        <div className={s.posts}>
            {postsElements}
        </div>
    </div>
}
export default MyPosts;



