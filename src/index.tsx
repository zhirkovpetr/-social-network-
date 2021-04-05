import React from "react";
import './index.css';
import {rootStateType, state, subscribe} from "./redux/state";
import {
    addMessageCallback,
    addPostCallback,
    changeMessageCallback,
    changePostCallback,
   } from "./redux/state";
import ReactDOM from "react-dom";
import {BrowserRouter} from "react-router-dom";
import App from "./App";

const RenderEntireTree = () => {
    ReactDOM.render(
        <React.StrictMode>
            <BrowserRouter>
                <App state={state} addPostCallback={addPostCallback} addMessageCallback={addMessageCallback} changePostCallback={changePostCallback}
                     changeMessageCallback={changeMessageCallback}/>
            </BrowserRouter>
        </React.StrictMode>,
        document.getElementById('root')
    );
}
RenderEntireTree()
subscribe(RenderEntireTree);



