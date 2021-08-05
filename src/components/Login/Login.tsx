import React from 'react';
import {connect} from 'react-redux';
import {loginTC} from '../../redux/auth-reducer';
import {Redirect} from 'react-router-dom';
import {AppStateType} from '../../redux/redux-store';
import {FormDataType, LoginReduxForm} from './LoginForm';

type mapDispatchPropsType = {
    loginTC: (email: string, password: string, rememberMe: boolean, captch: string ) => void
}

type mapStatePropsType = {
    captchaUrl: string | null
    isAuth: boolean
}

const mapStateToProps = (state: AppStateType): mapStatePropsType => {
    return {
        captchaUrl: state.auth.captchaUrl,
        isAuth: state.auth.isAuth
    }
}

type UsersContainerComponentPropsType = mapStatePropsType & mapDispatchPropsType;

const Login = React.memo((props: UsersContainerComponentPropsType) => {
    const onSubmit = (formData: FormDataType) => {
        const {email, password, rememberMe, captcha} = formData
        props.loginTC(email, password, rememberMe, captcha)
    }

    if (props.isAuth) {
        return <Redirect to={'/profile'}/>
    }
    return (<div>
        <LoginReduxForm onSubmit={onSubmit} captchaUrl={props.captchaUrl}/>
    </div>)
})

export default connect(mapStateToProps, {loginTC})(Login)

