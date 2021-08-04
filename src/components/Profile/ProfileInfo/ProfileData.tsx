import React from 'react';
import s from './ProfileInfo.module.css'
import {ProfileType} from '../../../redux/profile-reducer';

type ProfileDataPropsType = {
    profile: ProfileType
    isOwner: boolean
    goToEditMode: (editMode: boolean) => void
}

export const ProfileData = React.memo((props: ProfileDataPropsType) => {

    return (
        <div className={s.descriptionBlock}>
        {props.isOwner && <div>
            <button onClick={() => props.goToEditMode(true)}>Edit</button>
        </div>}
        <div>
            <b>Full name:</b> {props.profile.fullName}
        </div>
        <div>
            <b>Looking for a job:</b> {props.profile.lookingForAJob ? 'Yes' : 'No'}
        </div>
        {props.profile.lookingForAJob &&
        <div>
            <b>My skills:</b> {props.profile.lookingForAJobDescription}
        </div>}
        <div>
            <b>About me:</b> {props.profile.aboutMe}
        </div>
        <div>
            <b>Contacts:</b> {Object.entries(props.profile.contacts).map(([key, value]) => {
            return <Contact key={key} contactName={key} contactValue={value}/>
        })}
        </div>
    </div>)
})

type ContactPropsType = {
    contactName: string
    contactValue: string | null
}

export const Contact = (props: ContactPropsType) => {
    return (
        <div className={s.contactForm}>
            <b>{props.contactName}:</b> {props.contactValue}
        </div>
    )
}