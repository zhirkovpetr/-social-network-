import React from 'react';
import s from './Users.module.css'
import userPhoto from '../../assets/images/user.png'
import {UserType} from '../../redux/users-reducer';
import {NavLink} from 'react-router-dom';

type UsersPropsType = {
    totalUsersCount: number
    pageSize: number
    currentPage: number
    usersPage: Array<UserType>

    followTC: (userId: string) => void
    unFollowTC: (userId: string) => void

    onPageChanged: (pageNumber: number) => void
    followingInProgress: Array<string>
}


let Users = (props: UsersPropsType) => {

    let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize)
    let pages = [] as Array<number>
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }

    return (<div>
        <div className={s.page}>
            {pages.map((p) => {
                return <span onClick={() => {
                    props.onPageChanged(p)
                }} className={props.currentPage === p ? s.selectedPage : ''}>{p}</span>
            })}
        </div>
        {props.usersPage.map(u => <div key={u.id}>
            <span>
                <div>
                    <NavLink to={'/profile'}>
                    <img alt={'avatar'} className={s.photo} src={u.photos.small !== null ? u.photos.small : userPhoto}/>
                    </NavLink>
                </div>
                <div>
                    {u.followed
                        ? <button disabled={props.followingInProgress.some(id => id === u.id)} onClick={() => {
                            props.unFollowTC(u.id)
                            /*props.toggleIsFollowingInProgress(u.id, true)
                            usersAPI.unFollowUsers(u.id).then(data => {
                                if (data.resultCode === 0) {
                                    props.unFollow(u.id)
                                }
                                props.toggleIsFollowingInProgress(u.id, false)
                            })*/
                        }}>UNFOLLOW</button> :
                        <button disabled={props.followingInProgress.some(id => id === u.id)} onClick={() => {
                            props.followTC(u.id)
                            /*props.toggleIsFollowingInProgress(u.id, true)
                            usersAPI.followUsers(u.id).then(data => {
                                if (data.resultCode === 0) {
                                    props.follow(u.id)
                                }
                                props.toggleIsFollowingInProgress(u.id, false)
                            })*/
                        }}>FOLLOW</button>}
                </div>
            </span>
                <span>
                <span>
                    <div>{u.name} {'u.surname'}</div>
                    <div>{u.status !== null ? u.status : 'not status'}</div>
                </span>
                <span>
                    <div>{'u.location.country'}</div>
                    <div>{'u.location.city'}</div>
                </span>
            </span>
            </div>
        )
        }
    </div>)
}

export default Users;