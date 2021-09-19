import {Redirect} from "react-router-dom";
import React from "react";
import {connect} from "react-redux";

// ------ HOC для редиректа на страницу логина
// Делаем обертку для компонента, передаем заданные пропсы внутрь и название компонента который оборачиваем оберткой.
let mapStateToPropsRedir = (state) => {
    return { isAuth:state.authPage.isAuth }
}

export const withAuthRedirect = (Component) => {
    class RedirectComponent extends React.Component {
        render() {
            //console.log("isAuth = " + this.props.isAuth);
            if (!this.props.isAuth) return <Redirect to="./login"/>
            return <Component {...this.props} />

        }
    }

    let authRedirectHOC = connect(mapStateToPropsRedir)(RedirectComponent);

    return authRedirectHOC;
}