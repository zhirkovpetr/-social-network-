import React, {ChangeEvent} from 'react';
import s from './ProfileInfo.module.css'
import userPhoto from '../../../assets/images/user.png'
import {ProfileType} from '../../../redux/profile-reducer';
import {Preloader} from '../../../common/Preloader/Preloader';
import {ProfileStatusWithHooks} from './ProfileStatusWithHooks';

type profileInfoPropsType = {
    profile: null | ProfileType
    status: string
    updateStatusTC: (status: string)=> void
    isOwner: boolean
    savePhotoTC: (formData: File)=> void
}

export const ProfileInfo = React.memo((props: profileInfoPropsType) => {

    const onMainPhotoSelected= (e: ChangeEvent<HTMLInputElement>)=> {
        if(e.target.files?.length){
            props.savePhotoTC(e.target.files[0])
        }
    }
debugger
    if (!props.profile) {
        return <Preloader/>
    } else {
        return <div>
            <div className={s.descriptionBlock}>
                <img alt={'avatars'} src={props.profile.photos ? props.profile.photos.small : userPhoto}/>
                {props.isOwner && <input type={'file'} onChange={onMainPhotoSelected}/>}
                <div><ProfileStatusWithHooks status={props.status} updateStatusTC={props.updateStatusTC}/></div>

                <div>Full name: {props.profile.fullName}</div>
            </div>
        </div>
    }
})