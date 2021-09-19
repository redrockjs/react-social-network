import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import messageReducer from "./dialogs-reducer";
import profileReducer from "./profile-reducer";
import usersReducer from "./users-reducer";
import authReducer from "./auth-reducer";
import thunk from "redux-thunk";
import { reducer as formReducer } from 'redux-form'

let reducers = combineReducers({
        profilePage: profileReducer,
        messagesPage: messageReducer,
        usersPage: usersReducer,
        authPage: authReducer,
        form: formReducer
    }
);

// let store = createStore(reducers,applyMiddleware(thunk));
// Added for Redux Dev Tools
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore( reducers, /* preloadedState, */ composeEnhancers( applyMiddleware(thunk)));

window._store = store;

export default store;