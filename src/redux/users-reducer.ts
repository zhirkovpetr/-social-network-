import {usersAPI} from '../API/api';
import {AppStateType, AppThunkType} from './redux-store';
import {ThunkDispatch} from 'redux-thunk';

//Const
const FOLLOW = 'SOCIAL_NETWORK/PROFILE/FOLLOW';
const UNFOLLOW = 'SOCIAL_NETWORK/PROFILE/UNFOLLOW';
const SET_USERS = 'SOCIAL_NETWORK/PROFILE/SET_USERS';
const SET_CURRENT_PAGE = 'SOCIAL_NETWORK/PROFILE/SET_CURRENT_PAGE';
const SET_TOTAL_USERS_COUNT = 'SOCIAL_NETWORK/PROFILE/SET_TOTAL_USERS_COUNT';
const TOGGLE_IS_FETCHING = 'SOCIAL_NETWORK/PROFILE/TOGGLE_IS_FETCHING';
const TOGGLE_FOLLOWING_IN_PROGRESS = 'SOCIAL_NETWORK/PROFILE/TOGGLE_FOLLOWING_IN_PROGRESS';

//State
export let initialState = {
    items: [] as Array<UserType>,
    pageSize: 10,
    totalCount: 0,
    currentPage: 1,
    isFetching: false,
    startPage: 1,
    followingInProgress: [] as Array<number>
}

//Reducer
export const usersReducer = (state: InitialStateType = initialState, action: UsersActionsTypes): InitialStateType => {
    switch (action.type) {
        case FOLLOW:
            return {
                ...state,
                items: state.items.map(u => {
                    if (u.id === action.userId) {
                        return {...u, followed: true}
                    }
                    return u;
                })
            }
        case UNFOLLOW:
            return {
                ...state,
                items: state.items.map(u => {
                    if (u.id === action.userId) {
                        return {...u, followed: false}
                    }
                    return u;
                })
            }
        case SET_USERS:
            return {
                ...state, items: [...action.items]
            }
        case SET_CURRENT_PAGE:
            return {
                ...state, currentPage: action.currentPage
            }
        case SET_TOTAL_USERS_COUNT:
            return {
                ...state, totalCount: action.totalCount
            }
        case TOGGLE_IS_FETCHING:
            return {
                ...state, isFetching: action.isFetching
            }
        case TOGGLE_FOLLOWING_IN_PROGRESS:
            return {
                ...state,
                followingInProgress: action.isFetching
                    ? [...state.followingInProgress, action.userId]
                    : state.followingInProgress.filter(id => id !== action.userId)
            }
        default:
            return state;
    }
}

//Action type
type followActionType = ReturnType<typeof follow>
type unFollowActionType = ReturnType<typeof unFollow>
type setUsersActionType = ReturnType<typeof setUsers>
type setCurrentPageActionType = ReturnType<typeof setCurrentPage>
type setTotalUsersCountActionType = ReturnType<typeof setTotalUsersCount>
type toggleIsFetchingActionType = ReturnType<typeof toggleIsFetching>
type toggleIsFollowingInProgressActionType = ReturnType<typeof toggleIsFollowingInProgress>

export type UsersActionsTypes = followActionType | unFollowActionType | setUsersActionType |
    setCurrentPageActionType | setTotalUsersCountActionType | toggleIsFetchingActionType |
    toggleIsFollowingInProgressActionType

//Action creator
export const follow = (userId: number) => {
    return {
        type: FOLLOW, userId
    } as const
}

export const unFollow = (userId: number) => {
    return {
        type: UNFOLLOW, userId
    } as const
}

export const setUsers = (items: Array<UserType>) => {
    return {
        type: SET_USERS, items
    } as const
}
export const setTotalUsersCount = (totalCount: number) => {
    return {
        type: SET_TOTAL_USERS_COUNT, totalCount
    } as const
}
export const setCurrentPage = (currentPage: number) => {
    return {
        type: SET_CURRENT_PAGE, currentPage
    } as const
}
export const toggleIsFetching = (isFetching: boolean) => {
    return {
        type: TOGGLE_IS_FETCHING, isFetching
    } as const
}
export const toggleIsFollowingInProgress = (userId: number, isFetching: boolean) => {
    return {
        type: TOGGLE_FOLLOWING_IN_PROGRESS, userId, isFetching
    } as const
}


//Thunk creator
export const requestUsersTC = (currentPage: number, pageSize: number): AppThunkType => {
    return async (dispatch: ThunkDispatch<AppStateType, unknown, UsersActionsTypes>) => {
        dispatch(toggleIsFetching(true));
        const response= await usersAPI.getUsers(currentPage, pageSize)
            dispatch(toggleIsFetching(false));
            dispatch(setUsers(response.data.items));
            dispatch(setTotalUsersCount(response.data.totalCount));
            dispatch(setCurrentPage(currentPage))
    }
}

export const followTC = (userId: number): AppThunkType => {
    return async (dispatch: ThunkDispatch<AppStateType, unknown, UsersActionsTypes>) => {
        dispatch(toggleIsFollowingInProgress(userId, true))
        const response= await usersAPI.followUsers(userId)
            if (response.data.resultCode === 0) {
                dispatch(follow(userId))
            }
            dispatch(toggleIsFollowingInProgress(userId, false))
        }
}

export const unFollowTC = (userId: number): AppThunkType => {
    return async (dispatch: ThunkDispatch<AppStateType, unknown, UsersActionsTypes>) => {
        dispatch(toggleIsFollowingInProgress(userId, true))
        const response= await usersAPI.unFollowUsers(userId)
            if (response.data.resultCode === 0) {
                dispatch(unFollow(userId))
            }
            dispatch(toggleIsFollowingInProgress(userId, false))
    }
}

//Type
export type InitialStateType = typeof initialState;

type PhotoType = {
    small: null | string
    large: null | string
}

export type UserType = {
    name: string
    id: number
    uniqueUrlName: null | string
    photos: PhotoType
    status: null | string
    followed: boolean
}

export type UserPageType = {
    items: Array<UserType>
    pageSize: number
    totalCount: number
    currentPage: number
    isFetching: boolean
    startPage: number
    followingInProgress: Array<number>
}
