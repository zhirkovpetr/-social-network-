import axios from "axios";

const instance = axios.create({
    withCredentials: true,
    baseURL: `https://social-network.samuraijs.com/api/1.0/`,
    headers: {
        'API-KEY': 'abbdd15d-25c5-489b-bf41-880fe8431dc9'
    },
})

export const usersAPI = {
    getUsers(currentPage: number, pageSize: number) {
        return (
            instance.get(`users?page=${currentPage}&count=${pageSize}`)
                .then(response => {
                    return response.data
                })
        )
    },
    followUsers(id: string) {
        return (
            instance.post(`follow/${id}`, {})
                .then(response => {
                    return response.data
                })
        )
    },
    unFollowUsers(id: string) {
        return (
            instance.delete(`follow/${id}`, {})
                .then(response => {
                    return response.data
                })
        )
    }
}



