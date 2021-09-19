import React from "react";
import MyPosts from "./Myposts";
import {addPostAC} from "../../../redux/profile-reducer";
import {connect} from "react-redux";

let mapStateToProps = (state) => {
    return {
        posts: state.profilePage.posts,
        newPostText: state.profilePage.newPostText
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        addPost: (messageBody) => {
            dispatch(addPostAC(messageBody))
        }
    }
}

const MyPostsContainer = connect (mapStateToProps,mapDispatchToProps)(MyPosts);

export default MyPostsContainer;