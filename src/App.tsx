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
import {addPostCallback, changeMessageCallback, rootStateType} from "./redux/state";


type AppPropsType= {
    state: rootStateType
    addPostCallback: (post: string)=> void
    addMessageCallback: (message: string)=> void
    changePostCallback:(newPost: string)=> void
    changeMessageCallback:(newMessage: string) => void

}


const App: React.FC <AppPropsType> = (props: AppPropsType) => {
  return (
      <div className='app-wrapper'>
        <Header/>
        <NavBar sideBar={props.state.sideBar}/>
        <div className='app-wrapper-content'>
          <Route path="/profile" render={()=> <Profile profilePage={props.state.profilePage} changePostCallback={props.changePostCallback}
                                                       messagePost={props.state.profilePage.messageForNewPost} addPostCallback={props.addPostCallback}/>}/>
          <Route path="/dialogs" render={()=> <Dialogs dialogsPage={props.state.dialogsPage} addMessageCallback={props.addMessageCallback}
                                                       changeMessageCallback={props.changeMessageCallback} messageMessage={props.state.dialogsPage.messageForNewMessage} />}/>
          <Route path="/news" component={News}/>
          <Route path="/music" component={Music}/>
          <Route path="/settings" component={Settings}/>
        </div>
      </div>

  );
}

export default App;
