import React from 'react';
import {Field, InjectedFormProps, reduxForm} from 'redux-form';
import {Input} from '../../common/FormsControls/FormsControls';
import {maxLengthCreator, required} from '../../utils/validators/validators';
import s from '../../common/FormsControls/FormsControls.module.css'

export type FormDataType = {
    email: string
    password: string
    rememberMe: boolean
    error: string
}

const maxValue = maxLengthCreator(40)

export const LoginForm = React.memo((props: InjectedFormProps<FormDataType>) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <h1>Login</h1>
            <div>
                <Field placeholder={'Email'} name={'email'} component={Input} validate={[required, maxValue]}/>
            </div>
            <div>
                <Field placeholder={'Password'} name={'password'} type={'password'} component={Input}
                       validate={[required, maxValue]}/>
            </div>
            <div>
                <Field type={'checkbox'} name={'rememberMe'} component={Input}/>
                remember me
            </div>
            {
                props.error &&
                <div className={s.formSummaryError}>
                    {props.error}
                </div>
            }
            <div>
                <button>Login</button>
            </div>
        </form>)
})

export const LoginReduxForm = reduxForm<FormDataType>({form: 'login'})(LoginForm)






