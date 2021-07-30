import {applyMiddleware, combineReducers, compose, createStore} from 'redux';
import {ProfileActionsTypes, profileReducer} from './profile-reducer';
import {DialogsActionsTypes, dialogsReducer} from "./dialogs-reducer";
import {sideBarReducer} from './sideBar-reducer';
import {UsersActionsTypes, usersReducer} from './users-reducer';
import {AuthActionsTypes, authReducer} from './auth-reducer';
import thunk, {ThunkAction} from 'redux-thunk'
import {reducer as formReducer} from 'redux-form'
import {AppActionsTypes, appReducer} from './app-reducer';


export type AppStateType = ReturnType<typeof rootReducer>
export type storeType= typeof store;

let rootReducer= combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    sideBar: sideBarReducer,
    usersPage: usersReducer,
    auth: authReducer,
    form: formReducer,
    app: appReducer
});

type AppActionsType = AuthActionsTypes
    | DialogsActionsTypes
    | AppActionsTypes
    | ProfileActionsTypes
    | UsersActionsTypes

export type AppThunkType<ReturnType = void> = ThunkAction<ReturnType,
    AppStateType,
    unknown,
    AppActionsType>


declare global {
    interface Window {
        REDUX_DEVTOOLS_EXTENSION_COMPOSE?: typeof compose
    }
}

const composeEnhancers = window.REDUX_DEVTOOLS_EXTENSION_COMPOSE || compose
export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))