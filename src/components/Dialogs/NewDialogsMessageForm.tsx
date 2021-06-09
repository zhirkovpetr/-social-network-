import s from "./Dialogs.module.css";
import React from "react";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {Textarea} from "../../common/FormsControls/FormsControls";
import {maxLengthCreator, required} from "../../utils/validators/validators";

export type  FormDataType = {
    newMessage: string
}
const maxValue= maxLengthCreator(100)

export const NewDialogsMessageForm = (props: InjectedFormProps<FormDataType>) => {
    return (
        <form onSubmit={props.handleSubmit} className={s.inputButton}>
            <Field placeholder={'Enter your message'} name={'newMessage'} component={Textarea} validate={[ required, maxValue ]}/>
            <button>send</button>
        </form>)
}


export const NewDialogsMessageReduxForm= reduxForm<FormDataType>({form: 'DialogsNewMessage'})(NewDialogsMessageForm)