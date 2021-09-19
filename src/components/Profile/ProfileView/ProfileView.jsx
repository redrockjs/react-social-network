import React from "react";

export const ProfileView = (props) => {
    return <div>
        {props.isOwner
            ? <button onClick={ ()=>{props.setEditMode(true)}}>Edit</button>
            : <span></span> }
        <p>Пользователь: {props.profilePage.profile.fullName}</p>
        <p>Обо мне: {props.profilePage.profile.aboutMe} </p>
        <p>Занятость: {props.profilePage.profile.lookingForAJob
            ? ("Ищу работу - " + props.profilePage.profile.lookingForAJobDescription)
            : "Не ищу работу"} </p>
    </div>
}