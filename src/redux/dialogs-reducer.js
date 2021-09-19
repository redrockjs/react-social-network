const ADD_MSG = "ADD-MSG";

let initialState =
    {
        users: [
            {id: 1, name: 'Valera'},
            {id: 2, name: 'Dima'},
            {id: 3, name: 'Alex'},
            {id: 4, name: 'Lena'},
            {id: 5, name: 'Anna'},
            {id: 6, name: 'Natasha'}
        ],
        messages: [
            {id: 1, message: "Здорова"},
            {id: 2, message: "Как дела?"},
            {id: 3, message: "Хорошо"}
        ],
        newMsgText: "Абра-Кадабра"
    };

const messageReducer = (state = initialState, action) => {
    // здесь обрабатывается та ф-ция которую диспачем передают из фронта
    switch (action.type) {
        case ADD_MSG:
            let newMesssage = {
                id: 999,
                message: action.messageBody
            };
            return { // так пишется по новому способу, сразу возвращаем новый объект с новыми значениями, так короче и моднее
                ...state,
                messages: [...state.messages, newMesssage]
            }

        default:
            return state;
    }
}

//Смысл такой, выносим и прячем все открытые данные и ф-ции в бизнес-логику т.е. в стейт(стор)
// Выносим в reducer все ActionCreator
export let addMsgActCtr = (messageBody) => {
    return {type: ADD_MSG,messageBody}
};

export default messageReducer;