import {connect} from 'react-redux';
import {AppStateType} from '../../redux/redux-store';
import {
    follow,
    setCurrentPage,
    setTotalUsersCount,setUsers,
    toggleIsFetching,
    unFollow,
   UserType
} from '../../redux/users-reducer';
import Users from './Users';
import React from 'react';
import axios from 'axios';
import {Preloader} from "../../common/Preloader/Preloader";


export type mapStatePropsType = {
    usersPage: Array<UserType>
    pageSize: number
    totalUsersCount: number
    currentPage: number
    isFetching: boolean
}

export type UsersContainerComponentPropsType = mapStatePropsType & mapDispatchPropsType;


export type mapDispatchPropsType = {
    follow: (userId: string) => void
    unFollow: (userId: string) => void
    setUsers: (users: Array<UserType>) => void
    setCurrentPage: (currentPage: number) => void
    setTotalUsersCount: (totalCount: number) => void
    toggleIsFetching: (isFetching: boolean) => void
}

class UsersContainerComponent extends React.Component<UsersContainerComponentPropsType> {

    componentDidMount() {
        this.props.toggleIsFetching(true)
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.pageSize}`)
            .then(response => {
                this.props.toggleIsFetching(false)
                this.props.setUsers(response.data.items);
                this.props.setTotalUsersCount(response.data.totalCount);
            })
    }

    onPageChanged = (pageNumber: number) => {
        this.props.toggleIsFetching(true)
        this.props.setCurrentPage(pageNumber);
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${pageNumber}&count=${this.props.pageSize}`)
            .then(response => {
                this.props.toggleIsFetching(false)
                this.props.setUsers(response.data.items)
            })
    }

    render() {
        return <>
            {this.props.isFetching ? <Preloader/> : null}
            <Users totalUsersCount={this.props.totalUsersCount}
                   pageSize={this.props.pageSize}
                   currentPage={this.props.currentPage}
                   usersPage={this.props.usersPage}
                   follow={this.props.follow}
                   unFollow={this.props.unFollow}
                   onPageChanged={this.onPageChanged}
            />
        </>
    }
}


let mapToStateToProps = (state: AppStateType): mapStatePropsType => {
    return {
        usersPage: state.usersPage.users,
        pageSize: state.usersPage.pageSize,
        totalUsersCount: state.usersPage.totalUsersCount,
        currentPage: state.usersPage.currentPage,
        isFetching: state.usersPage.isFetching,
    }
}

/*let mapDispatchToProps = (dispatch: Dispatch): mapDispatchPropsType => {
    return {
        follow: (userId: string) => {
            dispatch(follow(userId))
        },
        unFollow: (userId: string) => {
            dispatch(unFollow(userId))
        },
        setUsers: (users: Array<UserType>) => {
            dispatch(setUsers(users))
        },
        setCurrentPage: (currentPage: number) => {
            dispatch(setCurrentPage(currentPage))
        },
        setTotalUsersCount: (totalCount: number) => {
            dispatch(setTotalUsersCount(totalCount))
        },
        toggleIsFetching: (isFetching: boolean) => {
            dispatch(toggleIsFetching(isFetching))
        },
    }
}*/

export const UsersContainer = connect(mapToStateToProps, {
        follow, unFollow, setUsers, setCurrentPage, setTotalUsersCount, toggleIsFetching
    })(UsersContainerComponent)

