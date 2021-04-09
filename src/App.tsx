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
import {rootStateType, storeType} from "./redux/state";


type AppPropsType= {
    store: storeType
}


const App: React.FC <AppPropsType> = (props: AppPropsType) => {
  return (
      <div className='app-wrapper'>
        <Header/>
        <NavBar sideBar={props.store._state.sideBar}/>
        <div className='app-wrapper-content'>
          <Route path="/profile" render={()=> <Profile profilePage={props.store._state.profilePage} dispatch={props.store.dispatch.bind(props.store)}
                                                       messagePost={props.store._state.profilePage.messageForNewPost} />}/>
          <Route path="/dialogs" render={()=> <Dialogs dialogsPage={props.store._state.dialogsPage} dispatch={props.store.dispatch.bind(props.store)}
                                                       messageMessage={props.store._state.dialogsPage.messageForNewMessage} />}/>
          <Route path="/news" component={News}/>
          <Route path="/music" component={Music}/>
          <Route path="/settings" component={Settings}/>
        </div>
      </div>

  );
}

export default App;
