import React from 'react';
import Header from "./Header";
import {setUserData, toggleIsFetching} from "../../redux/auth-reducer";
import {AppStateType} from "../../redux/redux-store";
import {connect} from "react-redux";
import axios from "axios";


export type mapStatePropsType = {
    id: number | null,
    email: string | null,
    login: string | null,
    isFetching: boolean,
    isAuth: boolean
}

export type mapDispatchPropsType = {
    setUserData: (id: number | null, email: string | null, login: string | null) => void
    toggleIsFetching: (isFetching: boolean) => void
}

export type UsersContainerComponentPropsType = mapStatePropsType & mapDispatchPropsType;



class HeaderContainerComponent extends React.Component<UsersContainerComponentPropsType> {

    componentDidMount() {
        this.props.toggleIsFetching(true)
        axios.get(`https://social-network.samuraijs.com/api/1.0/auth/me`, {
            withCredentials: true
        })
            .then(response => {
                if(response.data.resultCode === 0) {
                    let {id, email, login}= response.data.data
                    this.props.setUserData(id, email, login)
                }
                this.props.toggleIsFetching(false)

            })
    }

    render() {
        return <Header {...this.props}/>
    }
}

let mapToStateToProps = (state: AppStateType): mapStatePropsType => {
    return {
        id: state.auth.id,
        email: state.auth.email,
        login: state.auth.login,
        isFetching: state.auth.isFetching,
        isAuth: state.auth.isAuth
    }
}

export const HeaderContainer = connect(mapToStateToProps, {
    setUserData, toggleIsFetching
})(HeaderContainerComponent)