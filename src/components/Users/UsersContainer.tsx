import {connect} from 'react-redux';
import {AppStateType} from '../../redux/redux-store';
import {
    followTC,
    getUsersTC,
    setCurrentPage,
    toggleIsFollowingInProgress,
    unFollowTC,
    UserType
} from '../../redux/users-reducer';
import Users from './Users';
import React from 'react';
import {Preloader} from "../../common/Preloader/Preloader";


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

       /* this.props.toggleIsFetching(true);
        usersAPI.getUsers(this.props.currentPage, this.props.pageSize).then(data => {
            this.props.toggleIsFetching(false);
            this.props.setUsers(data.items);
            this.props.setTotalUsersCount(data.totalCount);
        })*/
    }

    onPageChanged = (pageNumber: number) => {
        this.props.getUsersTC(pageNumber, this.props.pageSize);

        /*this.props.setCurrentPage(pageNumber);
        this.props.toggleIsFetching(true);
        usersAPI.getUsers(pageNumber, this.props.pageSize).then(data => {
            this.props.toggleIsFetching(false);
            this.props.setUsers(data.items)
        })*/
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
        usersPage: state.usersPage.users,
        pageSize: state.usersPage.pageSize,
        totalUsersCount: state.usersPage.totalUsersCount,
        currentPage: state.usersPage.currentPage,
        isFetching: state.usersPage.isFetching,
        followingInProgress: state.usersPage.followingInProgress,
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
    followTC, unFollowTC, setCurrentPage, toggleIsFollowingInProgress, getUsersTC
})(UsersContainerComponent)

