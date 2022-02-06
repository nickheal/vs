import React, { useState } from 'react';
import { Pair, Status } from '../utils/pairs';
import Setup from './Setup';
import Compare from './Compare';
import Result from './Result';
import { getSavedPairs, persistPairs } from '../utils/persistentStorage';
import { generatePairs } from '../utils/pairs';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  header: {
    fontSize: 128,
    fontWeight: 900,
    padding: 24,
    textAlign: 'center'
  },
  footer: {
    fontWeight: 900,
    padding: 24,
    textAlign: 'center'
  },
  reset: {
    background: '#ffeeee',
    border: 0,
    cursor: 'pointer',
    fontWeight: 900,
    padding: [8, 16],

    '&:hover': {
      background: '#ffdddd'
    }
  }
});

enum Page {
  Setup,
  Compare,
  Result
}

function Home() {
  const classes = useStyles();

  const [pairs, setPairs] = useState<Pair[]>(getSavedPairs() || []);

  const page = !pairs.length ? Page.Setup
                : pairs.filter(({ status }) => status === Status.Unplayed).length ? Page.Compare
                : Page.Result;

  function updatePairs(newPairs: Pair[]) {
    persistPairs(newPairs);
    setPairs([...pairs]);
  }

  function start(things: string[]) {
    const pairs = generatePairs(things);
    persistPairs(pairs);
    setPairs(pairs);
  }

  function reset() {
    persistPairs(null);
    setPairs([]);
  }

  return (
    <main>
      <header className={classes.header}>
        VS
      </header>
  
      {page === Page.Setup ? <Setup start={start} /> : null}
      {page === Page.Compare ? <Compare pairs={pairs} updatePairs={updatePairs} /> : null}
      {page === Page.Result ? <Result pairs={pairs} /> : null}

      <footer className={classes.footer}>
        <button className={classes.reset} onClick={reset}>RESET</button>
      </footer>
    </main>
  );
}

export default Home;
