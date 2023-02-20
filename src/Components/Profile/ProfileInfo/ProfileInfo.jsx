import React from 'react';
import classes from './ProfileInfo.module.css';
import Preloader from "../../common/Preloader/Preloader";
import ProfileStatus from './ProfileStatus'
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";

const ProfileInfo = (props) => {
    if (!props.profile){
        return <Preloader/>
    };
    return (
        <div>
            {/*<div className={classes.content}>*/}
            {/*    <img src="https://дизайн-обложки.рф/wp-content/uploads/2021/06/23964-scaled.jpg"/>*/}
            {/*</div>*/}
            <div className={classes.descriptionBlock}>
                <img src={props.profile.photos.large} alt=""/>
                <ProfileStatusWithHooks status = {props.status} updateStatus={props.updateStatus}/>
                <div>
                    Status: {props.profile.aboutMe}
                </div>
                <div>
                    My professional skills: {props.profile.lookingForAJobDescription}
                </div>

            </div>
        </div>
    )
}
export default ProfileInfo;

