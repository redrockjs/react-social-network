import {webAPI} from "../api/api"
import {stopSubmit} from "redux-form"

//const SET_USER_ID = "SET_USER_ID"
const SET_USER_DATA = "SET_USER_DATA"
const GET_CAPTCHA_URL = "GET_CAPTCHA_URL"

let initialState = {
    id: null,
    email: null,
    login: null,
    isAuth: false,
    captchaUrl: null
}

///////////////////////////////////////////////////////////////////////////////////
/////// Reducer
///////////////////////////////////////////////////////////////////////////////////

const authReducer = (state = initialState, action) => {

    switch (action.type) {
        case SET_USER_DATA:
            return {
                ...state,
                ...state.captchaUrl = null,
                ...action.data
            }
        case GET_CAPTCHA_URL:
            return {
                ...state,
                ...action.captchaUrl,
            }
        default:
            return state
    }
}

///////////////////////////////////////////////////////////////////////////////////
/////// Action Creators
///////////////////////////////////////////////////////////////////////////////////

//export let setUserIdAC = (id) => ({type: SET_USER_ID, id: {id}})
export let setUserDataAC = (id, email, login, isAuth) => ({type: SET_USER_DATA, data: {id, email, login, isAuth}})
export let getCaptchaUrl = (captchaUrl) => ({type: GET_CAPTCHA_URL, captchaUrl: {captchaUrl}})


///////////////////////////////////////////////////////////////////////////////////
/////// Thunk Creators
///////////////////////////////////////////////////////////////////////////////////

export let getUserAuthThunk = () => (dispatch) => {
    webAPI.getAuth()
        .then(response => {
            if (response.resultCode === 0) {
                let {id, email, login} = response.data
                dispatch(setUserDataAC(id, email, login, true))
            }
        });
}

// Login
export let setUserAuthThunk = (userEmail, password, rememberMe, captcha) => (dispatch) => {
    debugger
    webAPI.setAuth(userEmail, password, rememberMe, captcha)
        .then(response => {
            if (response.resultCode === 0) {
                dispatch(getUserAuthThunk())
            } else {
                if (response.resultCode === 10) {
                    dispatch(getCaptcha())
                } else {
                    let errorMessage = response.messages.length > 0 ? response.messages[0] : "Ой! Неизвестная ошибка"
                    dispatch(stopSubmit("login", {_error: errorMessage}))
                }
            }


        });
}

//Logout
export let deleteUserAuthThunk = () => (dispatch) => {
    webAPI.deleteAuth()
        .then(response => {
            if (response.resultCode === 0) {
                dispatch(setUserDataAC(null, null, null, false))
            }
        })
}

export let getCaptcha = () => async (dispatch) => {
    try {
        let response = await webAPI.getCaptcha()
        let captchaUrl = response.url
        dispatch(getCaptchaUrl(captchaUrl))
    }
    catch (error) {
        console.log(error);
    }
}

export default authReducer;