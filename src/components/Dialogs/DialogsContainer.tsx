import React from "react";
import {AddMessage, ChangeMessage, InitialStateType} from "../../redux/dialogs-reducer";
import Dialogs from "./Dialogs";
import {connect} from "react-redux";
import {AppStateType} from "../../redux/redux-store";


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
    messageForNewMessage: string
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
        dialogsPage: state.dialogsPage
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

export const DialogsContainer = connect(mapToStateToProps, {ChangeMessage, AddMessage})(Dialogs)

