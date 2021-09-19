import React from "react";
import s from "./Users.module.css";
import defAvatar from "../../images/default-avatar.jpg";
import Preloader from "../Common/Preloader/Preloader";
import {NavLink} from "react-router-dom";

let Users = (props) => {

    let clickUnflw = (id) => {
        props.setUserUnfollowThunk(id);
    }

    let clickFlw = (id) => {
        props.setUserFollowThunk(id);
    }

    let userList = props.users.map((el) => {
        return (
            <div className={s.userWrapper}>
                <div className={s.avatarBlock}>
                    <NavLink to={"/profile/" + el.id}>
                        <img className={s.avatarImg} src={el.photos.small != null ? el.photos.small : defAvatar}
                             alt=""/>
                    </NavLink>
                    {el.followed
                        ? <button className={s.followButton}
                            /* disabled={props.isFollowingInProgress.some( id => id === el.id) }*/
                                  onClick={() => {
                                      clickUnflw(el.id)
                                  }}> Отписаться </button>
                        : <button className={s.followButton}
                            /*disabled={props.isFollowingInProgress}*/
                                  onClick={() => {
                                      clickFlw(el.id)
                                  }}> Подписаться </button>
                    }
                </div>
                <div className={s.userBlock}>
                    <p>id: {el.id}</p>
                    <p>Пользователь: {el.name}</p>
                    <p>Статус: {el.status}</p>
                </div>
                <div className={s.locationBlock}>
                    {/* <p>Город: {el.location.city}</p>
                        <p>Страна: {el.location.country}</p>*/}
                </div>
            </div>
        )
    });

    ///////////////////////////////////////
    return (
        <div className={s.main}>
            {props.isFetching ? <Preloader/> : userList}
        </div>
    )
}

export default Users;