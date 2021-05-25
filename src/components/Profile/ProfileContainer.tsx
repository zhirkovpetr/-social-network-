import React from "react";
import Profile from "./Profile";
import {connect} from "react-redux";
import {AppStateType} from "../../redux/redux-store";
import {getUserPageTC, ProfileType} from "../../redux/profile-reducer";
import {Redirect, RouteComponentProps, withRouter} from "react-router-dom";



type mapStatePropsType = {
    profile: ProfileType | null
    isAuth: boolean

}

export type mapDispatchPropsType = {
    getUserPageTC: (userId: number)=> void
}

type userPropsType={
    userId: string
}

export type UsersContainerComponentPropsType = mapStatePropsType & mapDispatchPropsType;

export type PropsType= RouteComponentProps<userPropsType> & UsersContainerComponentPropsType


class ProfileContainerComponent extends React.Component<PropsType> {

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
        if (!this.props.isAuth) return <Redirect to={'/login'}/>
        return (
            <Profile profile={this.props.profile} />
        )
    }
}

let mapToStateToProps = (state: AppStateType): mapStatePropsType => ({
    profile: state.profilePage.profile,
    isAuth: state.auth.isAuth
})

const ProfileWithRouter= withRouter(ProfileContainerComponent)
export const ProfileContainer = connect(mapToStateToProps, {getUserPageTC})(ProfileWithRouter)

export default ProfileContainer;