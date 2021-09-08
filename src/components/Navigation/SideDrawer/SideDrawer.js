import React from 'react';
import styles from './SideDrawer.module.css';
import Logo from '../../Logo/Logo';
import BackDrop from '../../UI/Backdrop/Backdrop';
import NavigationItems from '../NavigationItems/NavigationItems';

const SideDrawer = (props) =>{
    let attachedStyles = [styles.SideDrawer , styles.Close];
    if(props.open){
        attachedStyles=[styles.SideDrawer,styles.Open]
    }
    return(
        <React.Fragment>
            <BackDrop show={props.open} clicked={props.closed}/>
            <div className={attachedStyles.join(' ')} onClick={props.closed}>
            <div className={styles.Logo}>
               <Logo/>
            </div>
            <nav>
                <NavigationItems isAuthenticated={props.isAuth}/>
            </nav>
        </div>
        </React.Fragment>
    )
}
export default SideDrawer;