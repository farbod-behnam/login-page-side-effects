import { ComponentPropsWithoutRef, ReactNode } from "react";

import classes from './Button.module.css';

interface Props extends ComponentPropsWithoutRef<"button"> {
  children: ReactNode;
}

export default function Button (props: Props) {
  return (
    <button
      type={props.type || 'button'}
      className={`${classes.button} ${props.className}`}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  );
};

