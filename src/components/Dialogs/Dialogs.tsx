import React from "react";
import s from './Dialogs.module.css';
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import {dialogsPageType} from "./DialogsContainer";
import {FormDataType, NewDialogsMessageReduxForm} from "./NewDialogsMessageForm";

type DialogsPropsType = {
    dialogsPage: dialogsPageType
    isAuth: boolean
    AddMessage: (newMessage: string) => void
}

const Dialogs: React.FC<DialogsPropsType> = (props) => {


    const AddMessage = (message: FormDataType) => {
        props.AddMessage(message.newMessage)
        message.newMessage= ''
    }

    let dialogsElements = props.dialogsPage.dialogs.map((d) =>
        <DialogItem id={d.id} name={d.name}/>);

    let messagesElements = props.dialogsPage.messages.map(function (m, index) {
        return (
            <Message message={m.message} key={index}/>
        )
    });

    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                {dialogsElements}
            </div>
            <div className={s.messages}>
                {messagesElements}
                <NewDialogsMessageReduxForm onSubmit={AddMessage}/>
            </div>
        </div>
    )
}

export default Dialogs;

