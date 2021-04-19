import React, {ChangeEvent} from "react";
import {AddMessageAC, ChangeMessageAC} from "../../redux/dialogs-reducer";
import Dialogs from "./Dialogs";
import {storeType} from "../../redux/redux-store";


type DialogsContainerPropsType = {
    store: storeType
}

const DialogsContainer= (props: DialogsContainerPropsType ) => {
    let state= props.store.getState();
    const OnChangeMessageCallback = (e: ChangeEvent<HTMLTextAreaElement>) => {
        props.store.dispatch(ChangeMessageAC(e.currentTarget.value))
    }
    const AddMessage = () => {
        props.store.dispatch(AddMessageAC(state.dialogsPage.messageForNewMessage))
        props.store.dispatch(ChangeMessageAC(''));
    }

    return <Dialogs ChangeMessageAC={OnChangeMessageCallback} AddMessage={AddMessage} messageMessage={state.dialogsPage.messageForNewMessage} dialogsPage={state.dialogsPage}/>
}

export default DialogsContainer;