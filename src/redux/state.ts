import {v1} from "uuid";


export type friendsType= {
    id: string
    name: string
}
export type messagesType= {
    id: string
    message: string
}
export type dialogsType= {
    id: string
    name: string
}
export type postsType= {
    id: string
    message: string
    likesCount: number
}
export type sideBarType= {
    friends: Array<friendsType>
}
export type dialogsPageType= {
    dialogs: Array<dialogsType>
    messageForNewMessage: string
    messages: Array<messagesType>
}
export type profilePageType= {
    messageForNewPost: string
    posts: Array<postsType>
}
export type rootStateType= {
    profilePage: profilePageType
    dialogsPage: dialogsPageType
    sideBar: sideBarType
}

let RenderEntireTree=()=> {}
export const subscribe=(callback: ()=> void)=> {
    RenderEntireTree= callback
}

export let state: rootStateType = {
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
}

export const changePostCallback = (newPost: string) => {
    state.profilePage.messageForNewPost=newPost
    RenderEntireTree();
}
export const addPostCallback = (post: string) => {
   const newPost: postsType= {id: v1(), message: post, likesCount: 0};
   state.profilePage.posts.push(newPost);
    RenderEntireTree();
}



export const changeMessageCallback = (newMessage: string) => {
    state.dialogsPage.messageForNewMessage= newMessage;
    RenderEntireTree();
}
export const addMessageCallback = (message: string) => {
    const newMessage: messagesType= {id: v1(), message: message};
    state.dialogsPage.messages.push(newMessage);
    RenderEntireTree();
}



