import React from "react";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {Input} from "../../common/FormsControls/FormsControls";
import {maxLengthCreator, required} from "../../utils/validators/validators";
import {connect} from "react-redux";
import {loginTC} from "../../redux/auth-reducer";
import {Redirect} from "react-router-dom";
import {AppStateType} from "../../redux/redux-store";
import s from '../../common/FormsControls/FormsControls.module.css'

type FormDataType = {
    email: string
    password: string
    rememberMe: boolean
}

type mapDispatchPropsType = {
    loginTC: (email: string, password: string, rememberMe: boolean) => void
}

export type mapStatePropsType = {
    isAuth: boolean
}

export type UsersContainerComponentPropsType = mapStatePropsType & mapDispatchPropsType;

const maxValue = maxLengthCreator(40)

export const LoginForm = React.memo((props: InjectedFormProps<FormDataType>) => {
    return (<form onSubmit={props.handleSubmit}>
        <div><Field placeholder={'Email'} name={'email'} component={Input} validate={[required, maxValue]}/></div>
        <div><Field placeholder={'Password'} name={'password'} type={'password'} component={Input}
                    validate={[required, maxValue]}/></div>
        <div><Field type={'checkbox'} name={'rememberMe'} component={Input}/> remember me</div>
        {
            props.error && <div className={s.formSummaryError}>
                {props.error}
            </div>
        }
        <div>
            <button>Login</button>
        </div>
    </form>)
})

const LoginReduxForm = React.memo(reduxForm<FormDataType>({form: 'login'})(LoginForm))

const Login = React.memo((props: UsersContainerComponentPropsType) => {
    const onSubmit = (formData: FormDataType) => {
        const {email, password, rememberMe} = formData
        props.loginTC(email, password, rememberMe)
    }

    if (props.isAuth) {
        return <Redirect to={'/profile'}/>
    }
    return (<div>
        <h1>Login</h1>
        <LoginReduxForm onSubmit={onSubmit}/>
    </div>)
})

export const mapStateToProps = (state: AppStateType): mapStatePropsType => {
    return {
        isAuth: state.auth.isAuth
    }
}

export default connect(mapStateToProps, {loginTC})(Login)

