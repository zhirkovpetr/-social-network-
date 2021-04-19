import React from "react";
import './App.css';
import Header from "./components/Header/Header";
import NavBar from "./components/NavBar/NavBar";
import Profile from "./components/Profile/Profile";
import Dialogs from "./components/Dialogs/Dialogs";
import {Route} from "react-router-dom";
import News from "./components/News/News";
import Music from "./components/Music/Music";
import Settings from "./components/Settings/Settings";
import {AppStateType} from "./redux/redux-store";
import {ActionsTypes} from "./redux/store";


export type AppPropsType= {
    state: AppStateType
    dispatch: (action: ActionsTypes)=> void
}

const App: React.FC <AppPropsType> = (props: AppPropsType) => {
  return (
      <div className='app-wrapper'>
        <Header/>
        <NavBar sideBar={props.state.sideBar}/>
        <div className='app-wrapper-content'>
          <Route path="/profile" render={()=> <Profile profilePage={props.state.profilePage} dispatch={props.dispatch.bind(props.state)}
                                                       messagePost={props.state.profilePage.messageForNewPost} />}/>
          <Route path="/dialogs" render={()=> <Dialogs dialogsPage={props.state.dialogsPage} dispatch={props.dispatch.bind(props.state)}
                                                       messageMessage={props.state.dialogsPage.messageForNewMessage} />}/>
          <Route path="/news" component={News}/>
          <Route path="/music" component={Music}/>
          <Route path="/settings" component={Settings}/>
        </div>
      </div>

  );
}

export default App;
