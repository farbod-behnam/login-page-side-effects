import { FormEvent, useEffect, useReducer, useState } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';
import { State } from '../../models/State.model';
import { Action } from '../../models/Action.model';
import { ActionEnum } from '../../models/Action.enum';



const emailReducer = (prevState: State, action: Action): State => {

  if (action.type === ActionEnum.USER_INPUT) {
    return new State(action.value, action.value.includes("@"));
  }
  if (action.type === ActionEnum.INPUT_BLUR) {
    return new State(prevState.value, prevState.value.includes("@"))
  }

  return new State("", false);

};

const passwordReducer = (prevState: State, action: Action): State => {

  if (action.type === ActionEnum.USER_INPUT) {
    return new State(action.value, action.value.trim().length > 6);
  }
  if (action.type === ActionEnum.INPUT_BLUR) {
    return new State(prevState.value, prevState.value.trim().length > 6)
  }

  return new State("", false);
}

interface Props {
  onLogin: (enteredEmail: string, enteredPassword: string) => void;
}

export default function Login(props: Props) {
  // const [enteredEmail, setEnteredEmail] = useState<string>("");
  // const [emailIsValid, setEmailIsValid] = useState<boolean>(true);
  // const [enteredPassword, setEnteredPassword] = useState<string>("");
  // const [passwordIsValid, setPasswordIsValid] = useState<boolean>(true);
  const [formIsValid, setFormIsValid] = useState(false);

  const [emailState, dispatchEmail] = useReducer(emailReducer, new State("", true));
  const [passwordState, dispatchPassword] = useReducer(passwordReducer, new State("", true));

  useEffect(() => {
    console.log("EFFECT RUNNING");

    return () => {
      console.log("EFFECT CLEANUP");
    };
  }, []);

  const { isValid: emailIsValid } = emailState;
  const { isValid: passwordIsValid } = passwordState;

  useEffect(() => {

    const timeoutHandler = setTimeout(() => {
      console.log("checking form validity");
      setFormIsValid(emailState.isValid && passwordState.isValid);
    }, 500);

    return () => {
      console.log("CLEANUP")
      clearTimeout(timeoutHandler);
    };

  }, [emailState.isValid, passwordState.isValid]);



  const emailChangeHandler = (event: FormEvent<HTMLInputElement>) => {
    // setEnteredEmail(event.currentTarget.value);
    dispatchEmail(new Action(ActionEnum.USER_INPUT, event.currentTarget.value));

    setFormIsValid(emailState.isValid && passwordState.isValid);
  };

  const passwordChangeHandler = (event: FormEvent<HTMLInputElement>) => {
    // setEnteredPassword(event.currentTarget.value);
    dispatchPassword(new Action(ActionEnum.USER_INPUT, event.currentTarget.value));

    setFormIsValid(emailState.isValid && passwordState.isValid);
  };


  const validateEmailHandler = () => {
    // setEmailIsValid(emailState.isValid);
    dispatchEmail(new Action(ActionEnum.INPUT_BLUR, ""));
    // return isEmailValid();
  };



  const validatePasswordHandler = () => {
    // setPasswordIsValid(isPasswordValid());
    dispatchPassword(new Action(ActionEnum.INPUT_BLUR, ""));
  };




  const submitHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    props.onLogin(emailState.value, passwordState.value);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${emailState.isValid === false ? classes.invalid : ''}`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={emailState.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${passwordState.isValid === false ? classes.invalid : ''}`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={passwordState.value}
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

