import {webAPI} from "../api/api";

const FOLLOW = "FOLLOW";
const UNFOLLOW = "UNFOLLOW";
const SET_USERS = "SET_USERS";
const SET_CURRENT_PAGE = "SET_CURRENT_PAGE";
const SET_TOTAL_COUNT = " SET_TOTAL_COUNT";
const TOGGLE_ISFETCHING = "TOGGLE_ISFETCHING";
const TOGGLE_FOLLOWING_IN_PROGRESS = "TOGGLE_FOLLOWING_IN_PROGRESS";

let initialState = {
    users: [],
    pageSize: 50,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false,
    isFollowingInProgress: []  /*false*/
};

// здесь обрабатывается та ф-ция которую диспачем передают из фронта
///////////////////////////////////////////////////////////////////////////////////
/////// Reducer
///////////////////////////////////////////////////////////////////////////////////

const usersReducer = (state = initialState, action) => {

    switch (action.type) {
        case FOLLOW:

            return {
                ...state,
                users: state.users.map(u => {
                        if (u.id === action.userId) {
                            return {...u, followed: true}
                        }
                        return u;
                    }
                )
            }

        case UNFOLLOW:
            return {
                ...state,
                users: state.users.map(u => {
                        if (u.id === action.userId) {
                            return {...u, followed: false}
                        }
                        return u;
                    }
                )
            }

        case SET_USERS:
            return {
                ...state,
                users: [...action.users]
            }

        case TOGGLE_ISFETCHING:
            return {
                ...state,
                isFetching: action.isFetch
            }

        case SET_CURRENT_PAGE:
            return {
                ...state,
                currentPage: action.pageNumber
            }

        case  SET_TOTAL_COUNT:
            return {
                ...state,
                totalUsersCount: action.totalCount
            }

        case  TOGGLE_FOLLOWING_IN_PROGRESS:
            return {
                ...state,
                isFollowingInProgress: action.isFetching
                    ? [...state.isFollowingInProgress = action.userId]
                    : state.isFollowingInProgress.filter(id => id != action.userId)
            }

        default:
            return state;
    }
}

///////////////////////////////////////////////////////////////////////////////////
/////// Action Creators
///////////////////////////////////////////////////////////////////////////////////

export let followAC = (userId) => {
    return {type: FOLLOW, userId: userId}
}

export let unfollowAC = (userId) => {
    return {type: UNFOLLOW, userId: userId}
}

export let setUserAC = (users) => {
    return {type: SET_USERS, users}
}

export let toggleIsFetchingAC = (isFetch) => {
    return {type: TOGGLE_ISFETCHING, isFetch}
}

export let setCurrentPageAC = (pageNumber) => {
    return {type: SET_CURRENT_PAGE, pageNumber}
}

export let setTotalCountAC = (totalCount) => {
    return {type: SET_TOTAL_COUNT, totalCount}
}

export let toggleIsFollowingInProgressAC = (isFollowingInProgress, userId) => {
    return {type: TOGGLE_FOLLOWING_IN_PROGRESS, isFollowingInProgress, userId}
}

///////////////////////////////////////////////////////////////////////////////////
/////// Thunk Creators
///////////////////////////////////////////////////////////////////////////////////

//Get user list
export let getUsersThunk = (currentPage, pageSize) => {
    return (dispatch) => {
        dispatch(toggleIsFetchingAC(true));
        webAPI.getUsers(currentPage, pageSize)
            .then(response => {
                dispatch(toggleIsFetchingAC(false));
                dispatch(setUserAC(response.items));
                dispatch(setTotalCountAC(response.totalCount));
            });
    }
}
// Set *unfollow* state from status list
export let setUserUnfollowThunk = (id) => {
    return (dispatch) => {
        toggleIsFollowingInProgressAC(true, id);
        webAPI.deleteFollow(id)
            .then(response => {
                if (response.resultCode === 0) {
                    dispatch(unfollowAC(id));
                    dispatch(toggleIsFollowingInProgressAC(false, id));
                }
            })
    }
}
// Set *follow* state from status list
export let setUserFollowThunk = (id) => {
    return (dispatch) => {
        toggleIsFollowingInProgressAC(true, id);
        webAPI.setFollow(id)
            .then(response => {
                if (response.resultCode === 0) {
                    dispatch(followAC(id));
                    dispatch(toggleIsFollowingInProgressAC(false, id));
                }
            })

    }
}

export default usersReducer;