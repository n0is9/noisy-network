import React from 'react';
import classes from './Navbar.module.css';
import {NavLink} from "react-router-dom";

const Navbar = () => {
    return (
        <nav className={classes.nav}>
            <div className={classes.item}>
                <NavLink to="/Profile" activeClassName={classes.activeLink}>Profile</NavLink>
            </div>
            <div className={classes.item}>
                <NavLink to="/Dialogs" activeClassName={classes.activeLink}>Messages</NavLink>
            </div>
            <div className={classes.item}>
                <NavLink to="/users" activeClassName={classes.activeLink}>Users</NavLink>
            </div>
            <div className={classes.item}>
                <NavLink to="#">News</NavLink>
            </div>
            <div className={classes.item}>
                <NavLink to="#">Friends</NavLink>
            </div>
            <div className={classes.item}>
                <NavLink to="#">Music</NavLink>
            </div>
            <div className={classes.item}>
                <NavLink to="#">Settings</NavLink>
            </div>
        </nav>
    );
}
export default Navbar;
