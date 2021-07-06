import React from "react";
import {MyPostsContainer} from "./MyPosts/MyPostsContainer";
import {ProfileType} from "../../redux/profile-reducer";
import {ProfileInfo} from "./ProfileInfo/ProfileInfo";


export type ProfilePropsType = {
    profile: ProfileType
    status: string
    updateStatusTC: (status: string)=> void
}

export const Profile= React.memo((props: ProfilePropsType ) => {

    return (
        <div>
            <ProfileInfo profile={props.profile} status={props.status} updateStatusTC={props.updateStatusTC}/>
            <MyPostsContainer />
        </div>
    )
})