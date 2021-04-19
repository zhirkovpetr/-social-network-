import React, {ChangeEvent} from "react";
import {AddMessageAC, ChangeMessageAC} from "../../redux/dialogs-reducer";
import Dialogs from "./Dialogs";
import StoreContext from "../../storeContext";


const DialogsContainer = () => {
    return (
        <StoreContext.Consumer>
            {(store) => {
                let state = store.getState();
                const OnChangeMessageCallback = (e: ChangeEvent<HTMLTextAreaElement>) => {
                    store.dispatch(ChangeMessageAC(e.currentTarget.value))
                }
                const AddMessage = () => {
                    store.dispatch(AddMessageAC(state.dialogsPage.messageForNewMessage))
                    store.dispatch(ChangeMessageAC(''));
                }
                return (
                    <Dialogs ChangeMessageAC={OnChangeMessageCallback} AddMessage={AddMessage}
                             messageMessage={state.dialogsPage.messageForNewMessage}
                             dialogsPage={state.dialogsPage}/>)
            }
            }
        </StoreContext.Consumer>
    )
}

export default DialogsContainer;