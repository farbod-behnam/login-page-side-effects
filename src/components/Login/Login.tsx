import React, { FormEvent, useEffect, useState } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';

interface Props {
  onLogin: (enteredEmail: string, enteredPassword: string) => void;
}

export default function Login(props: Props) {
  const [enteredEmail, setEnteredEmail] = useState<string>("");
  const [emailIsValid, setEmailIsValid] = useState<boolean>(true);
  const [enteredPassword, setEnteredPassword] = useState<string>("");
  const [passwordIsValid, setPasswordIsValid] = useState<boolean>(true);
  const [formIsValid, setFormIsValid] = useState(false);

  useEffect(() => {
    console.log("EFFECT RUNNING");

    return () => {
      console.log("EFFECT CLEANUP");
    };
  }, []);

  // useEffect(() => {

  //   const timeoutHandler = setTimeout(() => {
  //     console.log("checking form validity");
  //     setFormIsValid(enteredEmail.includes('@') && enteredPassword.trim().length > 6);
  //   }, 500);

  //   return () => {
  //     console.log("CLEANUP")
  //     clearTimeout(timeoutHandler);
  //   };

  // }, [enteredEmail, enteredPassword]);



  const emailChangeHandler = (event: FormEvent<HTMLInputElement>) => {
    setEnteredEmail(event.currentTarget.value);

    setFormIsValid(
      event.currentTarget.value.includes('@') && enteredPassword.trim().length > 6
    );
  };

  const passwordChangeHandler = (event: FormEvent<HTMLInputElement>) => {
    setEnteredPassword(event.currentTarget.value);

    setFormIsValid(
      enteredEmail.includes('@') && event.currentTarget.value.trim().length > 6
    );
  };

  const isEmailValid = () => {
    return enteredEmail.includes("@");
  }

  const validateEmailHandler = () => {
    setEmailIsValid(isEmailValid());
  };

  const isPasswordValid = () => {
    return enteredPassword.trim().length > 6;
  }

  const validatePasswordHandler = () => {
    setPasswordIsValid(isPasswordValid());
  };

  const isFormValid = () => {
    return isEmailValid() && isPasswordValid();
  }


  const submitHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    props.onLogin(enteredEmail, enteredPassword);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${emailIsValid === false ? classes.invalid : ''
            }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={enteredEmail}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${passwordIsValid === false ? classes.invalid : ''
            }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={enteredPassword}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

