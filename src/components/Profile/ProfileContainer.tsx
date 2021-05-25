import React from "react";
import Profile from "./Profile";
import {connect} from "react-redux";
import {AppStateType} from "../../redux/redux-store";
import {getUserPageTC, ProfileType} from "../../redux/profile-reducer";
import {RouteComponentProps, withRouter} from "react-router-dom";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {compose} from "redux";




type mapStatePropsType = {
    profile: ProfileType | null
}

export type mapDispatchPropsType = {
    getUserPageTC: (userId: number)=> void
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
            userId=2
        }
        this.props.getUserPageTC(userId)
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
            <Profile {...this.props} profile={this.props.profile} />
        )
    }
}

let mapToStateToProps = (state: AppStateType): mapStatePropsType => ({
    profile: state.profilePage.profile
})

export default compose<React.ComponentType>(
    withAuthRedirect,
    connect(mapToStateToProps, {getUserPageTC}),
    withRouter
)(ProfileContainer)
