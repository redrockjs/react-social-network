import profileReducer from "./profile-reducer";
import messageReducer from "./dialogs-reducer";

let store = {
    _state: {
        profilePage: {
            posts: [
                {id: 1, text: "Я сегодня буду готовить очень вкусный борщ", likes: 5},
                {id: 2, text: "Приглашаю всех в гости попробовать сегодняшний кулинарный шедевр ))", likes: 7}
            ],
            newPostText: "Всем привет!"
        },
        messagesPage: {
            users: [
                {id: 1, name: 'Valera'},
                {id: 2, name: 'Dima'},
                {id: 3, name: 'Alex'},
                {id: 4, name: 'Lena'},
                {id: 5, name: 'Anna'},
                {id: 6, name: 'Natasha'}
            ],
            messages: [
                {id:1, message: "Здорова"},
                {id:2, message: "Как дела?"},
                {id:3, message: "Хорошо"}
            ],
            newMsgText: "Абра-Кадабра"
        }
    },
    getState() {
        return this._state;
    },
    _callSubscriber() {  // callSubscriber = reRender - функция перерисовывает страницу при изменении
    },
    subscribe(observer) {
        this._callSubscriber = observer;
    },

    dispatch(action) { /*type:ADD-POST*/
            this._state.profilePage = profileReducer(this._state.profilePage,action);
            this._state.messagesPage = messageReducer(this._state.messagesPage,action);
            this._callSubscriber(this._state);
    }

};

// мониторинг state из глобального объекта window
window.state = store._state;

export default store;