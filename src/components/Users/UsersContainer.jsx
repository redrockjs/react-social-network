import React from 'react';
import {connect} from "react-redux";
import Users from "./Users"
import {
    getUsersThunk,
    setCurrentPageAC,
    setUserFollowThunk,
    setUserUnfollowThunk
} from "../../redux/users-reducer";
import {Paginator} from "./Paginator";
import {SectionHeader} from "../Common/SectionHeader/SectionHeader";

// классоввый компонент
class UsersContainerClass extends React.Component {

    componentDidMount() {
        this.props.getUsersThunk(this.props.currentPage, this.props.pageSize);
    }

    onPageChanged = (pageNumber) => {
        this.props.setCurrentPage(pageNumber);
        this.props.getUsersThunk(pageNumber, this.props.pageSize);
    };

    render() {
        return <div>
            <SectionHeader text="Find users"/>
            <Paginator onPageChanged={this.onPageChanged}
                       currentPage={this.props.state.currentPage}
                       pageSize={this.props.state.pageSize}
                       totalUsersCount={this.props.state.totalUsersCount}
            />
            <Users users={this.props.state.users}
                   isFetching={this.props.state.isFetching}
                   getUsersThunk={this.props.getUsersThunk}
                   setUserUnfollowThunk={this.props.setUserUnfollowThunk}
                   setUserFollowThunk={this.props.setUserFollowThunk}
            />
        </div>

    };
}

let mapStateToProps = (state) => {
    return {
        state: state.usersPage
        /*users: state.usersPage.users,
        pageSize: state.usersPage.pageSize,
        totalUsersCount: state.usersPage.totalUsersCount,
        currentPage: state.usersPage.currentPage,
        isFetching: state.usersPage.isFetching,
        isFollowingInProgress: state.usersPage.isFollowingInProgress*/
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        setCurrentPage: (pageNumber) => {
            dispatch(setCurrentPageAC(pageNumber))
        },
        getUsersThunk: (currentPage, pageSize) => {
            dispatch(getUsersThunk(currentPage, pageSize))
        },
        setUserUnfollowThunk: (userId) => {
            dispatch(setUserUnfollowThunk(userId))
        },
        setUserFollowThunk: (userId) => {
            dispatch(setUserFollowThunk(userId))
        }
    }
}

let UsersContainer = connect(mapStateToProps, mapDispatchToProps)(UsersContainerClass);

export default UsersContainer;