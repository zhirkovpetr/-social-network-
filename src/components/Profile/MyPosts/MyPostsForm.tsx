import React from "react";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {maxLengthCreator, required} from "../../../utils/validators/validators";
import {Textarea} from "../../../common/FormsControls/FormsControls";

export type  FormDataType = {
    newPost: string
}

const maxValue= maxLengthCreator(50)

export const MyPostsForm = React.memo((props: InjectedFormProps<FormDataType>) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field placeholder={'Enter your message'} type="text" name={'newPost'} component={Textarea} validate={[ required, maxValue ]}/>
            </div>
            <div>
                <button type="submit">Add post</button>
            </div>
        </form>
    )
})

export const MyPostsReduxForm = React.memo(reduxForm<FormDataType>({form: 'ProfileNewPost'})(MyPostsForm))

