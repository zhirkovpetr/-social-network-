import React from "react";
import s from './../Dialogs.module.css';
import './Message.css';

type messagePropsType={
    message: string
}

export const Message=React.memo((props:messagePropsType) =>{
    return <div className={s.message}>{props.message}</div>
})


