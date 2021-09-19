import React from "react";
import s from "../Profile/Profile.module.css";
import {Field, reduxForm} from "redux-form";
import {maxLenghtCtr, minLenghtCtr, requiredField} from "../../helpers/rdxform-validators";
import {Input} from "../Common/formControl/formControl";
import {setUserAuthThunk} from "../../redux/auth-reducer";
import {compose} from "redux";
import {connect} from "react-redux";
import {Redirect, withRouter} from "react-router-dom";
import sForm from "../Common/formControl/formControl.module.css";

let maxLenght = maxLenghtCtr(30);
let minLenght = minLenghtCtr(6);

const LoginForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field component={Input} name={"email"} placeholder={"Email"}
                       validate={[requiredField, minLenght, maxLenght]}/>
            </div>
            <div>
                <Field component={Input} name={"password"} placeholder={"Password"}
                       validate={[requiredField, minLenght]} type={"password"}/>
            </div>
            <div>
                <Field component={"input"} name={"remember"} type={"Checkbox"}/> запомнить меня
            </div>
            {props.error &&
            <div className={sForm.formControlError}>
                {props.error}
            </div>
            }

            {
                props.captchaUrl && <img src={props.captchaUrl} alt=""/>
            }
            {
                props.captchaUrl &&
                <div>
                    <Field component={"input"} name={"captcha"} placeholder={"Введите капчу"}
                           validate={[requiredField]}/>
                </div>
            }

            <div>
                <button>Войти</button>
            </div>

        </form>

    )
}

const LoginRdxForm = reduxForm({
    form: 'login'
})(LoginForm)

const Login = (props) => {
    const onSubmit = (formData) => {
        let {email, password, remember, captcha} = formData;
        props.setUserAuth(email, password, remember, captcha);
    }

    if (props.isAuth) return <Redirect to={"/profile"}/>

    return (
        <main className={s.area}>
            <h1>Login page</h1>
            <LoginRdxForm onSubmit={onSubmit} captchaUrl={props.captchaUrl}/>
        </main>
    )
}

let mapStateToProps = (state) => {
    // вместо этого коллбека можно поставить null в connect
    return {
        isAuth: state.authPage.isAuth,
        captchaUrl: state.authPage.captchaUrl
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        setUserAuth: (userEmail, password, rememberMe, captcha) => {
            dispatch(setUserAuthThunk(userEmail, password, rememberMe, captcha));
        }
    }
}

let LoginConteiner = compose(connect(mapStateToProps, mapDispatchToProps), withRouter)(Login);

export default LoginConteiner;