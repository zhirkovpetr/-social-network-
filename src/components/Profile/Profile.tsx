import React from "react";
import MyPosts from "./MyPosts/MyPosts";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import {profilePageType} from "../../redux/state";
import s from './Profile.module.css'

type ProfilePropsType={
    profilePage: profilePageType
    addPostCallback: (post: string)=> void
    messagePost: string
    changePostCallback:(newPost: string)=> void
}

const Profile: React.FC<ProfilePropsType> = (props: ProfilePropsType) => {
    return (
        <div><ProfileInfo />
            <MyPosts posts = {props.profilePage.posts} messagePost={props.messagePost} changePostCallback={props.changePostCallback} addPostCallback={props.addPostCallback}/>
        </div>
    )}
export default Profile;