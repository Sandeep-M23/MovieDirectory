import React, { useState ,useContext} from "react";
import {useHistory} from 'react-router'
import axios from "axios";
import Styles from "./Login.module.css";
import Input from "../../components/UI/Input/Input";
import AuthContext from "../../context/AuthContext";

const Login = () => {
  const [form, setForm] = useState({
    email: {
      label: "E-Mail",
      elementConfig: {
        type: "email",
        placeholder: "Your Email",
      },
      value: "",
      validation: {
        required: true,
        isEmail: true,
      },
      errorText: "Please enter a valid Mail address",
      valid: false,
      touched: false,
    },
    password: {
      label: "Password",
      elementConfig: {
        type: "password",
        placeholder: "Password",
      },
      value: "",
      validation: {
        required: true,
        minLength: 4,
        maxLength: 8,
      },
      errorText: "Please enter valid Password (i.e,between 4-8 characters)",
      valid: false,
      touched: false,
    },
  });
  const [isValid, setIsValid] = useState(false);
  const [isLoginMode, setIsLoginMode] = useState(false);

  const authCtx = useContext(AuthContext);

  const history = useHistory();

  //Check validity of Inputs
  const checkValidity = (value, rules) => {
    let isValid = true;
    if (!rules) {
      return true;
    }

    if (rules.required) {
      isValid = value.trim() !== "" && isValid;
    }

    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid;
    }

    if (rules.maxLength) {
      isValid = value.length <= rules.maxLength && isValid;
    }

    if (rules.isEmail) {
      const pattern =
        /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
      isValid = pattern.test(value) && isValid;
    }

    if (rules.isNumeric) {
      const pattern = /^\d+$/;
      isValid = pattern.test(value) && isValid;
    }

    return isValid;
  };

  //Entering of the inputs
  const onchangeHandler = (event, id) => {
    const updatedForm = {
      ...form,
      [id]: {
        ...form[id],
        value: event.target.value,
        valid: checkValidity(event.target.value, form[id].validation),
        touched: true,
      },
    };
    let formIsValid = true;
    for (let id in updatedForm) {
      formIsValid = updatedForm[id].valid && formIsValid;
    }
    setForm(updatedForm);
    setIsValid(formIsValid);
  };

  //Form submit
  const submitHandler = (event) => {
    event.preventDefault();
    const enteredData = {
      email: form.email.value,
      password: form.password.value,
      returnSecureToken: true,
    };

    let url;
    if (isLoginMode) {
      url = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDxIkv0ZiqJWWT5IkwsGy98j_auKeIqnXw";
    } else {
      url = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDxIkv0ZiqJWWT5IkwsGy98j_auKeIqnXw";
        
    }

    axios
      .post(url, enteredData)
      .then((response) => {
        const expirationTime = new Date(
          new Date().getTime() + +response.data.expiresIn * 1000
        );
        authCtx.login(
          response.data.idToken,
          response.data.localId,
          expirationTime.toISOString()
        );
        history.replace("/");
        console.log('success')
      })
      .catch((error) => console.log(error.message));
  };

  //Change Form Modes
  const switchModeHandler = () => {
    setIsLoginMode((prevState) => !prevState);
  };

  const formElementsArray = [];
  for (let key in form) {
    formElementsArray.push({
      id: key,
      config: form[key],
    });
  }

  const formValue = formElementsArray.map((formElement) => {
    return (
      <Input
        key={formElement.id}
        id={formElement.id}
        label={formElement.config.label}
        type={formElement.config.elementConfig.type}
        placeholder={formElement.config.elementConfig.placeholder}
        value={formElement.config.value}
        inValid={formElement.config.valid}
        touched={formElement.config.touched}
        shouldValidate={formElement.config.validation}
        errorText={formElement.config.errorText}
        onChange={(event) => onchangeHandler(event, formElement.id)}
      />
    );
  });

  return (
    <div className={Styles.Login}>
      <h1>{isLoginMode ? "SIGNUP REQUIRED" : "LOGIN REQUIRED"}</h1>
      <form onSubmit={(event) => submitHandler(event)}>
        {formValue}
        <button disabled={!isValid} className={Styles.LoginButton}>
          {isLoginMode ? "SIGNUP" : "LOGIN"}
        </button>
      </form>
      <button className={Styles.SwitchButton} onClick={switchModeHandler}>
        SWITCH TO {isLoginMode ? "LOGIN" : "SIGNUP"}
      </button>
    </div>
  );
};

export default Login;
