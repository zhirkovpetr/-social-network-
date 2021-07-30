import React from 'react';
import {Profile} from './Profile';
import {connect} from 'react-redux';
import {AppStateType} from '../../redux/redux-store';
import {getStatusTC, getUserPageTC, ProfileType, updateStatusTC} from '../../redux/profile-reducer';
import {RouteComponentProps, withRouter} from 'react-router-dom';
import {withAuthRedirect} from '../../hoc/withAuthRedirect';
import {compose} from 'redux';


type mapStatePropsType = {
    profile: ProfileType
    status: string
    isAuth: boolean
    authorizedUserId: number | null
}

export type mapDispatchPropsType = {
    getUserPageTC: (userId: number) => void
    getStatusTC: (userId: number) => void
    updateStatusTC: (status: string) => void
}

type userPropsType = {
    userId: any
}

export type ProfilePropsType = mapStatePropsType & mapDispatchPropsType & { isOwner: boolean };

export type PropsType = RouteComponentProps<userPropsType> & ProfilePropsType


class ProfileContainer extends React.PureComponent<PropsType> {

    refreshProfile() {
        let userId = this.props.match.params.userId
        if (!userId) userId = this.props.authorizedUserId
        if (!userId) this.props.history.push('login')
        if (userId) {
            this.props.getUserPageTC(userId)
            this.props.getStatusTC(userId)
        }
    }

    componentDidMount(): void {
        this.refreshProfile()
    }

    componentDidUpdate(prevProps: Readonly<PropsType>, prevState: Readonly<any>, snapshot?: any): void {
        if (this.props.match.params.userId !== prevProps.match.params.userId) {
            this.refreshProfile()
        }
    }

    render() {
        return (
            <Profile
                {...this.props}
                isOwner={!this.props.match.params.userId}
                profile={this.props.profile}
                status={this.props.status}
                updateStatusTC={this.props.updateStatusTC}
                isAuth={this.props.isAuth}/>
        )
    }
}

let mapToStateToProps = (state: AppStateType): mapStatePropsType => ({
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    isAuth: state.auth.isAuth,
    authorizedUserId: state.auth.id
})

export default compose<React.ComponentType>(
    withAuthRedirect,
    connect<mapStatePropsType, mapDispatchPropsType, {}, AppStateType>(mapToStateToProps, {
        getUserPageTC,
        getStatusTC,
        updateStatusTC
    }),
    withRouter
)(ProfileContainer)