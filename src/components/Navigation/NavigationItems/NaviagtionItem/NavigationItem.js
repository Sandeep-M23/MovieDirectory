import React from 'react';
import {NavLink} from 'react-router-dom';
import Styles from './NavigationItem.module.css';


const NavigationItem = (props) => (
    <li className={Styles.NavigationItem}>
        <NavLink 
        to={props.link}
        exact={props.exact} 
        activeClassName={Styles.active}>{props.children}</NavLink>
    </li>
)
export default NavigationItem;