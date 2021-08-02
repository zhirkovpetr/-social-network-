import React from 'react';
import './App.css';
import {BrowserRouter, Route, withRouter} from 'react-router-dom';
import News from './components/News/News';
import Music from './components/Music/Music';
import {Settings} from './components/Settings/Settings';
import {DialogsContainer} from './components/Dialogs/DialogsContainer';
import {NavbarContainer} from './components/NavBar/NavBarContainer';
import {UsersContainer} from './components/Users/UsersContainer';
import ProfileContainer from './components/Profile/ProfileContainer';
import {HeaderContainer} from './components/Header/HeaderContainer';
import Login from './components/Login/Login';
import {connect, Provider} from 'react-redux';
import {compose} from "redux";
import {initializedTC} from './redux/app-reducer';
import {AppStateType, store} from './redux/redux-store';
import {Preloader} from './common/Preloader/Preloader';


export type mapDispatchPropsType = {
    initializedTC: () => void
}

export type mapStatePropsType = {
    initialized: boolean
}

export type AppComponentPropsType = mapDispatchPropsType & mapStatePropsType;

class App extends React.PureComponent<AppComponentPropsType> {

    componentDidMount() {
        this.props.initializedTC()
    }

    render() {
        if(!this.props.initialized) {
            return <Preloader/>
        }

        return (
            <div className='app-wrapper'>
                <HeaderContainer/>
                <NavbarContainer/>
                <div className='app-wrapper-content'>
                    <Route path='/profile/:userId?' render={() => <ProfileContainer/>}/>
                    <Route path='/dialogs' render={() => <DialogsContainer/>}/>
                    <Route path='/news' component={News}/>
                    <Route path='/friends' render={() => <UsersContainer/>}/>
                    <Route path='/music' component={Music}/>
                    <Route path='/settings' component={Settings}/>
                    <Route path='/login' component={Login}/>
                </div>
            </div>

        );
    }
}

let mapToStateToProps = (state: AppStateType): mapStatePropsType => {
    return {
       initialized: state.app.isInitialized
    }
}

let AppContainer= compose<React.ComponentType>(
    withRouter,
    connect(mapToStateToProps,{initializedTC}))(App)

const SamuraiJSApp=()=> {
    return (
        <BrowserRouter>
            <Provider store={store}>
                <AppContainer />
            </Provider>
        </BrowserRouter>
    )
}

export default SamuraiJSApp;