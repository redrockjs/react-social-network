import React from 'react';
import s from './Profile.module.css';
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPostsContainer from "./MyPosts/MypostsContainer"
import {SectionHeader} from "../Common/SectionHeader/SectionHeader";

const Profile = (props) => {
    return (
        <div className={s.area}>
            <SectionHeader text="User board"/>
            <ProfileInfo profilePage={props.profilePage}
                         authPage={props.authPage}
                         updateProfileStatus={props.updateProfileStatus}
                         isOwner={props.isOwner}
                         updateProfilePhoto = {props.updateProfilePhoto}
                         updateProfile = {props.updateProfile}
            />
            <MyPostsContainer/>
        </div>
    );
}

export default Profile;