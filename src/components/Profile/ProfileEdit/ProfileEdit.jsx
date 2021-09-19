import React from "react";
import {Field, reduxForm} from "redux-form";
import s from "./ProfileEdit.module.css"

const ProfileEditForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <p>Пользователь: <Field component={"input"} name={"username"} placeholder={"Имя"}/></p>
            <p>Обо мне: <Field component={"input"} name={"aboutMe"} placeholder={"О себе"}/></p>
            <p>Занятость: <Field component={"input"} name={"employmentStatus"} type={"Checkbox"}/></p>
            <p>Профессиональные навыки: </p>
            <p><Field className={s.PostTextarea} component={"textarea"} name={"employCompetitions"}
                      placeholder={"Опишите свои навыки"}/></p>
            <button>Сохранить</button>
        </form>
    )
}

const ProfileEditRdxForm = reduxForm({
    form: 'profileEdit'
})(ProfileEditForm)

export const ProfileEdit = (props) => {
    const onSubmit = (formData) => {
        let {username, aboutMe, employmentStatus, employCompetitions} = formData
        let data = {
            aboutMe: aboutMe,
            lookingForAJob: employmentStatus,
            lookingForAJobDescription: employCompetitions,
            fullName: username
        }
        props.updateProfile(props.userId,data);
        props.setEditMode(false);
    }

    return (
        <div>
            <ProfileEditRdxForm onSubmit={onSubmit}/>
        </div>
    )
}
