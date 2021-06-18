import React from 'react';
import Header from "./Header";
import {getUserLoginTC, logoutTC} from "../../redux/auth-reducer";
import {AppStateType} from "../../redux/redux-store";
import {connect} from "react-redux";



export type mapStatePropsType = {
    id: number | null,
    email: string | null,
    login: string | null,
    isFetching: boolean,
    isAuth: boolean
}

export type mapDispatchPropsType = {
    logoutTC: ()=> void
}

export type UsersContainerComponentPropsType = mapStatePropsType & mapDispatchPropsType;



class HeaderContainerComponent extends React.Component<UsersContainerComponentPropsType> {

    render() {
        return <Header {...this.props}/>
    }
}

let mapToStateToProps = (state: AppStateType): mapStatePropsType => {
    return {
        id: state.auth.data.id,
        email: state.auth.data.email,
        login: state.auth.data.login,
        isFetching: state.auth.isFetching,
        isAuth: state.auth.isAuth
    }
}

export const HeaderContainer = connect(mapToStateToProps, {logoutTC})(HeaderContainerComponent)