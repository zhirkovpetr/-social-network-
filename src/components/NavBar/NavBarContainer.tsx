import {connect} from "react-redux";
import {Dispatch} from "redux";
import {AppStateType} from "../../redux/redux-store";
import Navbar from "./NavBar";
import {InitialStateType} from "../../redux/sideBar-reducer";

type friendsType = {
    id: string
    name: string
}
type sideBarType = {
    friends: Array<friendsType>
}
export type NavBarPropsType = {
    sideBar: sideBarType
}

type mapStatePropsType = {
    sideBar: InitialStateType
}
type mapDispatchPropsType = {}

let mapToStateToProps = (state: AppStateType): mapStatePropsType => {
    return {
        sideBar: state.sideBar
    }
}

let mapDispatchToProps = (dispatch: Dispatch): mapDispatchPropsType => {
    return {}
}

export const NavbarContainer = connect(mapToStateToProps, mapDispatchToProps)(Navbar)

