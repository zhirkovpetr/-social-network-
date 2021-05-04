type PhotoType = {
    small: null | string
    large: null | string
}

export type UserType = {
    name: string
    id: string
    uniqueUrlName: null | string
    photos: PhotoType
    status: null | string
    followed: boolean
}

export type InitialStateType = typeof initialState;

const FOLLOW = "FOLLOW";
const UNFOLLOW = "UNFOLLOW";
const SET_USERS = "SET_USERS";

export const followAC = (userId: string) => {
    return {
        type: FOLLOW, userId: userId
    } as const
}

export const unFollowAC = (userId: string) => {
    return {
        type: UNFOLLOW, userId: userId
    } as const
}

export const setUsersAC = (users: Array<UserType>) => {
    return {
        type: SET_USERS, users: users
    } as const
}

type followActionType = ReturnType<typeof followAC>
type unFollowActionType = ReturnType<typeof unFollowAC>
type setUsersActionType = ReturnType<typeof setUsersAC>

export type ActionsTypes = followActionType | unFollowActionType | setUsersActionType

export let initialState = {
    users: [] as Array<UserType>
}

export const usersReducer = (state: InitialStateType = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case FOLLOW:
            return {
                ...state,
                users: state.users.map(u => {
                    if (u.id === action.userId) {
                        return {...u, followed: true}
                    }
                    return u;
                })
            }

        case UNFOLLOW:
            return {
                ...state,
                users: state.users.map(u => {
                    if (u.id === action.userId) {
                        return {...u, followed: false}
                    }
                    return u;
                })
            }

        case SET_USERS:
            return {
                ...state, users: [...state.users, ...action.users]
            }


        default:
            return state;
    }
}