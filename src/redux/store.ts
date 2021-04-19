import {v1} from "uuid";
import {AddPostAC, ChangePostAC, profileReducer} from "./profile-reducer";
import {AddMessageAC, ChangeMessageAC, dialogsReducer} from "./dialogs-reducer";
import {sideBarReducer} from "./sideBar-reducer";

export type friendsType = {
    id: string
    name: string
}
export type messagesType = {
    id: string
    message: string
}
export type dialogsType = {
    id: string
    name: string
}
export type postsType = {
    id: string
    message: string
    likesCount: number
}
export type sideBarType = {
    friends: Array<friendsType>
}
export type dialogsPageType = {
    dialogs: Array<dialogsType>
    messageForNewMessage: string
    messages: Array<messagesType>
}
export type profilePageType = {
    messageForNewPost: string
    posts: Array<postsType>
}
export type rootStateType = {
    profilePage: profilePageType
    dialogsPage: dialogsPageType
    sideBar: sideBarType
}

export type storeType = {
    _state: rootStateType
    _RenderEntireTree: () => void
    getState: () => rootStateType
    subscribe: (callback: () => void) => void
    dispatch: (action: ActionsTypes) => void
}
export type ActionsTypes = AddPostActionType | ChangePostActionType | AddMessageActionType | ChangeMessageActionType

type AddPostActionType = ReturnType<typeof AddPostAC>

type ChangePostActionType = ReturnType<typeof ChangePostAC>

type AddMessageActionType = ReturnType<typeof AddMessageAC>

type ChangeMessageActionType = ReturnType<typeof ChangeMessageAC>

export const store: storeType = {
    _state: {
        profilePage: {
            messageForNewPost: '',
            posts: [
                {id: v1(), message: 'Hi, how a you?', likesCount: 12},
                {id: v1(), message: "It's my first post.", likesCount: 22}
            ]
        },
        dialogsPage: {
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
        },
        sideBar: {
            friends: [
                {id: v1(), name: 'Dmitry'},
                {id: v1(), name: 'Petr'},
                {id: v1(), name: 'Andrey'}
            ]
        }
    },
    _RenderEntireTree() {
        console.log('Hello')
    },
    subscribe(callback) {
        this._RenderEntireTree = callback
    },
    getState() {
        return this._state
    },
    dispatch(action) {
        this._state.profilePage = profileReducer(this._state.profilePage, action)
        this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action)
        this._state.sideBar = sideBarReducer(this._state.sideBar, action)
        store._RenderEntireTree();

    }
}




