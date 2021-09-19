import s from "./Myposts.module.css";
import React from "react";
import Post from "./Posts/Posts";
import {Field, reduxForm} from "redux-form";

const MyPosts = (props) => {

    let postList = props.posts.map(el => <Post text={el.text} likes={el.likes}/>); //ES6 свёртка данных

    let sendNewMessage = (value) => {
        props.addPost(value.mypostbody);
    }

    return (
        <div className={s.postBlock}>
            <h3>My posts</h3>
            <SendNewPostRdxForm onSubmit={sendNewMessage}/>
            <div className={s.posts}>
                {postList}
            </div>

        </div>
    );
}

const SendNewPostForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field className={s.PostTextarea}
                       component={"textarea"}
                       name={"mypostbody"}
                       placeholder={"Введите сообщение"}/>
            </div>
            <div>
                <button>Отправить</button>
            </div>
        </form>
    )
}

const SendNewPostRdxForm = reduxForm({
    form: 'mypostSendMessage'
})(SendNewPostForm)


export default MyPosts;