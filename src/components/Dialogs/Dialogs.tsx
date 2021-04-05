import React, {ChangeEvent} from "react";
import s from './Dialogs.module.css';
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import {dialogsPageType} from "../../redux/state";


type DialogsPropsType = {
    dialogsPage: dialogsPageType
    addMessageCallback: (message: string) => void
    changeMessageCallback: (newMessage: string) => void
    messageMessage: string
}

const Dialogs: React.FC<DialogsPropsType> = (props) => {
    const OnChangeMessageCallback= (e: ChangeEvent<HTMLTextAreaElement>) => {
        props.changeMessageCallback(e.currentTarget.value)
    }
    const AddMessage = () => {
        props.addMessageCallback(props.messageMessage);
    }
    let dialogsElements = props.dialogsPage.dialogs.map((d) =>
        <DialogItem id={d.id} name={d.name}/>);
    let messagesElements = props.dialogsPage.messages.map(function (m, index) {
        return (
            <Message message={m.message}/>
        )
    });
    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                {dialogsElements}
            </div>
            <div className={s.messages}>
                {messagesElements}
                <div className={s.inputButton}>
                    <textarea value={props.messageMessage} onChange={OnChangeMessageCallback}/>
                    <button onClick={AddMessage}>send</button>
                </div>
            </div>
        </div>
    )
}

export default Dialogs;