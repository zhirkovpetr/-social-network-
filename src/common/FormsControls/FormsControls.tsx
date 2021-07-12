import React from "react";
import {Field, WrappedFieldProps} from "redux-form";
import s from './FormsControls.module.css'
import {required} from "../../utils/validators/validators";


export const FormControl: React.FC<WrappedFieldProps> = (props) => {
    const {input, meta, children, ...restProps} = props

    const hasError = meta.touched && meta.error
    return (
        <div className={`${s.formControl} + ' ' + ${hasError ? s.error : ''}`}>
            <div>
                {props.children}
            </div>
            <div>
                {hasError && <span>{meta.error}</span>}
            </div>
        </div>
    )
}

export const Textarea: React.FC<WrappedFieldProps> = (props) => {
    const {input, meta, children, ...restProps} = props
    return (
       <FormControl {...props}><textarea {...input} {...restProps}/></FormControl>
    )
}


export const Input: React.FC<WrappedFieldProps> = (props) => {
    const {input, meta, children, ...restProps} = props
    return (
        <FormControl {...props}><input {...input} {...restProps}/></FormControl>
    )
}

