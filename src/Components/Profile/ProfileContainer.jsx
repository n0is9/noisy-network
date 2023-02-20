//Maxim Saharov
import React from "react";
import Profile from "./Profile";
import {connect} from "react-redux";
import {getStatus, getUserProfile, updateStatus} from "../../redux/profile-reducer";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import {compose} from "redux";
import {Navigate} from "react-router-dom";


class ProfileContainer extends React.Component {
    constructor(props) {
        super( props );
        this.state = {
            isShowMyProfile: true
        }
    }
    componentDidMount() {

        let userIdFromPath = +this.props.router.params.userId;
        let authorisedUserId = this.props.authorisedUserId;

        if (userIdFromPath) {

            this.props.getUserProfile( userIdFromPath );
            this.props.getStatus( userIdFromPath );

        } else {

            if (this.props.isAuth) {
                this.props.getUserProfile( authorisedUserId );
                this.props.getStatus( authorisedUserId );
            }
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {

        let userIdFromPath = +this.props.router.params.userId;
        let authorizedUserId = this.props.authorizedUserId;
        let isShowMyProfile = this.state.isShowMyProfile;

        if (isShowMyProfile) {

            if (userIdFromPath === authorizedUserId) {
                this.setState( {isShowMyProfile: false} )
            }

            if (!userIdFromPath && this.props.isAuth) {
                this.props.getUserProfile( authorizedUserId );
                this.props.getStatus( authorizedUserId );
                this.setState( {isShowMyProfile: false} )
            }
        }
    }

    render() {

        if (!this.props.isAuth && !this.props.router.params.userId) {
            return <Navigate to={'/login'} />
        }

        return (
            <div>
                <Profile {...this.props}
                         profile={this.props.profile}
                         status={this.props.status}
                         updateStatus={this.props.updateStatus}
                />
            </div>
        )
    }
}


// wrapper to use react router's v6 hooks in class component (to use HOC pattern, like in router v5)
function withRouter(Component) {

    function ComponentWithRouterProp(props) {
        let location = useLocation();
        let navigate = useNavigate();
        let params = useParams();

        return <Component
            {...props}
            router={{location, navigate, params}} />;
    }

    return ComponentWithRouterProp;
}

// let AuthRedirectComponent = withAuthRedirect (ProfileContainer) //redirect by HOC

let mapStateToProps = (state) => ({
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    authorizedUserId: state.auth.userId,
    isAuth: state.auth.isAuth
})


const ProfileContainerCompose = compose(
    //withAuthRedirect,
    withRouter,
    connect( mapStateToProps, {getUserProfile, getStatus, updateStatus} )
)( ProfileContainer );

export default ProfileContainerCompose;


//Fox1k ***
// import React from 'react';
// import Profile from './Profile';
//
// import { connect } from 'react-redux';
// import {getStatus, getUserProfile, updateStatus} from "../../redux/profile-reducer";
// import {Navigate, useLocation, useNavigate, useParams} from 'react-router-dom';
// import withAuthRedirect from "../../hoc/withAuthRedirect";
//
// class ProfileContainer extends React.Component {
//     componentDidMount() {
//         let userId = this.props.router.params.userId;
//
//          if (!userId) userId = this.props.authorizedUserId;
//         this.props.getUserProfile(userId)
//         this.props.getStatus(userId)
//     }
//     componentDidUpdate(prevProps) {
//         let userId = this.props.router.params.userId;
//         if (prevProps.router.params.userId !== userId) {
//             let userId = this.props.authorizedUserId;
//             this.props.getUserProfile(userId)
//             this.props.getStatus(userId)
//
//         }
//     }
//
//     render() {
//         return (
//             <Profile {...this.props}
//                      profile={this.props.profile}
//                      status={this.props.status}
//                      updateStatus={this.props.updateStatus} />
//     )
//     }
// }
//
// // let AuthRedirectComponent = withAuthRedirect (ProfileContainer) //redirect by HOC
//
// let mapStateToProps = (state) => ({
//     profile: state.profilePage.profile,
//     status: state.profilePage.status,
//     authorizedUserId: state.auth.userId,
//     isAuth: state.auth.isAuth
// });
//
// function withRouter(Component) {
//     function ComponentWithRouterProp(props) {
//         let location = useLocation();
//         let navigate = useNavigate();
//         let params = useParams();
//         return <Component {...props} router={{ location, navigate, params }} />;
//     }
//     return ComponentWithRouterProp;
// }
//
// export default connect(mapStateToProps, { getUserProfile, getStatus, updateStatus })(
//     withRouter(ProfileContainer)
// );

// DIMYCH
// import React from 'react';
// import Profile from "./Profile";
// import axios from "axios";
// import {connect} from "react-redux";
// import {setUserProfile} from "../../redux/profile-reducer";
// import {withRouter} from "react-router-dom";
//
// class ProfileContainer extends React.Component {
//     componentDidMount() {
//         let userId = this.props.match.params.userId;
//         if (!userId) {
//             userId = 2;
//         }
//         axios.get(`https://social-network.samuraijs.com/api/1.0/profile/`+ userId)
//             .then(response => {
//
//                 this.props.setUserProfile(response.data)
//             });
//     }
//
//     render() {
//         return (
//             <Profile{...this.props} profile={this.props.profile}/>
//         )
//     }
// };
//
// let mapStateToProps = (state) => ({
//     profile: state.profilePage.profile
// })
//
// let WithURLDataContainerComponent = withRouter(ProfileContainer)
//
// export default connect (mapStateToProps, {setUserProfile}) (WithURLDataContainerComponent);