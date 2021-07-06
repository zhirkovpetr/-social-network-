import React from 'react';
import {NavLink} from 'react-router-dom';
import s from './Header.module.css';
import {Preloader} from "../../common/Preloader/Preloader";

type HeaderPropsType = {
    login: string | null,
    isFetching: boolean
    isAuth: boolean
    logoutTC: ()=> void
}

const Header = React.memo((props: HeaderPropsType) => {

    return <header className={s.header}>
        <img alt={'logo'} src='https://cdn.logo.com/hotlink-ok/logo-social.png'/>

        <div className={s.loginBlock}>
            {props.isFetching ? <Preloader/> : null}
            {props.isAuth ?
                <div> {props.login}  <button onClick={props.logoutTC}>LOG OUT</button> </div>
                : <NavLink to={'/login'}> LOG IN  </NavLink>}
        </div>
    </header>;
})
export default Header;