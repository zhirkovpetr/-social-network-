import React from 'react';
import s from './ProfileInfo.module.css'
import {ProfileType} from "../../../redux/profile-reducer";
import {Preloader} from "../../../common/Preloader/Preloader";
import {ProfileStatusWithHooks} from "./ProfileStatusWithHooks";

type profileInfoPropsType = {
    profile: ProfileType | null
    status: string
    updateStatusTC: (status: string)=> void
}

const ProfileInfo = (props: profileInfoPropsType) => {
    if (!props.profile) {
        return <Preloader/>
    } else
        return <div>
            <div className={s.descriptionBlock}>
                <img alt={'avatars'} src={props.profile.photos.large !== null ? props.profile.photos.large : ''}/>

                <div><ProfileStatusWithHooks status={props.status} updateStatusTC={props.updateStatusTC} /></div>

                <div>Full name: {props.profile.fullName}</div>
                <div>About me: {props.profile.aboutMe}</div>
                <div>Looking for a job: {props.profile.lookingForAJobDescription}</div>
                {/*<div>{props.profile.contacts}</div>*/}
            </div>
        </div>
}
export default ProfileInfo;