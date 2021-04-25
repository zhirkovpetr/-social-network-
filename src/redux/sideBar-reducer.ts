import {ActionsTypes} from "./store";
import {v1} from "uuid";

export type friendsType = {
    id: string
    name: string
}

export type InitialStateType= typeof initialState

let initialState= {
    friends: [
        {id: v1(), name: 'Dmitry'},
        {id: v1(), name: 'Petr'},
        {id: v1(), name: 'Andrey'}
    ] as Array<friendsType>
}

export const sideBarReducer= (state:InitialStateType= initialState, action: ActionsTypes):InitialStateType => {
    switch (action.type) {
        default:
            return state
    }
}