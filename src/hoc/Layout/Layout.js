import React, { useContext, useState } from "react";
import ToolBar from "../../components/Navigation/ToolBar/ToolBar";
import Styles from "./Layout.module.css";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";
import AuthContext from "../../context/AuthContext";

const Layout = (props) => {
  const [sideDrawerIsVisible, setSideDrawerIsVisible] = useState(false);

  const authCtx = useContext(AuthContext);
  const loggedIn = authCtx.isLoggedIn;

  const sideDrawerClosedHandler = () => {
    setSideDrawerIsVisible(false);
  };
  const sideDrawerToggleHandler = () => {
    setSideDrawerIsVisible(true);
  };
  return (
    <React.Fragment>
      <ToolBar drawerToggleClicked={sideDrawerToggleHandler} isAuth={loggedIn}/>
      <SideDrawer open={sideDrawerIsVisible} closed={sideDrawerClosedHandler} isAuth={loggedIn}/>
      <main className={Styles.Content}>{props.children}</main>
    </React.Fragment>
  );
};

export default Layout;
