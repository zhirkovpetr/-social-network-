import {v1} from 'uuid';

//Const
const ADD_MESSAGE = 'SOCIAL_NETWORK/DIALOGS/ADD-MESSAGE';

//State
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

//Reducer
export const dialogsReducer = (state: InitialStateType = initialState, action: DialogsActionsTypes): InitialStateType => {
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

//Action type
type AddMessageActionType = ReturnType<typeof AddMessage>

export type DialogsActionsTypes = AddMessageActionType

//Action creator
export const AddMessage= (newMessage: string) => {
    return {
        type: ADD_MESSAGE, newMessage
    } as const
}

//Type
export type InitialStateType = typeof initialState;

export type messagesType = {
    id: string
    message: string
}
export type dialogsType = {
    id: string
    name: string
}