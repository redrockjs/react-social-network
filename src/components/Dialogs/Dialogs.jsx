import React from 'react';
import s from './Dialogs.module.css';
import Messages from "./Messages/Messages";
import UserList from "./UserList/UserList";
import {Field, reduxForm} from "redux-form";
import {SectionHeader} from "../Common/SectionHeader/SectionHeader";

const Dialogs = (props) => {
    let usersList = props.users.map((el) => {
            return (
                <UserList name={el.name} id={el.id}/>   /* ф-ция свёртки массива в стиле ES5 */
            );
        }
    );

    let messagesList = props.messages.map(el => <Messages text={el.message}/>); /* та же ф-ция свёртки массива в стиле ES6 */

    let addNewMessage = (values) => {
        props.addMsg(values.messageBody);
    }

    return (
        <div>
            <SectionHeader text="Dialogs"/>
            <div className={s.dialogs}>
                <div className={s.dialogsItems}>
                    <p> Друзья </p>
                    {usersList}
                </div>
                <div className={s.messageItems}>
                    <p>Сообщения</p>
                    {messagesList}
                    <AddMessageRdxForm onSubmit={addNewMessage}/>
                </div>
            </div>
        </div>
    );
}

const AddMessageForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field className={s.inputMsgTextarea} component={"textarea"} name={"messageBody"} placeholder={"Enter your message"}/>
            </div>
            <div>
                <button>Add post</button>
            </div>

        </form>
    )
}
const AddMessageRdxForm = reduxForm({
    form: 'dialogsAddMessage'
})(AddMessageForm)

export default Dialogs;