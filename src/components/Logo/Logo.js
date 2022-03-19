import React from 'react';
import Styles from './Logo.module.css'
import brandLogo from '../../assest/brand-logo.png'

const Logo = (props) => (
    <div className={Styles.Logo}>
        <img src={brandLogo} alt="Logo"/>
    </div>
)
export default Logo;