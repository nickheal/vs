import React from 'react';
import Comparer from './components/Comparer';
import { createUseStyles } from 'react-jss'

const useStyles = createUseStyles({
  heading: {
    fontSize: 128,
    fontWeight: 900,
    padding: 24,
    textAlign: 'center'
  }
});

function App() {
  const classes = useStyles();

  return (
    <main>
      <header className={classes.heading}>
        VS
      </header>
      <Comparer />
    </main>
  );
}

export default App;
