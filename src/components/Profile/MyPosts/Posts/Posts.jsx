import React from "react";

const Post = (props) => {
    return (
        <div>
            <p>{props.text}</p>
            <p>{"Likes " + props.likes}</p>
        </div>
    );
}

export default Post;