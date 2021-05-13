import React from "react";
import Profile from "./Profile";
import axios from "axios";
import {connect} from "react-redux";
import {AppStateType} from "../../redux/redux-store";
import {ProfileType, setUserProfile} from "../../redux/profile-reducer";


type mapStatePropsType = {
    profile: ProfileType | null
}

export type mapDispatchPropsType = {
    setUserProfile: (profile: ProfileType | null)=> void
}

export type UsersContainerComponentPropsType = mapStatePropsType & mapDispatchPropsType;


class ProfileContainerComponent extends React.Component<UsersContainerComponentPropsType> {

    componentDidMount() {

        axios.get(`https://social-network.samuraijs.com/api/1.0/profile/2`)
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


export const ProfileContainer = connect(mapToStateToProps, {setUserProfile})(ProfileContainerComponent)

export default ProfileContainer;