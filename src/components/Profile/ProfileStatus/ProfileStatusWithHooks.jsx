import React, {useEffect, useState} from "react";

export let ProfileStatusWithHooks = (props) => {

    let [editMode, setEditMode] = useState(false);
    let [status, setStatus] = useState(props.profilePage.statusText);

    useEffect(()=>{
        setStatus(props.profilePage.statusText);
    },[props.profilePage.statusText])

    let activateEditMode = () => {
        props.authPage.authUserId !== props.profilePage.profile.userId
            ? setEditMode(true)
            : setEditMode(false)
    }

    let deactivateEditMode = (e) => {
        setEditMode(false)
        props.updateProfileStatus(status);
    }
    let statusChange = (e) => {
        setStatus(e.currentTarget.value);
    }
    return (
        <div>
            {!editMode
                ?
                <div>
                    Статус: <span onDoubleClick={activateEditMode}> {props.profilePage.statusText || "статус отсутствует"} </span>
                </div>
                :
                <div>
                    Статус: <input autoFocus={true} onBlur={deactivateEditMode} onChange={statusChange} value={status}/>
                </div>
            }
        </div>
    )
}