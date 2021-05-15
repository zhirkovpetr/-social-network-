import React from "react";
import Profile from "./Profile";
import axios from "axios";
import {connect} from "react-redux";
import {AppStateType} from "../../redux/redux-store";
import {ProfileType, setUserProfile} from "../../redux/profile-reducer";
import {RouteComponentProps, withRouter } from "react-router-dom";


type mapStatePropsType = {
    profile: ProfileType | null
}

export type mapDispatchPropsType = {
    setUserProfile: (profile: ProfileType | null)=> void
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
        axios.get(`https://social-network.samuraijs.com/api/1.0/profile/` + userId)
            .then(response => {
                this.props.setUserProfile(response.data);
            })
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
export const ProfileContainer = connect(mapToStateToProps, {setUserProfile})(ProfileWithRouter)

export default ProfileContainer;