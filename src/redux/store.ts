import {v1} from "uuid";
import {AddPost, /*ChangePost*/ onKeyPressHandler, setUserProfile} from "./profile-reducer";
import {AddMessage, /*ChangeMessage, dialogsReducer*/} from "./dialogs-reducer";
import {sideBarReducer} from "./sideBar-reducer";

type friendsType = {
    id: string
    name: string
}
type messagesType = {
    id: string
    message: string
}
type dialogsType = {
    id: string
    name: string
}
type postsType = {
    id: string
    message: string
    likesCount: number
}
type sideBarType = {
    friends: Array<friendsType>
}
type dialogsPageType = {
    dialogs: Array<dialogsType>
    messageForNewMessage: string
    messages: Array<messagesType>
}
type profilePageType = {
    messageForNewPost: string
    posts: Array<postsType>
}
type rootStateType = {
    profilePage: profilePageType
    dialogsPage: dialogsPageType
    sideBar: sideBarType
}

type storeType = {
    _state: rootStateType
    _RenderEntireTree: () => void
    getState: () => rootStateType
    subscribe: (callback: () => void) => void
    dispatch: (action: ActionsTypes) => void
}

export type ActionsTypes = AddPostActionType /*| ChangePostActionType */| onKeyPressHandlerActionType
    | AddMessageActionType /* | ChangeMessageActionType*/ | setUserProfileActionType

type AddPostActionType = ReturnType<typeof AddPost>
/*type ChangePostActionType = ReturnType<typeof ChangePost>*/
type onKeyPressHandlerActionType = ReturnType<typeof onKeyPressHandler>
type setUserProfileActionType = ReturnType<typeof setUserProfile>

type AddMessageActionType = ReturnType<typeof AddMessage>
/*type ChangeMessageActionType = ReturnType<typeof ChangeMessage>*/




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
        /*this._state.profilePage = profileReducer(this._state.profilePage, action)*/
     /*   this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action)*/
        this._state.sideBar = sideBarReducer(this._state.sideBar, action)
        store._RenderEntireTree();

    }
}


