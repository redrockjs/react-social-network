import * as axios from "axios";

// Create ax - Axios instance

const ax = axios.create(
    {
        baseURL: "https://social-network.samuraijs.com/api/1.0/",
        withCredentials: true,
        headers: {
            "API-KEY": "93fe7188-b019-42f7-9599-9ac49800e319"
        }
    });

export const webAPI = {
    // Get Users list from REST API with params
    getUsers(currentPage = 1, pageSize = 10) {
        return (
            ax.get(`users/?page=${currentPage}&count=${pageSize}`)
                .then(response => {
                    return response.data
                })
        )
    },
    // Get authentification status from REST API
    getAuth() {
        return (
            ax.get(`auth/me`)
                .then(response => {
                    return response.data
                })
        )
    },
    setAuth(userEmail, password, rememberMe = true, captcha = null) {
        return (
            ax.post(`auth/login`, {email: userEmail, password: password, rememberMe: rememberMe,  captcha:captcha})
                .then(response => {
                    return response.data
                })
        )
    },
    deleteAuth() {
        return (
            ax.delete(`auth/login`)
                .then(response => {
                    return response.data
                })
        )
    },
    getCaptcha() {
        return (
            ax.get(`security/get-captcha-url`)
                .then(response => {
                    return response.data
                })
        )
    },
    // Get user profile from REST API
    getProfile(userId) {
        return (
            ax.get(`profile/${userId}`)
                .then(response => {
                    return response.data
                })
        )
    },
    updateProfile(data) {
        return (
            ax.put(`profile`, data)
                .then(response => {
                    return response.data
                })
        )
    },
    // Get status from REST API
    getProfileStatus(userId) {
        return (
            ax.get(`profile/status/${userId}`)
                .then(response => {
                    return response.data
                })
        )
    },
    updateProfileStatus(statusText) {
        return (
            ax.put(`profile/status`, {status: statusText})
                .then(response => {
                    return response.data
                })
        )
    },
    updateProfilePhoto(image) {
        const formData = new FormData();
        formData.append("image", image)
        return ax.put(`profile/photo`, formData, {headers: {'Content-Type': 'multipart/form-data'}})
    },
    // Set follow status from REST API
    setFollow(id) {
        return (
            ax.post(`follow/${id}`, {})
                .then(response => {
                    return response.data
                })
        )
    },
    // Set unfollow status from REST API
    deleteFollow(id) {
        return (
            ax.delete(`follow/${id}`)
                .then(response => {
                    return response.data
                }))
    }

}
