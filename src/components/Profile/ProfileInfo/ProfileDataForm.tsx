import React from 'react';
import {ProfileType} from '../../../redux/profile-reducer';
import {Field, Form, InjectedFormProps, reduxForm} from "redux-form";
import {Input, Textarea} from "../../../common/FormsControls/FormsControls";

export type ProfileDataFormPropsType = {
    profile: ProfileType
    deactivateEditMode: () => void
}


export const ProfileDataForm = React.memo((props: InjectedFormProps<ProfileType, ProfileDataFormPropsType> & ProfileDataFormPropsType) => {
    return (
        <Form onSubmit={props.handleSubmit}>
            <div><button onClick={() => {}}>Save</button></div>
            <div>
                <b>Full name:</b> <Field type={"text"} placeholder={'Full name'} name={'fullName'} component={Input} />
            </div>
            <div>
                <b>Looking for a job:</b> <Field type={"checkbox"} name={'lookingForAJob'} component={Input} />
            </div>
            <div>
                <b>My skills:</b> <Field type={"text"} name={'lookingForAJobDescription'} component={Textarea} />
            </div>
            <div>
                <b>About me:</b> <Field type={"text"} name={'aboutMe'} component={Textarea} />
            </div>
            {/*<div>
                <b>Contacts:</b> {Object.entries(props.profile.contacts).map(([key, value]) => {
                return <Contact key={key} contactName={key} contactValue={value}/>
            })}
            </div>*/}
        </Form>
    )
})

export const ProfileDataReduxForm = reduxForm<ProfileType, ProfileDataFormPropsType>({form: 'edit-profile'})(ProfileDataForm)
