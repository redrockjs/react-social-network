import React from 'react';
import {connect} from "react-redux";
import Profile from "./Profile";
import {
    getProfileStatusThunk,
    getProfileThunk,
    updateProfilePhotoThunk,
    updateProfileStatusThunk,
    updateProfileThunk
} from "../../redux/profile-reducer";
import {withRouter} from "react-router-dom";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {compose} from "redux";

class ProfileClass extends React.Component {

    refreshProfile() {
        let userId = this.props.match.params.userId;

        if (!userId) {
            userId = this.props.authPage.id;
            if (!userId) {
                this.props.history.push("/login");
            }
        }
        this.props.getProfile(userId);
        this.props.getProfileStatus(userId);
    }

    componentDidMount() {
        this.refreshProfile();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.match.params.userId !== prevProps.match.params.userId) {
            this.refreshProfile();
        }
    }

    render() {
        return <div>
            <Profile profilePage={this.props.profilePage}
                     authPage={this.props.authPage}
                     updateProfileStatus={this.props.updateProfileStatus}
                     isOwner={!this.props.match.params.userId}
                     updateProfilePhoto={this.props.updateProfilePhoto}
                     updateProfile = {this.props.updateProfile}
            />
        </div>
    };
}

let mapStateToProps = (state) => {
    return {
        profilePage: state.profilePage,
        authPage: state.authPage
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        getProfile: (userId) => {
            dispatch(getProfileThunk(userId));
        },
        getProfileStatus: (userId) => {
            dispatch(getProfileStatusThunk(userId));
        },
        updateProfileStatus: (status) => {
            dispatch(updateProfileStatusThunk(status));
        },
        updateProfilePhoto: (image) => {
          dispatch(updateProfilePhotoThunk(image));
        },
        updateProfile: (userId,data) => {
            dispatch(updateProfileThunk(userId,data))
        }
    }
}

// Compose служит для обертки функций, справа налево, удобно для подключения хоков
let ProfileConteiner = compose(connect(mapStateToProps, mapDispatchToProps), withRouter, withAuthRedirect)(ProfileClass);

export default ProfileConteiner;
