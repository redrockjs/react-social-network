import {webAPI} from "../api/api";

const ADD_POST = "ADD_POST";
const SET_PROFILE = "SET_PROFILE";
const UPDATE_PROFILE = "UPDATE_PROFILE";
const SET_PROFILE_STATUS = "SET_PROFILE_STATUS";
const SET_PROFILE_PHOTO = "SET_PROFILE_PHOTO";

let initialState = {
    profile: null,
    posts: [
        {id: 1, text: "Я сегодня буду готовить очень вкусный шашлык-машлык", likes: 5},
        {id: 2, text: "Приглашаю всех в гости попробовать сегодняшний кулинарный шедевр ))", likes: 7}
    ],
    newPostText: "Всем привет!",
    statusText: ""
};

///////////////////////////////////////////////////////////////////////////////////
/////// Reducer
///////////////////////////////////////////////////////////////////////////////////

const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_POST:
            let newPost = {
                id: 999,
                text: action.mypostbody,
                likes: 0
            };
            // так пишется новым способом, сразу возвращаем новый объект с новыми значениями, так короче и моднее
            return {
                ...state,
                posts: [...state.posts, newPost],
                //newPostText: ""
            }

        case SET_PROFILE:
            return {
                ...state,
                profile: action.profile
            }

        case SET_PROFILE_STATUS:
            return {
                ...state,
                statusText: action.statusText
            }
        case SET_PROFILE_PHOTO:
            console.log(action.photos);
            return { ...state, profile: {...state.profile, photos: action.photos }}

        default:
            return state;
    }
}

///////////////////////////////////////////////////////////////////////////////////
/////// Action Creators
///////////////////////////////////////////////////////////////////////////////////

export let addPostAC = (mypostbody) => {
    return {type: ADD_POST, mypostbody}
};

export let setProfileAC = (data) => {
    return {type: SET_PROFILE, profile: data}
}

export let updateProfileAC = (data) => {
    return {type: UPDATE_PROFILE, profile: data}
}

export let setProfileStatusAC = (data) => {
    return {type: SET_PROFILE_STATUS, statusText: data}
}

export let setProfilePhotoAC = (photos) => {
    return {type: SET_PROFILE_PHOTO, photos}
}

///////////////////////////////////////////////////////////////////////////////////
/////// Thunk Creators
///////////////////////////////////////////////////////////////////////////////////

export let getProfileThunk = (userId) => (dispatch) => {
    /*if (!userId) {
        userId = 1045;
    }*/
    webAPI.getProfile(userId)
        .then(response => {
            dispatch(setProfileAC(response));
        });
}

export let updateProfileThunk = (userId,data) => (dispatch) => {
    webAPI.updateProfile(data)
        .then(response => {
            if (response.resultCode === 0) {
                dispatch(getProfileThunk(userId));
            } else {
                console.log(response.data)
            }
        });
}


export let getProfileStatusThunk = (userId) => (dispatch) => {
    webAPI.getProfileStatus(userId)
        .then(response => {
            dispatch(setProfileStatusAC(response));
        });
}

export let updateProfileStatusThunk = (statusText) => (dispatch) => {
    webAPI.updateProfileStatus(statusText)
        .then(response => {
            dispatch(setProfileStatusAC(statusText));
        });
}

export let updateProfilePhotoThunk = (image) => async (dispatch) => {
    let response= await webAPI.updateProfilePhoto(image)
    if (response.data.resultCode === 0) {
        dispatch(setProfilePhotoAC(response.data.data.photos));
    }
}

export default profileReducer;