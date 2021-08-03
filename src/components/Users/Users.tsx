import React from 'react';
import {UserType} from '../../redux/users-reducer';
import {Paginator} from "../../common/Paginator/Paginator";
import {User} from "./User";

type UsersPropsType = {
    totalCount: number
    pageSize: number
    currentPage: number
    usersPage: Array<UserType>
    followTC: (userId: number) => void
    unFollowTC: (userId: number) => void
    onPageChanged: (pageNumber: number) => void
    followingInProgress: Array<number>
}

export const Users = React.memo((props: UsersPropsType) => {


    return (<div>
        <Paginator totalCount={props.totalCount} pageSize={props.pageSize}
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
