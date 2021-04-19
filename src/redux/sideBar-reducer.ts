import {ActionsTypes, sideBarType} from "./store";
import {v1} from "uuid";

let initialState= {
    friends: [
        {id: v1(), name: 'Dmitry'},
        {id: v1(), name: 'Petr'},
        {id: v1(), name: 'Andrey'}
    ]
}

export const sideBarReducer= (state:sideBarType= initialState, action: ActionsTypes):sideBarType => {
    switch (action.type) {
        default:
            return state
    }
}