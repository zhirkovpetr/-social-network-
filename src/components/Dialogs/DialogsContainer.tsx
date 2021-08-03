import React from "react";
import {AddMessage, InitialStateType} from "../../redux/dialogs-reducer";
import {Dialogs} from "./Dialogs";
import {connect} from "react-redux";
import {AppStateType} from "../../redux/redux-store";
import {compose} from "redux";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";


export type messagesType = {
    id: string
    message: string
}
export type dialogsType = {
    id: string
    name: string
}
export type dialogsPageType = {
    dialogs: Array<dialogsType>
    messages: Array<messagesType>
}

type mapStatePropsType = {
    dialogsPage: InitialStateType
}
/*type mapDispatchPropsType = {
    ChangeMessageAC: (newMessage: string) => void
    AddMessageAC: () => void
}*/

let mapToStateToProps = (state: AppStateType): mapStatePropsType => {
    return {
        dialogsPage: state.dialogsPage,
    }
}

/*let mapDispatchToProps = (dispatch: Dispatch): mapDispatchPropsType => {
    return {
        ChangeMessageAC: (newMessage: string) => {
            dispatch(ChangeMessageAC(newMessage))
        },
        AddMessageAC: () => {
            dispatch(AddMessageAC())
        }
    }
}*/

export default compose<React.ComponentType>(
    connect(mapToStateToProps, {AddMessage}),
    withAuthRedirect
)(Dialogs)

