import React from "react";
import s from './../Dialogs.module.css';
import './Message.css';

type messagePropsType={
    message: string
}

const Message=(props:messagePropsType) =>{
    return <div className={s.message}>{props.message}</div>
} /*(`кавычки строковые литералы`)*/


export default Message;