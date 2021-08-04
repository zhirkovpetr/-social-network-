import React from 'react';
import {ProfileType} from '../../../redux/profile-reducer';
import {Field, Form, InjectedFormProps, reduxForm} from "redux-form";
import {Input, Textarea} from "../../../common/FormsControls/FormsControls";
import s from "../../../common/FormsControls/FormsControls.module.css";

export type ProfileDataFormPropsType = {
    profile: ProfileType
    deactivateEditMode: (editMode: boolean) => void
}


export const ProfileDataForm: React.FC<InjectedFormProps<ProfileType, ProfileDataFormPropsType> & ProfileDataFormPropsType> = ({handleSubmit, error, profile})=> {
    return (
        <Form onSubmit={handleSubmit}>
            <div><button onClick={() => {}}>Save</button></div>
            {
                error &&
                <div className={s.formSummaryError}>
                    {error}
                </div>
            }
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
            <div>
                <b>Contacts:</b> {Object.entries(profile.contacts).map(([key]) => {
                return <div key={key}>
                    <b> {key}: </b> <Field type={"text"} placeholder={key} name={'contacts.' + key} component={Input}/>
                </div>
            })}
            </div>

        </Form>
    )
}

export const ProfileDataReduxForm = reduxForm<ProfileType, ProfileDataFormPropsType>({form: 'edit-profile'})(ProfileDataForm)
