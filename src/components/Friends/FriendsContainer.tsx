import {connect} from "react-redux";
import {Dispatch} from "redux";
import {AppStateType} from "../../redux/redux-store";
import {followAC, friendType, InitialStateType, setFriendsAC, unFollowAC} from "../../redux/friends-reducer";
import Friends from "./Friends";

export type mapStatePropsType = {
    friends: InitialStateType
}
export type mapDispatchPropsType = {
    follow: (friendId: string) => void
    unFollow: (friendId: string) => void
    setFriends: (friends: Array<friendType>) => void
}

export type FriendsPropsType= mapStatePropsType & mapDispatchPropsType

let mapToStateToProps = (state: AppStateType): mapStatePropsType => {
    return {
        friends: state.friends
    }
}

let mapDispatchToProps = (dispatch: Dispatch): mapDispatchPropsType => {
    return {
        follow: (friendId: string) => {
            dispatch(followAC(friendId))
        },
        unFollow: (friendId: string) => {
            dispatch(unFollowAC(friendId))
        },
        setFriends: (friends: Array<friendType>) => {
            dispatch(setFriendsAC(friends))
        }
    }
}

export const FriendsContainer = connect(mapToStateToProps, mapDispatchToProps)(Friends)

