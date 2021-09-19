import React from 'react'
import s from './Header-right.module.css'
import {NavLink} from "react-router-dom";

const HeaderRight = (props) => {

    let doLogout = () => {
        props.deleteUserAuth();
    }

    return (
        <header className={s.area}>
            <div className={s.loginBlock}>
            { props.isAuth
                ? props.login + " в сети c id:" + props.id
                : <NavLink to="/login">
                    Войти
                </NavLink>
            }
            </div>
            <div className={s.loginBlock}>
                { props.isAuth
                    ? <span><a href={"#exit"} onClick={doLogout}>Выйти</a></span>
                    : <span></span>
                }
            </div>
        </header>
    );
}

export default HeaderRight;