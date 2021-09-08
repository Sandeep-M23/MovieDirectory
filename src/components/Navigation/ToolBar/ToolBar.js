import React from 'react';
import Styles from './ToolBar.module.css';
import NavigationItems from '../NavigationItems/NavigationItems';
import Logo from '../../Logo/Logo';
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';

const ToolBar = (props) =>{
    return(
        <div className={Styles.Toolbar}>
            <DrawerToggle clicked={props.drawerToggleClicked}/>
            <div className={Styles.Logo}>
            <Logo/>
            </div>
                <nav className={Styles.DesktopOnly} >
                    <NavigationItems isAuthenticated={props.isAuth}/>
                </nav>
        </div>
    )
}





export default ToolBar;