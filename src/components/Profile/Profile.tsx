import React from "react";
import {MyPostsContainer} from "./MyPosts/MyPostsContainer";
import {ProfileInfo} from "./ProfileInfo/ProfileInfo";
import {ProfilePropsType} from "./ProfileContainer";
import {Redirect} from "react-router-dom";


export const Profile = React.memo((props: ProfilePropsType) => {
    if (!props.isAuth){
        return  <Redirect to={'/login'}/>
    }
    return (
        <div>
            <ProfileInfo profile={props.profile}
                         status={props.status}
                         updateStatusTC={props.updateStatusTC}
                         isOwner={props.isOwner}
                         savePhotoTC={props.savePhotoTC}/>
            <MyPostsContainer/>
        </div>
    )
})