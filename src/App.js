import './App.css';
import React, {Suspense, lazy} from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';
import NavBar from './components/Navbar/NavBar';
import Footer from './components/Footer/Footer';
import HeaderLeft from './components/Header/Header-left';
import HeaderRContainer from "./components/Header/HeaderRContainer";
import LoginConteiner from "./components/Login/Login";
import ProfileConteiner from "./components/Profile/ProfileContainer";
import DialogsContainer from "./components/Dialogs/DialogsContainer";
import UsersContainer from "./components/Users/UsersContainer";
import {Error404} from "./components/Common/Error404";


// const DialogsContainer = lazy(() => import('./components/Dialogs/DialogsContainer'));
// const UsersContainer = lazy(() => import('./components/Users/UsersContainer'));
// const ProfileConteiner = lazy(() => import('./components/Profile/ProfileContainer'));


const App = () => {
    return (
        <div className="app-wrapper">

            <HeaderLeft/>
            <HeaderRContainer/>
            <NavBar/>
            <main className="app-main">
                <Switch>


                    {/*<Suspense fallback={<div>Загрузка...</div>}>*/}
                    {/*    <Route path="/profile/:userId?" render={() => <ProfileConteiner/>}/>*/}
                    {/*    <Route path="/dialogs" render={() => <DialogsContainer/>}/>*/}
                    {/*    <Route path="/users" render={() => <UsersContainer/>}/>*/}
                    {/*</Suspense>*/}

                    <Route exact path="/login" render={() => <LoginConteiner/>}/>
                    <Route path="/profile/:userId?" render={() => <ProfileConteiner/>}/>
                    <Route path="/dialogs" render={() => <DialogsContainer/>}/>
                    <Route path="/users" render={() => <UsersContainer/>}/>

                    <Route exact path="/" render={() => <Redirect to="/profile"/>}/>
                    <Route path="*" render={() => <Error404 />}/>
                </Switch>

            </main>
            <Footer/>

        </div>
    );
}

export default App;
