import React from "react";
import './App.css';
import Header from "./components/Header/Header";
import NavBar from "./components/NavBar/NavBar";
import Profile from "./components/Profile/Profile";
import {Route} from "react-router-dom";
import News from "./components/News/News";
import Music from "./components/Music/Music";
import Settings from "./components/Settings/Settings";
import {AppStateType} from "./redux/redux-store";
import DialogsContainer from "./components/Dialogs/DialogsContainer";


export type AppPropsType = {
    state: AppStateType
}

const App: React.FC<AppPropsType> = (props: AppPropsType) => {
    return (
        <div className='app-wrapper'>
            <Header/>
            <NavBar sideBar={props.state.sideBar}/>
            <div className='app-wrapper-content'>
                <Route path="/profile" render={() => <Profile />}/>
                <Route path="/dialogs" render={() => <DialogsContainer />}/>
                <Route path="/news" component={News}/>
                <Route path="/music" component={Music}/>
                <Route path="/settings" component={Settings}/>
            </div>
        </div>

    );
}

export default App;
