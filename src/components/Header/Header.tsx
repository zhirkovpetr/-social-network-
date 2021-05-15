import React from 'react';
import {NavLink} from 'react-router-dom';
import s from './Header.module.css';
import {Preloader} from "../../common/Preloader/Preloader";

type HeaderPropsType = {
    id: number | null,
    email: string | null,
    login: string | null,
    isFetching: boolean
    isAuth: boolean
}

const Header = (props: HeaderPropsType) => {

    return <header className={s.header}>
        <img alt={'logo'} src='https://cdn.logo.com/hotlink-ok/logo-social.png'/>

        <div className={s.loginBlock}>
            {props.isFetching ? <Preloader/> : null}
            {props.isAuth ? props.login : <NavLink to={'/login'}> LOGIN </NavLink>}
        </div>
    </header>;
}
export default Header;