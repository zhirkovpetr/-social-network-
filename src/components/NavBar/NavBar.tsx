import React from 'react';
import s from './NavBar.module.css';
import {NavLink} from "react-router-dom";
import {sideBarType} from "../../redux/store";

type NavBarPropsType= {
    sideBar: sideBarType
}

const Navbar: React.FC <NavBarPropsType> = (props) => {
    const friendsArray = props.sideBar.friends;
    return (
        <nav className={s.nav}>
        <div className={s.item}>
        <NavLink to="/profile" activeClassName={s.activeLink}>Profile</NavLink>
        </div>
        <div className={`${s.item} ${s.active}`}>
    <NavLink to="/dialogs" activeClassName={s.activeLink}>Messages</NavLink>
        </div>
        <div className={s.item}>
    <NavLink to="/news" activeClassName={s.activeLink}>News</NavLink>
        </div>
        <div className={s.item}>
    <NavLink to="/music" activeClassName={s.activeLink}>Music</NavLink>
        </div>
        <div className={s.item}>
    <NavLink to="/settings" activeClassName={s.activeLink}>Settings</NavLink>
        </div>
        <div className={s.item}>
    <NavLink to="/friends" activeClassName={s.activeLink}>Friends</NavLink>
        <div className={s.friends}>
        {friendsArray.map((friedItem, index) =>
                <p key={index}>
                <span className={s.imgFriend}>
                <img src="https://dthezntil550i.cloudfront.net/kg/latest/kg1802132010216500004834729/1280_960/557d644f-12f3-49e1-bb66-23c16400540d.png" alt="friend"/>
            </span>
            <span className={s.nameFriend}>
            <NavLink to={"/friend/"+ friedItem.id} activeClassName={s.activeLink}>{friedItem.name}</NavLink>
            </span>
            </p>
)}
    </div>
    </div>
    </nav>
)
}

export default Navbar;


