import React from "react";
import s from "./Paginator.module.css";

export let Paginator = (props) => {

    let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize);
    let pages = [];

    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }

    let pageslist = pages.map(p => {
        return <span onClick={() => {
            props.onPageChanged(p)
        }} className={props.currentPage === p ? s.selectedPage : ""}> {p} </span>
    });

    return <div className={s.pagesListBlock}>
        {pageslist}
    </div>
}
