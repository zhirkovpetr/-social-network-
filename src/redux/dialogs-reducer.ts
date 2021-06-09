import {v1} from "uuid";
import {ActionsTypes} from "./store";

export type messagesType = {
    id: string
    message: string
}
export type dialogsType = {
    id: string
    name: string
}

export type InitialStateType = typeof initialState;


const ADD_MESSAGE = "ADD-MESSAGE";

export const AddMessage= (newMessage: string) => {
    return {
        type: "ADD-MESSAGE", newMessage
    } as const
}


let initialState = {
    dialogs: [
        {id: v1(), name: 'Dmitry'},
        {id: v1(), name: 'Petr'},
        {id: v1(), name: 'Andrey'},
        {id: v1(), name: 'Alena'},
        {id: v1(), name: 'Nastia'}
    ] as Array<dialogsType>,
    messages: [
        {id: v1(), message: 'Hi!'},
        {id: v1(), message: 'Hi!'},
        {id: v1(), message: 'How a you?'},
        {id: v1(), message: 'Good!'},
        {id: v1(), message: 'What do you do?'}
    ] as Array<messagesType>
}

export const dialogsReducer = (state: InitialStateType = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case ADD_MESSAGE: {
            const newMessage = action.newMessage;
            return {
                ...state,
                messages: [...state.messages, {id: v1(), message: newMessage}]
            }
        }
        default:
            return state;
    }
}