import React from "react";
import s from './Users.module.css'
import userPhoto from '../../assets/images/user.png'
import {UserType} from "../../redux/users-reducer";

type UsersPropsType = {
    totalUsersCount: number
    pageSize: number
    currentPage: number
    usersPage: Array<UserType>
    follow: (userId: string) => void
    unFollow: (userId: string) => void
    onPageChanged: (pageNumber: number) => void
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
                    <img alt={'avatar'} className={s.photo} src={u.photos.small !== null ? u.photos.small : userPhoto}/>
                </div>
                <div>
                    {u.followed ? <button onClick={() => {
                            props.unFollow(u.id)
                        }}>UNFOLLOW</button> :
                        <button onClick={() => {
                            props.follow(u.id)
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