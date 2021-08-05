import React from 'react';
import './App.css';
import {BrowserRouter, Redirect, Route, Switch, withRouter} from 'react-router-dom';
import News from './components/News/News';
import Music from './components/Music/Music';
import {Settings} from './components/Settings/Settings';
//import {DialogsContainer} from './components/Dialogs/DialogsContainer';
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
import {withSuspense} from "./hoc/withSuspense";

const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'));

export type mapDispatchPropsType = {
    initializedTC: () => void
}

export type mapStatePropsType = {
    initialized: boolean
}

export type AppComponentPropsType = mapDispatchPropsType & mapStatePropsType;

class App extends React.PureComponent<AppComponentPropsType> {

    /*catchAllUnhandleErrors= ()=> {
        alert('Some error occurred')
    }*/

    componentDidMount() {
        this.props.initializedTC()
       /* window.addEventListener('unhandledrejection', this.catchAllUnhandleErrors)*/
    }

   /* componentWillUnmount() {
        window.addEventListener('unhandledrejection', this.catchAllUnhandleErrors)
    }
*/
    render() {
        if (!this.props.initialized) {
            return <Preloader/>
        }

        return (
            <div className='app-wrapper'>
                <HeaderContainer/>
                <NavbarContainer/>
                <div className='app-wrapper-content'>
                    <Switch>
                        <Route path='/' exact><Redirect to='/profile'/></Route>
                        <Route path='/social-network' exact><Redirect to='/profile'/></Route>
                        <Route path='/profile/:userId?' render={() => <ProfileContainer/>}/>
                        <Route path='/profile/:userId?' render={() => <ProfileContainer/>}/>
                        <Route path='/dialogs' component={withSuspense(DialogsContainer)}/>
                        <Route path='/news' component={News}/>
                        <Route path='/friends' component={() => <UsersContainer/>}/>
                        <Route path='/music' component={Music}/>
                        <Route path='/settings' component={Settings}/>
                        <Route path='/login' component={Login}/>
                        <Route path='*' component={() => <div>404 NOT FOUND</div>}/>
                    </Switch>
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

let AppContainer = compose<React.ComponentType>(
    withRouter,
    connect(mapToStateToProps, {initializedTC}))(App)

const SamuraiJSApp = () => {
    return (
        <BrowserRouter>
            <Provider store={store}>
                <AppContainer/>
            </Provider>
        </BrowserRouter>
    )
}

export default SamuraiJSApp;