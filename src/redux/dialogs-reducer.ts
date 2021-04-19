import {v1} from "uuid";
import {ActionsTypes, dialogsPageType, messagesType} from "./store";

const ADD_MESSAGE= "ADD-MESSAGE";
const CHANGE_MESSAGE= "CHANGE-MESSAGE";

export const AddMessageAC= (messageText: string)=> {
    return {
        type: "ADD-MESSAGE", messageText: messageText
    } as const
}

export const ChangeMessageAC= (newMessage: string)=> {
    return {
        type: "CHANGE-MESSAGE", newMessage: newMessage
    } as const
}

let initialState= {
    dialogs: [
        {id: v1(), name: 'Dmitry'},
        {id: v1(), name: 'Petr'},
        {id: v1(), name: 'Andrey'},
        {id: v1(), name: 'Alena'},
        {id: v1(), name: 'Nastia'}
    ],
    messageForNewMessage: '',
    messages: [
        {id: v1(), message: 'Hi!'},
        {id: v1(), message: 'Hi!'},
        {id: v1(), message: 'How a you?'},
        {id: v1(), message: 'Good!'},
        {id: v1(), message: 'What do you do?'}
    ]
}

export const dialogsReducer = (state: dialogsPageType=initialState, action: ActionsTypes):dialogsPageType => {
    switch (action.type){
        case ADD_MESSAGE:
            const newMessage: messagesType = {id: v1(), message: action.messageText};
            state.messages.push(newMessage);
            return state;
        case CHANGE_MESSAGE:
            state.messageForNewMessage = action.newMessage;
            return state;
        default: return state;
    }
}