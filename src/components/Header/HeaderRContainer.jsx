import HeaderRight from "./Header-right";
import React from 'react'
import {connect} from "react-redux";
import {deleteUserAuthThunk, getUserAuthThunk} from "../../redux/auth-reducer";

///////////////////////////////////////////////////////////////////
/////////  Class is 3 step


class HeaderRClass extends React.Component {

    componentDidMount() {
        this.props.getUserAuth();
    }

    render() {
        return <div>
            <HeaderRight {...this.props} />
        </div>
    }
}

///////////////////////////////////////////////////////////////////
///////// Maps is 1 step

let mapStateToProps = (state) => {
    return {
        login: state.authPage.login,
        isAuth: state.authPage.isAuth,
        id: state.authPage.id
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        getUserAuth: () => {
          dispatch(getUserAuthThunk())
        },
        deleteUserAuth: () => {
          dispatch(deleteUserAuthThunk())
        }

    }
}

///////////////////////////////////////////////////////////////////
///////// Connect Maps to Class is 2 step

let HeaderRContainer = connect(mapStateToProps, mapDispatchToProps)(HeaderRClass);

export default HeaderRContainer;