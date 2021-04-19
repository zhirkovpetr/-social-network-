import React from "react";
import MyPosts from "./MyPosts/MyPosts";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import {ActionsTypes, profilePageType} from "../../redux/store";
import s from './Profile.module.css'

type ProfilePropsType={
    profilePage: profilePageType
    dispatch: (action: ActionsTypes)=> void
    messagePost: string
}

const Profile: React.FC<ProfilePropsType> = (props: ProfilePropsType) => {
    return (
        <div><ProfileInfo />
            <MyPosts posts = {props.profilePage.posts} messagePost={props.messagePost} dispatch={props.dispatch} />
        </div>
    )}
export default Profile;