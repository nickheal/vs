import React, { useState } from 'react';
import ProgressBar from './ProgressBar';
import Result from './Result';
import things from './things';
import { getSavedPairs, savePairs } from '../utils/persistentStorage';
import generatePairs, { Pair, Status } from '../utils/generatePairs';
import { createUseStyles } from 'react-jss'

const useStyles = createUseStyles({
  section: {
    alignItems: 'center',
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 1fr',
    gridTemplateRows: 'auto',
    gridTemplateAreas: `
      "progress progress progress"
      "home vs away"
      "draw draw draw"
    `,
    margin: '0 auto 64px auto',
    maxWidth: 640,
    textAlign: 'center',
    width: '100%'
  },
  progress: {
    gridArea: 'progress'
  },
  home: {
    gridArea: 'home'
  },
  vs: {
    gridArea: 'vs'
  },
  drawContainer: {
    gridArea: 'draw'
  },
  draw: {
    background: 'none',
    border: 0,
    color: '#000077',
    cursor: 'pointer',
    display: 'block',
    fontSize: 20,
    margin: '8px auto',
    textDecoration: 'underline'
  },
  away: {
    gridArea: 'away'
  },
  button: {
    background: '#f7f7f7',
    border: 0,
    cursor: 'pointer',
    fontSize: 32,
    padding: '8px 16px',

    '&:hover': {
      background: '#f0f0f0'
    }
  },
  reset: {
    background: 'none',
    border: 0,
    cursor: 'pointer'
  }
});

function Comparer() {
  const classes = useStyles();

  const [pairs, setPairs] = useState(getSavedPairs() || generatePairs(things));

  const unplayedPairs = pairs.filter(({ status }) => status === Status.Unplayed);

  const inPlay = unplayedPairs[0];

  function declareResult(result: Status) {
    inPlay.status = result;
    savePairs(pairs);
    setPairs([...pairs]);
  }

  function reset() {
    savePairs(null);
    setPairs(generatePairs(things));
  }

  return (
    <>
      {!!inPlay ? (
        <section className={classes.section}>
          <div className={classes.progress}>
            <ProgressBar complete={pairs.length - unplayedPairs.length} total={pairs.length} />
          </div>
          <div className={classes.home}>
            <button className={classes.button} onClick={() => declareResult(Status.Home)}>{ inPlay.home.value }</button>
          </div>
          <div className={classes.vs}>
            —vs—
          </div>
          <div className={classes.away}>
            <button className={classes.button} onClick={() => declareResult(Status.Away)}>{ inPlay.away.value }</button>
          </div>
          <div className={classes.drawContainer}>
            <button className={classes.draw} onClick={() => declareResult(Status.Draw)}>tie</button>
          </div>
        </section>
      ) : (
        <Result pairs={pairs} />
      )}
      <section>
        <button className={classes.reset} onClick={reset}>Reset</button>
      </section>
    </>
  );
}

export default Comparer;
