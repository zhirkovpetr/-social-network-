import {createStore, combineReducers} from "redux"
import {profileReducer} from "./profile-reducer";
import {dialogsReducer} from "./dialogs-reducer";
import {sideBarReducer} from "./sideBar-reducer";


export type AppStateType = ReturnType<typeof reducers>
export type storeType= typeof store;

let reducers= combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    sideBar: sideBarReducer

});

export let store= createStore(reducers)

