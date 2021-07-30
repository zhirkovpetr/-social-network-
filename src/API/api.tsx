import axios from 'axios';
import {ProfileType} from '../redux/profile-reducer';
import {UserPageType} from '../redux/users-reducer';

const instance = axios.create({
    withCredentials: true,
    baseURL: `https://social-network.samuraijs.com/api/1.0/`,
    headers: {
        'API-KEY': 'abbdd15d-25c5-489b-bf41-880fe8431dc9'
    },
})

export const usersAPI = {
    getUsers(currentPage: number, pageSize: number) {
        return instance.get<UserPageType>(`users?page=${currentPage}&count=${pageSize}`)
    },
    followUsers(id: number) {
        return instance.post<responseType<dataType>>(`follow/${id}`, {})
    },
    unFollowUsers(id: number) {
        return instance.delete<responseType<{}>>(`follow/${id}`, {})
    },
}

export const profileAPI={
    getProfilePage(userId: number) {
        return instance.get<ProfileType>(`profile/${userId}`)
    },
    getStatus(userId: number) {
        return instance.get(`profile/status/${userId}`)
    },
    updateStatus(status: string) {
        return instance.put<responseType<{}>>(`profile/status`, {status: status})
    },
}

export const authAPI={
    me() {
        return instance.get<responseType<dataType>>(`auth/me`)
    },
    login(email: string, password: string, rememberMe: boolean) {
        return instance.post<responseType<{userId: number}>>(`auth/login`, {email, password, rememberMe})
    },
    logout() {
        return instance.delete<responseType<{}>>(`auth/login`)
    }
}

//Type
type responseType<D> = {
    resultCode: number
    messages: Array<string>
    data: D
}

type dataType= {
    id: number
    email: string
    login: string
}