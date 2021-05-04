import {connect} from "react-redux";
import {Dispatch} from "redux";
import {AppStateType} from "../../redux/redux-store";
import {followAC, setUsersAC, unFollowAC, UserType} from "../../redux/users-reducer";
import Users from "./Users";

export type mapStatePropsType = {
    usersPage:  Array<UserType>
}

export type UsersPropsType = mapStatePropsType & mapDispatchPropsType;


export type mapDispatchPropsType = {
    follow: (userId: string) => void
    unFollow: (userId: string) => void
    setUsers: (users: Array<UserType>) => void
}


let mapToStateToProps = (state: AppStateType): mapStatePropsType => {
    return {
        usersPage: state.usersPage.users
}
}

let mapDispatchToProps = (dispatch: Dispatch): mapDispatchPropsType => {
    return {
        follow: (userId: string) => {
            dispatch(followAC(userId))
        },
        unFollow: (userId: string) => {
            dispatch(unFollowAC(userId))
        },
        setUsers: (users: Array<UserType>) => {
            dispatch(setUsersAC(users))
        }
    }
}

export const UsersContainer = connect(mapToStateToProps, mapDispatchToProps)(Users)

