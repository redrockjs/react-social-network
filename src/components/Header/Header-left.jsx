import React from 'react';
import s from './Header-left.module.css';
import logo from '../../images/meet-logo.gif';

const HeaderLeft = () => {
    return (
        <header className={s.area}>
            <img className={s.logo} src={logo} alt=""/>
        </header>
    );
}

export default HeaderLeft;