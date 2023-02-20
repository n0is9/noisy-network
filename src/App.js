//Dymuch X Me
// import React from 'react';
// import { Routes, Route, Link } from 'react-router-dom';
// import './App.css';
// import Header from './Components/Header/Header'
// import Navbar from './Components/Navbar/Navbar'
// import DialogsContainer from "./Components/Dialogs/DialogsContainer";
// import UsersContainer from "./Components/Users/UsersContainer";
// import ProfileContainer from "./Components/Profile/ProfileContainer";
//
//
// const App = () => {
//     return (
//         <div className='app-wrapper'>
//             <Header/>
//             <Navbar/>
//             <div className='app-wrapper-content'>
//                 <Routes>
//                     <Route path='/profile/:userId' element={<ProfileContainer />} />
//                     <Route path='/profile' element={<ProfileContainer />} />
//                     <Route path='/dialogs' element={<DialogsContainer/>}/>
//                     <Route path='/users' element={<UsersContainer/>}/>
//                 </Routes>
//
//             </div>
//         </div>
//     )
// }
// export default App;


//Fox1k ***
import React, {Suspense, lazy } from 'react';
import {Routes, Route, Link, useNavigate, withRouter, BrowserRouter, HashRouter} from 'react-router-dom';
import './App.css';
import Navbar from './Components/Navbar/Navbar'
//import DialogsContainer from "./Components/Dialogs/DialogsContainer";
import UsersContainer from "./Components/Users/UsersContainer";
//import ProfileContainer from "./Components/Profile/ProfileContainer";
import HeaderContainer from "./Components/Header/HeaderContainer";
//import Login from "./Components/Login/Login";
import {connect, Provider} from "react-redux";
import {getAuthUserData} from "./redux/auth-reducer";
import {compose} from "redux";
import {initializeApp} from "./redux/app-reducer";
import Preloader from "./Components/common/Preloader/Preloader";
import store from "./redux/redux-store";


const DialogsContainer = React.lazy(() => import('./Components/Dialogs/DialogsContainer'));
const ProfileContainer = React.lazy(() => import('./Components/Profile/ProfileContainer'));
const Login = React.lazy(() => import('./Components/Login/Login'));

class App extends React.Component {
    componentDidMount() {
        this.props.initializeApp()
    }

    render() {
        if (!this.props.initialized) {
            return <Preloader/>
        }
        return (
            <div className='app-wrapper'>
                <HeaderContainer/>
                <Navbar/>
                <div className='app-wrapper-content'>
                    <Suspense fallback={<Preloader/>}>
                        <Routes>
                            <Route path='/profile/:userId' element={<ProfileContainer/>}/>
                            <Route path='/profile' element={<ProfileContainer/>}/>
                            <Route path='/dialogs' element={<DialogsContainer/>}/>
                            <Route path='/users' element={<UsersContainer/>}/>
                            <Route path='/login' element={<Login/>}/>
                        </Routes>
                    </Suspense>

                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    initialized: state.app.initialized
})


let AppContainer = connect(mapStateToProps, {initializeApp})(App);

const SamuraiJSApp = (props) => {
    return <HashRouter basename={process.env.PUBLIC_URL}>
        <Provider store={store}>
            <AppContainer/>
        </Provider>
    </HashRouter>
}
export default SamuraiJSApp
