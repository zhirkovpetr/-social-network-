import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import Post from "./Post/Post";
import s from './MyPosts.module.css';
import {profilePageType} from "./MyPostsContainer";


type MyPostsPropsType = {
    AddPostAC: () => void
    ChangePostAC: (newPost: string) => void
    onKeyPressHandler: () => void
    profilePage: profilePageType

}


const MyPosts: React.FC<MyPostsPropsType> = (props: MyPostsPropsType) => {
    let [error, setError] = useState<string | null>('')

    const OnChangePostCallback = (e: ChangeEvent<HTMLTextAreaElement>) => {
        props.ChangePostAC(e.currentTarget.value)
    }
    const AddPost = () => {
        if (props.profilePage.messageForNewPost.trim() !== ''){
            props.AddPostAC()
        }
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLTextAreaElement>) => {
        setError(null)
        if (e.key === 'Enter') {
            if (props.profilePage.messageForNewPost.trim() !== '') {
                props.onKeyPressHandler()
            } else {
                setError('Title is required!')
            }
        }
    }
    let postsElements = props.profilePage.posts.map(p => <Post key={p.id} message={p.message} likesCount={p.likesCount}/>)
    return <div className={s.postsBlock}><h3>My posts</h3>
        <div>
            <div><textarea className={error ? s.error : ''} onKeyPress={onKeyPressHandler} value={props.profilePage.messageForNewPost}
                           onChange={OnChangePostCallback}/></div>
            <div>
                <button disabled={props.profilePage.messageForNewPost.trim() === ''} onClick={AddPost}>Add post</button>
                {error && <div className={s.errorMessage}>{error}</div>}
            </div>
        </div>
        <div className={s.posts}>
            {postsElements}
        </div>
    </div>
}
export default MyPosts;

