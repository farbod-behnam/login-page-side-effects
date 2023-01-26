import { FormEvent, useContext, useEffect, useReducer, useState } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';
import { State } from '../../models/State.model';
import { Action } from '../../models/Action.model';
import { ActionEnum } from '../../models/Action.enum';
import AuthContext from '../../context/auth-context';
import Input from '../UI/Input/Input';



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


export default function Login() {
  const [formIsValid, setFormIsValid] = useState(false);

  const [emailState, dispatchEmail] = useReducer(emailReducer, new State("", true));
  const [passwordState, dispatchPassword] = useReducer(passwordReducer, new State("", true));

  const authCtx = useContext(AuthContext);


  useEffect(() => {
    console.log("EFFECT RUNNING");

    return () => {
      console.log("EFFECT CLEANUP");
    };
  }, []);


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

    if (formIsValid) 
      authCtx.onLogin(emailState.value, passwordState.value);
    else if (!emailState.isValid) {
    }
    else {

    }
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>

        <Input 
          id="email" 
          label="E-Mail" 
          type="email"
          isValid={emailState.isValid} 
          value={emailState.value} 
          onChange={emailChangeHandler} 
          onBlur={validateEmailHandler}
        />

         <Input 
          id="password" 
          label="Password" 
          type="password"
          isValid={passwordState.isValid} 
          value={passwordState.value} 
          onChange={passwordChangeHandler} 
          onBlur={validatePasswordHandler}
        />


        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

