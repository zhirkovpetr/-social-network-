import React from "react";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPostsContainer from "./MyPosts/MyPostsContainer";
import {storeType} from "../../redux/redux-store";

type ProfilePropsType = {
    store: storeType

}

const Profile: React.FC<ProfilePropsType> = (props: ProfilePropsType) => {
    return (
        <div><ProfileInfo/>
            <MyPostsContainer store={props.store} />
        </div>
    )
}
export default Profile;