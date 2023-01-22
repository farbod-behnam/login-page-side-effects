import React from 'react';

import Navigation from './Navigation';
import classes from './MainHeader.module.css';

interface Props {
  onLogout: () => void;
}

export default function MainHeader(props: Props) {
  return (
    <header className={classes['main-header']}>
      <h1>A Typical Page</h1>
      <Navigation onLogout={props.onLogout} />
    </header>
  );
};

