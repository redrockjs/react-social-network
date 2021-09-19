import React from "react";
import s from "./Preloader.module.css"

let Preloader = (props) => {
    return  <div className={s.preloader}>
                <div className={s.box1}></div>
                <div className={s.box2}></div>
                <div className={s.box3}></div>
                <div className={s.box4}></div>
                <div className={s.box5}></div>
            </div>
}

export default Preloader;