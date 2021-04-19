import React from "react";
import './index.css';
import ReactDOM from "react-dom";
import {BrowserRouter} from "react-router-dom";
import App from "./App";
import {AppStateType, store} from "./redux/redux-store";

const RenderEntireTree = (state: AppStateType) => {
    ReactDOM.render(
        <React.StrictMode>
            <BrowserRouter>
                <App state={state} store={store}/>
            </BrowserRouter>
        </React.StrictMode>,
        document.getElementById('root')
    );
}


RenderEntireTree(store.getState());

store.subscribe(()=>{
    let state= store.getState();
    RenderEntireTree(state)

});




