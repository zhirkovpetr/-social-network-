import React from "react";
import s from './../Dialogs.module.css';
import {NavLink} from "react-router-dom";

type DialogItemPropsType={
    id: string
    name: string
}

const DialogItem= (props: DialogItemPropsType)=>{
    return <div className={s.dialog +' '+ s.active}>
    <img alt={'images'} src="https://dthezntil550i.cloudfront.net/kg/latest/kg1802132010216500004834729/1280_960/557d644f-12f3-49e1-bb66-23c16400540d.png"/>
    <NavLink to={"/dialogs/"+ props.id} activeClassName={s.activeLink}>{props.name}</NavLink>
        </div>
}

export default DialogItem;