import React from 'react';
import Styles from './DrawerToggle.module.css'

const DrawerToggle = (props) => (
    <div onClick={props.clicked} className={Styles.DrawerToggle}>
        <div></div>
        <div></div>
        <div></div>
    </div>
);

export default DrawerToggle;