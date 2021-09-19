import s from "./ProfileInfo.module.css";
import defAvatar from "../../../images/default-avatar.jpg";
import React, {useState} from "react";
import Preloader from "../../Common/Preloader/Preloader";
import {ProfileStatusWithHooks} from "../ProfileStatus/ProfileStatusWithHooks";
import {ProfileEdit} from "../ProfileEdit/ProfileEdit";
import {ProfileView} from "../ProfileView/ProfileView";

const ProfileInfo = (props) => {

    let [editMode, setEditMode] = useState(false)

    if (!props.profilePage.profile) {
        return (
            <div className={s.container}>
                <Preloader/>
            </div>
        )
    }

    let openFile = (e) => {
        if (e.target.files.length) {
            props.updateProfilePhoto(e.target.files[0]);
        }
    }

    return (
        <div className={s.container}>
            <p><ProfileStatusWithHooks profilePage={props.profilePage} authPage={props.authPage}
                                       updateProfileStatus={props.updateProfileStatus}/></p>
            <p><img className={s.avatarImg} src={props.profilePage.profile.photos.large || defAvatar} alt=""/></p>
            <p>{props.isOwner
                ? <input type="file" onChange={openFile}/>
                : <span></span>
            }
            </p>

            <p>id: {props.profilePage.profile.userId}</p>

            {editMode
                ? <ProfileEdit profilePage={props.profilePage}
                               setEditMode={setEditMode}
                               updateProfile = {props.updateProfile}
                               userId = {props.authPage.id}
                />
                : <ProfileView isOwner={props.isOwner}
                               setEditMode={setEditMode}
                               profilePage={props.profilePage}
                /> }

        </div>
    );
}
export default ProfileInfo;