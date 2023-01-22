import React from 'react';
import Button from '../UI/Button/Button';

import Card from '../UI/Card/Card';
import classes from './Home.module.css';

interface Props {
  onLogout: () => void;
}

export default function Home(props: Props) {
  return (
    <Card className={classes.home}>
      <h1>Welcome back!</h1>
      <Button onClick={props.onLogout}>Logout</Button>
    </Card>
  );
};

