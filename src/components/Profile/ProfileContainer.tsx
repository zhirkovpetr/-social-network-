import React from "react";
import Profile from "./Profile";
import {connect} from "react-redux";
import {AppStateType} from "../../redux/redux-store";
import {getStatusTC, getUserPageTC, ProfileType, updateStatusTC} from "../../redux/profile-reducer";
import {RouteComponentProps, withRouter} from "react-router-dom";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {compose} from "redux";




type mapStatePropsType = {
    profile: ProfileType | null
    status: string
}

export type mapDispatchPropsType = {
    getUserPageTC: (userId: number)=> void
    getStatusTC: (userId: number)=> void
    updateStatusTC: (status: string)=> void
}

type userPropsType={
    userId: string
}

export type UsersContainerComponentPropsType = mapStatePropsType & mapDispatchPropsType;

export type PropsType= RouteComponentProps<userPropsType> & UsersContainerComponentPropsType


class ProfileContainer extends React.Component<PropsType> {

    componentDidMount() {
        let userId= this.props.profile?.userId
        if(!userId){
            userId=16711
        }
        this.props.getUserPageTC(userId)
        this.props.getStatusTC(userId)


        /*let userId= this.props.profile?.userId
        if(!userId){
            userId=2
        }
        usersAPI.getUserPage(userId)
            .then(data => {
                this.props.setUserProfile(data);
            })*/

    }

    render() {
        return (
            <Profile {...this.props} profile={this.props.profile} status={this.props.status} updateStatusTC={this.props.updateStatusTC}/>
        )
    }
}

let mapToStateToProps = (state: AppStateType): mapStatePropsType => ({
    profile: state.profilePage.profile,
    status: state.profilePage.status,
})

export default compose<React.ComponentType>(
    withAuthRedirect,
    connect(mapToStateToProps, {getUserPageTC, getStatusTC, updateStatusTC}),
    withRouter
)(ProfileContainer)
