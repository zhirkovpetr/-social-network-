import React, {ChangeEvent, useState} from 'react';
import s from './ProfileInfo.module.css'
import userPhoto from '../../../assets/images/user.png'
import {ProfileType} from '../../../redux/profile-reducer';
import {Preloader} from '../../../common/Preloader/Preloader';
import {ProfileStatusWithHooks} from './ProfileStatusWithHooks';
import {ProfileData} from "./ProfileData";
import {ProfileDataReduxForm} from "./ProfileDataForm";

type profileInfoPropsType = {
    profile: null | ProfileType
    status: string
    updateStatusTC: (status: string) => void
    isOwner: boolean
    savePhotoTC: (formData: File) => void
    saveProfileTC: (profile: ProfileType)=> void
}

export const ProfileInfo = React.memo((props: profileInfoPropsType) => {
    const [editMode, setEditMode] = useState(false)

    const onSubmit = (profileForm: ProfileType) => {
        props.saveProfileTC(profileForm)
        setEditMode(false)
    }

    const deactivateEditMode = () => {

    }

    const onMainPhotoSelected = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.length) {
            props.savePhotoTC(e.target.files[0])
        }
    }
    if (!props.profile) {
        return <Preloader/>
    } else {
        return <div>
            <div className={s.descriptionBlock}>
                <img className={s.mainPhoto} alt={'avatars'}
                     src={props.profile.photos.small !== null ? props.profile.photos.small : userPhoto}/>
                {props.isOwner && <input type={'file'} onChange={onMainPhotoSelected}/>}

                <ProfileStatusWithHooks status={props.status} updateStatusTC={props.updateStatusTC}
                                        isOwner={props.isOwner}/>
                {editMode ? <ProfileDataReduxForm profile={props.profile} deactivateEditMode={deactivateEditMode} onSubmit={onSubmit} initialValues={props.profile}/> :
                    <ProfileData profile={props.profile} isOwner={props.isOwner} goToEditMode={setEditMode}/>}
            </div>
        </div>
    }
})
