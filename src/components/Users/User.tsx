import React from 'react';
import s from './Users.module.css'
import userPhoto from '../../assets/images/user.png'
import {UserType} from '../../redux/users-reducer';
import {NavLink} from 'react-router-dom';

type UserPropsType = {
    followTC: (userId: number) => void
    unFollowTC: (userId: number) => void
    followingInProgress: Array<number>
    items: UserType
}


export const User = React.memo((props: UserPropsType) => {
    return (<div>
            <span>
                <div>
                    <NavLink to={`/profile/${props.items.id}`}>
                    <img alt={'avatar'} className={s.photo} src={props.items.photos.small !== null ? props.items.photos.small : userPhoto}/>
                    </NavLink>
                </div>
                <div>
                    {props.items.followed
                        ? <button disabled={props.followingInProgress.some(id => id === props.items.id)} onClick={() => {
                            props.unFollowTC(props.items.id)
                        }}>UNFOLLOW</button> :
                        <button disabled={props.followingInProgress.some(id => id === props.items.id)} onClick={() => {
                            props.followTC(props.items.id)
                        }}>FOLLOW</button>}
                </div>
            </span>
        <span>
                <span>
                    <div>{props.items.name} {'u.surname'}</div>
                    <div>{props.items.status !== null ? props.items.status : 'not status'}</div>
                </span>
                <span>
                    <div>{'u.location.country'}</div>
                    <div>{'u.location.city'}</div>
                </span>
            </span>
    </div>)
})
