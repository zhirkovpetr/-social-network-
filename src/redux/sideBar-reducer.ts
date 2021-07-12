import {v1} from 'uuid';
import {ActionsTypes} from "./store";

//State
let initialState = {
    friends: [
        {id: v1(), name: 'Dmitry'},
        {id: v1(), name: 'Petr'},
        {id: v1(), name: 'Andrey'}
    ] as Array<friendsType>
}

//Reducer
export const sideBarReducer = (state: InitialStateType = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        default:
            return state
    }
}

//Type
export type InitialStateType = typeof initialState

export type friendsType = {
    id: string
    name: string
}
