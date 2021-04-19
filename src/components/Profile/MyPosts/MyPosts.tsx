import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import Post from "./Post/Post";
import s from './MyPosts.module.css';
import {postsType} from "../../../redux/store";


type MyPostsPropsType = {
    AddPostAC: () => void
    ChangePostAC: (e: ChangeEvent<HTMLTextAreaElement>) => void
    onKeyPressHandler: () => void
    posts: Array<postsType>
    messagePost: string
}


const MyPosts: React.FC<MyPostsPropsType> = (props: MyPostsPropsType) => {
    let [error, setError] = useState<string | null>('')

    const OnChangePostCallback = (e: ChangeEvent<HTMLTextAreaElement>) => {
        props.ChangePostAC(e)
    }
    const AddPost = () => {
        if (props.messagePost.trim() !== ''){
            props.AddPostAC()
        }
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLTextAreaElement>) => {
        setError(null)
        if (e.key === 'Enter') {
            if (props.messagePost.trim() !== '') {
                props.onKeyPressHandler()
            } else {
                setError('Title is required!')
            }
        }
    }
    let postsElements = props.posts.map(p => <Post key={p.id} message={p.message} likesCount={p.likesCount}/>)
    return <div className={s.postsBlock}><h3>My posts</h3>
        <div>
            <div><textarea className={error ? s.error : ''} onKeyPress={onKeyPressHandler} value={props.messagePost}
                           onChange={OnChangePostCallback}/></div>
            <div>
                <button disabled={props.messagePost.trim() === ''} onClick={AddPost}>Add post</button>
                {error && <div className={s.errorMessage}>{error}</div>}
            </div>
        </div>
        <div className={s.posts}>
            {postsElements}
        </div>
    </div>
}
export default MyPosts;

