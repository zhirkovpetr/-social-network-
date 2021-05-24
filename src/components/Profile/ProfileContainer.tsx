import React from "react";
import Profile from "./Profile";
import {connect} from "react-redux";
import {AppStateType} from "../../redux/redux-store";
import {getUserPageTC, ProfileType} from "../../redux/profile-reducer";
import {RouteComponentProps, withRouter} from "react-router-dom";



type mapStatePropsType = {
    profile: ProfileType | null
}

export type mapDispatchPropsType = {
    getUserPageTC: (userId: number | undefined)=> void
}

type userPropsType={
    userId: string
}

export type UsersContainerComponentPropsType = mapStatePropsType & mapDispatchPropsType;

export type PropsType= RouteComponentProps<userPropsType> & UsersContainerComponentPropsType


class ProfileContainerComponent extends React.Component<PropsType> {

    componentDidMount() {
        getUserPageTC(this.props.profile?.userId)
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
            <Profile profile={this.props.profile}/>
        )
    }
}

let mapToStateToProps = (state: AppStateType): mapStatePropsType => ({
    profile: state.profilePage.profile
})

const ProfileWithRouter= withRouter(ProfileContainerComponent)
export const ProfileContainer = connect(mapToStateToProps, {getUserPageTC})(ProfileWithRouter)

export default ProfileContainer;