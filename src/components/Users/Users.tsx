import React from 'react';
import {UserType} from '../../redux/users-reducer';
import {Paginator} from "../../common/Paginator/Paginator";
import {User} from "./User";

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

export const Users = React.memo((props: UsersPropsType) => {


    return (<div>
        <Paginator totalUsersCount={props.totalUsersCount} pageSize={props.pageSize}
                   onPageChanged={props.onPageChanged} currentPage={props.currentPage}/>
        <div>
            {
                props.usersPage.map(u => <User key={u.id} items={u}
                                               followingInProgress={props.followingInProgress}
                                               followTC={props.followTC} unFollowTC={props.unFollowTC}/>)
            }
        </div>
    </div>)
})
