import React from "react";
import Styles from "./NavigationItems.module.css";
import NavigationItem from "./NaviagtionItem/NavigationItem";

const NavigationItems = (props) => (
  <ul className={Styles.NavigationItems}>
    <NavigationItem link="/" exact>
      HOME
    </NavigationItem>
    <NavigationItem link="/Search">SEARCH</NavigationItem>
    {props.isAuthenticated ? (
      <NavigationItem link="/WatchList">WATCHLIST</NavigationItem>
    ) : null}
    {!props.isAuthenticated ? (
      <NavigationItem link="/Login">LOGIN</NavigationItem>
    ) : (
      <NavigationItem link="/Logout">LOGOUT</NavigationItem>
    )}
  </ul>
);
export default NavigationItems;
