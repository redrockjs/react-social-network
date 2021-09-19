import React from 'react';
import {addMsgActCtr} from "../../redux/dialogs-reducer";
import Dialogs from "./Dialogs";
import {connect} from "react-redux";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {compose} from "redux";

let mapStateToProps = (state) => {
    return {
        users: state.messagesPage.users,
        messages: state.messagesPage.messages,
        newMsgText: state.messagesPage.newMsgText,
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        addMsg: (messageBody) => {
            dispatch(addMsgActCtr(messageBody))
        }
    }
}

let DialogsContainer = compose( connect(mapStateToProps, mapDispatchToProps), withAuthRedirect ) (Dialogs);

export default DialogsContainer;