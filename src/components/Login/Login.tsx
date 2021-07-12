import React from 'react';
import {connect} from 'react-redux';
import {loginTC} from '../../redux/auth-reducer';
import {Redirect} from 'react-router-dom';
import {AppStateType} from '../../redux/redux-store';
import {FormDataType, LoginReduxForm} from './LoginForm';

type mapDispatchPropsType = {
    loginTC: (email: string, password: string, rememberMe: boolean) => void
}

type mapStatePropsType = {
    isAuth: boolean
}

const mapStateToProps = (state: AppStateType): mapStatePropsType => {
    return {
        isAuth: state.auth.isAuth
    }
}

type UsersContainerComponentPropsType = mapStatePropsType & mapDispatchPropsType;

const Login = React.memo((props: UsersContainerComponentPropsType) => {
    const onSubmit = (formData: FormDataType) => {
        const {email, password, rememberMe} = formData
        props.loginTC(email, password, rememberMe)
    }

    if (props.isAuth) {
        return <Redirect to={'/profile'}/>
    }
    return (<div>
        <LoginReduxForm onSubmit={onSubmit}/>
    </div>)
})

export default connect(mapStateToProps, {loginTC})(Login)

