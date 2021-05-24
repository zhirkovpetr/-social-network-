import {createStore, combineReducers, applyMiddleware} from "redux"
import {profileReducer} from "./profile-reducer";
import {dialogsReducer} from "./dialogs-reducer";
import {sideBarReducer} from "./sideBar-reducer";
import {usersReducer} from "./users-reducer";
import {authReducer} from "./auth-reducer";
import thunk from 'redux-thunk'



export type AppStateType = ReturnType<typeof rootReducer>
export type storeType= typeof store;

let rootReducer= combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    sideBar: sideBarReducer,
    usersPage: usersReducer,
    auth: authReducer,

});

export let store= createStore(rootReducer, applyMiddleware(thunk))

// @ts-ignore
window.store=store

