import React from 'react';
import s from './NavBar.module.css';
import {NavLink} from "react-router-dom";

const NavBar = () => {
    return (
        <nav className={s.area}>
            <h2 className={s.h2}>menu</h2>
            <ul className={s.menu}>
                <li><NavLink to="/profile">Profile</NavLink></li>
                <li><NavLink to="/dialogs">Messages</NavLink></li>
                <li><a href="/news">News</a></li>
                <li><a href="/music">Music</a></li>
                <li>-</li>
                <li><a href="/login">Login</a></li>
                <li>-</li>
                <li><NavLink to="/users">Find users</NavLink></li>
            </ul>
        </nav>
    );
}

export default NavBar;