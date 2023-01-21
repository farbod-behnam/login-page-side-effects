import React, { ReactNode } from 'react';

import classes from './Card.module.css';

interface Props {
  className: string;
  children: ReactNode;
}

export default function Card(props: Props) {
  return (
    <div className={`${classes.card} ${props.className}`}>{props.children}</div>
  );
};

