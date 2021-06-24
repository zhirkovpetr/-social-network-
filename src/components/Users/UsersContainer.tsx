import {connect} from 'react-redux';
import {AppStateType} from '../../redux/redux-store';
import {
    followTC,
    requestUsersTC,
    setCurrentPage,
    toggleIsFollowingInProgress,
    unFollowTC,
    UserType
} from '../../redux/users-reducer';
import Users from './Users';
import React from 'react';
import {Preloader} from "../../common/Preloader/Preloader";
import {compose} from "redux";
import {
    getCurrentPage,
    getFollowingInProgress,
    getIsFetching,
    getPageSize,
    getTotalUsersCount,
    getUsers
} from "../../redux/users-selectors";


export type mapStatePropsType = {
    usersPage: Array<UserType>
    pageSize: number
    totalUsersCount: number
    currentPage: number
    isFetching: boolean
    followingInProgress: Array<string>
}

export type UsersContainerComponentPropsType = mapStatePropsType & mapDispatchPropsType;


export type mapDispatchPropsType = {
    followTC: (userId: string) => void
    unFollowTC: (userId: string) => void
    getUsersTC: (currentPage: number, pageSize: number) => void
}

class UsersContainerComponent extends React.Component<UsersContainerComponentPropsType> {

    componentDidMount() {
        this.props.getUsersTC(this.props.currentPage, this.props.pageSize);
    }

    onPageChanged = (pageNumber: number) => {
        this.props.getUsersTC(pageNumber, this.props.pageSize);
    }

    render() {
        return <>
            {this.props.isFetching ? <Preloader/> : null}
            <Users totalUsersCount={this.props.totalUsersCount}
                   pageSize={this.props.pageSize}
                   currentPage={this.props.currentPage}
                   usersPage={this.props.usersPage}
                   followTC={this.props.followTC}
                   unFollowTC={this.props.unFollowTC}
                   onPageChanged={this.onPageChanged}
                   followingInProgress={this.props.followingInProgress}
            />
        </>
    }
}


let mapToStateToProps = (state: AppStateType): mapStatePropsType => {
    return {
        usersPage: getUsers(state),
        pageSize: getPageSize(state),
        totalUsersCount: getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        followingInProgress: getFollowingInProgress(state)
    }
}

export const UsersContainer= compose<React.ComponentType>(
    connect(mapToStateToProps, {followTC, unFollowTC, setCurrentPage, toggleIsFollowingInProgress, getUsersTC: requestUsersTC})
)(UsersContainerComponent)

