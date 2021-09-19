import React from "react";
import s from "./Users.module.css";
import * as axios from "axios";
import defAvatar from "../../images/default-avatar.jpg";

let baseUrlAPI = "https://social-network.samuraijs.com/api/1.0/";

let UsersOld = (props) => {

    if (props.users.length === 0) {
        axios.get("https://social-network.samuraijs.com/api/1.0/users").then(response =>{
          props.setUsers(response.data.items);
        } );
    }

    let clickUnflw = (id) => {
        props.clickUnfollow(id);
    }

    let clickFlw = (id) => {
        props.clickFollow(id);
    }

    let userList = props.users.map((el) => {
            return (
                <div className={s.userWrapper}>
                    <div className={s.avatarBlock}>
                        <img className={s.avatarImg}

                             src={el.photos.small != null ? el.photos.small : defAvatar }
                             alt=""/>
                        {el.followed
                            ? <button className={s.followButton} onClick={ () => {clickUnflw(el.id)} }>Отписатся</button>
                            : <button className={s.followButton} onClick={ () => {clickFlw(el.id)} }>Подписатся</button>

                        }

                    </div>
                    <div className={s.userBlock}>
                        <p>Пользователь: {el.name}</p>
                        <p>Статус: {el.status}</p>
                    </div>
                    <div className={s.locationBlock}>
                       {/* <p>Город: {el.location.city}</p>
                        <p>Страна: {el.location.country}</p>*/}
                    </div>
                </div>
            )
        }
    );

    return (
        <div className={s.main}>
            <h2 className={s.h2}>Find users</h2>
            {userList}
        </div>
    )
}

export default UsersOld;