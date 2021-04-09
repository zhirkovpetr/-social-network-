import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import Post from "./Post/Post";
import s from './MyPosts.module.css';
import {ActionsTypes, AddPostAC, ChangePostAC, postsType} from "../../../redux/state";
import {type} from "os";

type MyPostsPropsType = {
    posts: Array<postsType>
    dispatch: (action: ActionsTypes) => void
    messagePost: string

}


const MyPosts: React.FC<MyPostsPropsType> = (props: MyPostsPropsType) => {
    let [error, setError]= useState<string | null>('')
    const OnChangePostCallback= (e: ChangeEvent<HTMLTextAreaElement>) => {
        props.dispatch(ChangePostAC(e.currentTarget.value))
    }
    const AddPost = () => {
        if (props.messagePost.trim() !== '') {
            props.dispatch(AddPostAC(props.messagePost.trim()));
            props.dispatch(ChangePostAC(''))
        } else {
            setError('Title is required!')
        }
        }

    const onKeyPressHandler=(e: KeyboardEvent<HTMLTextAreaElement>)=> {
        setError(null)
        if(e.key === 'Enter'){
            if (props.messagePost.trim() !== '') {
                props.dispatch(AddPostAC(props.messagePost.trim()));
                props.dispatch(ChangePostAC(''))
            }else {
                setError('Title is required!')
            }
        }
    }
        let postsElements = props.posts.map(p => <Post key={p.id} message={p.message} likesCount={p.likesCount}/>)
        return <div className={s.postsBlock}><h3>My posts</h3>
            <div>
                <div><textarea className={error ? s.error : ''} onKeyPress={onKeyPressHandler} value={props.messagePost} onChange={OnChangePostCallback}/></div>
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

