import React from 'react';
import Header from "./Header";
import {getUserLoginTC, setUserData} from "../../redux/auth-reducer";
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
    setUserData: (id: number | null, email: string | null, login: string | null) => void
    getUserProfileTC: (id: number | null) => void
}

export type UsersContainerComponentPropsType = mapStatePropsType & mapDispatchPropsType;



class HeaderContainerComponent extends React.Component<UsersContainerComponentPropsType> {

    componentDidMount() {
        getUserLoginTC(this.props.id)
       /* this.props.toggleIsFetching(true)
        usersAPI.getUserLogin(this.props.id)
            .then(data => {
                if(data.data.resultCode === 0) {
                    let {id, email, login}= data.data
                    this.props.setUserData(id, email, login)
                }
                this.props.toggleIsFetching(false)

            })*/
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
    setUserData, getUserProfileTC: getUserLoginTC
})(HeaderContainerComponent)