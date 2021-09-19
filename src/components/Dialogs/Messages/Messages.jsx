import React from 'react';
import s from '../Dialogs.module.css';

const Messages = (props) => {
    return (
        <div>
            <div className={s.messageText}> {props.text} </div>
        </div>
    );
};

export default Messages;