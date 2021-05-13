import {createStore, combineReducers} from "redux"
import {profileReducer} from "./profile-reducer";
import {dialogsReducer} from "./dialogs-reducer";
import {sideBarReducer} from "./sideBar-reducer";
import {usersReducer} from "./users-reducer";



export type AppStateType = ReturnType<typeof rootReducer>
export type storeType= typeof store;

let rootReducer= combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    sideBar: sideBarReducer,
    usersPage: usersReducer

});

export let store= createStore(rootReducer)

// @ts-ignore
window.store=store

