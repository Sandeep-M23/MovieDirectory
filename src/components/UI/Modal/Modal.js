import React from 'react';
import Styles from './Modal.module.css';
import Backdrop from '../Backdrop/Backdrop';

const Modal = (props) => (
    <React.Fragment>
        <Backdrop show={props.show} clicked={props.modalClosed} />
        <div
        className={Styles.Modal}
         style={{
             transform: props.show ? 'translateY(0)' : 'translate(-100vh)',
            opacity: props.show ? '1' : '0'
        }}>
      {props.children}
    </div>
    </React.Fragment>

)
export default Modal;