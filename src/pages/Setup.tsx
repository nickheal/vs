import React, { useRef, useState } from 'react';
import Input from '../components/Input';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  container: {
    margin: [0, 'auto', 64, 'auto'],
    maxWidth: 640,
    textAlign: 'center',
    width: '100%'
  },
  button: {
    background: '#eeffee',
    border: 0,
    cursor: 'pointer',
    fontWeight: 900,
    padding: [8, 16],

    '&:hover': {
      background: '#ddffdd'
    }
  }
});

interface Props {
  start: (things: string[]) => void;
}

function Setup(props: Props) {
  const classes = useStyles();

  const activeInput = useRef<HTMLInputElement>(null);
  const [things, setThings] = useState<string[]>([]);

  function addThing(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter' && e.currentTarget.value) {
      setThings([...things, e.currentTarget.value]);
      e.currentTarget.value = '';
    }
  }

  function updateThing(index: number, value: string) {
    if (value) {
      things[index] = value;
    } else {
      things.splice(index, 1);
    }
    setThings([...things]);
  }

  function start() {
    if (!activeInput?.current?.value) {
      props.start(things);
      return;
    }
  
    const startThings = [...things, activeInput.current.value];
    props.start(startThings);
  }

  return (
    <section className={classes.container}>
      {things.map((thing, index) => <Input key={index} value={thing} onInput={e => updateThing(index, e.currentTarget.value)} />)}
      
      <Input onKeyDown={addThing} ref={activeInput} />
      
      {/* <button onClick={() => addThing()}>+</button> */}

      <button className={classes.button} onClick={start}>START</button>
    </section>
  );
}

export default Setup;
