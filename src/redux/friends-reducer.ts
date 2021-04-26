export type friendType = {
    id: string
    img: string
    follow: boolean
    name: string
    surname: string
    status: string
    location: {
        country: string
        city: string
    }
}

export type InitialStateType = typeof initialState;

const FOLLOW = "FOLLOW";
const UNFOLLOW = "UNFOLLOW";
const SET_FRIENDS = "SET_FRIENDS";

export const followAC = (friendId: string) => {
    return {
        type: FOLLOW, friendId: friendId
    } as const
}

export const unFollowAC = (friendId: string) => {
    return {
        type: UNFOLLOW, friendId: friendId
    } as const
}

export const setFriendsAC = (friends: Array<friendType>) => {
    return {
        type: SET_FRIENDS, friends: friends
    } as const
}

type followActionType = ReturnType<typeof followAC>
type unFollowActionType = ReturnType<typeof unFollowAC>
type setFriendsActionType = ReturnType<typeof setFriendsAC>

export type ActionsTypes = followActionType | unFollowActionType | setFriendsActionType

export let initialState = {
    friends: [] as Array<friendType>
}

export const friendsReducer = (state: InitialStateType = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case FOLLOW:
            return {
                ...state,
                friends: state.friends.map(u => {
                    if (u.id === action.friendId) {
                        return {...u, follow: true}
                    }
                    return u;
                })
            }

        case UNFOLLOW:
            return {
                ...state,
                friends: state.friends.map(u => {
                    if (u.id === action.friendId) {
                        return {...u, follow: false}
                    }
                    return u;
                })
            }

        case SET_FRIENDS:
            return {
                ...state, friends: [...state.friends, ...action.friends]
            }


        default:
            return state;
    }
}