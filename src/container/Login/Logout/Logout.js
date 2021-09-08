import React, { useEffect, useContext } from "react";
import { Redirect } from "react-router";
import AuthContext from "../../../context/AuthContext";

const Logout = (props) => {
  //Authentication Context
  const authCtx = useContext(AuthContext);

  //To Logout
  useEffect(() => {
    authCtx.logout();
  }, [authCtx]);
  return <Redirect to="/" />;
};


export default Logout;
