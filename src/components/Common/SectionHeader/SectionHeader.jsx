import React from "react"
import s from "./SectionHeader.module.css"

export let SectionHeader = (props) => {
    return <div>
            <h1 className={s.h1}>
                {props.text}
            </h1>
        </div>
}