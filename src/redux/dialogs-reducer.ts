import {v1} from "uuid";
import {ActionsTypes, messagesType, rootStateType} from "./state";

/*export const AddMessageAC= (messageText: string)=> {
    return {
        type: "ADD-MESSAGE", messageText: messageText
    } as const
}

export const ChangeMessageAC= (newMessage: string)=> {
    return {
        type: "CHANGE-MESSAGE", newMessage: newMessage
    } as const
}*/

export const dialogsReducer = (_state: rootStateType, action: ActionsTypes) => {
    switch (action.type){
        case "ADD-MESSAGE":
            const newMessage: messagesType = {id: v1(), message: action.messageText};
            _state.dialogsPage.messages.push(newMessage);
            return _state;
        case "CHANGE-MESSAGE":
            _state.dialogsPage.messageForNewMessage = action.newMessage;
            return _state;
        default: return _state;
    }
/*
    if (action.type === 'ADD-MESSAGE') {
        const newMessage: messagesType = {id: v1(), message: action.messageText};
        _state.dialogsPage.messages.push(newMessage);
    } else if (action.type === 'CHANGE-MESSAGE') {
        _state.dialogsPage.messageForNewMessage = action.newMessage;
}*/
}