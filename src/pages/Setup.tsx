import React, { useRef, useState } from 'react';
import Input from '../components/Input';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  container: {
    margin: [0, 'auto', 64],
    maxWidth: 640,
    textAlign: 'center',
    width: '100%'
  },
  legend: {
    margin: [0, 'auto', 16]
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
  const [inputHasContent, setInputHasContent] = useState<boolean>(false);
  const [things, setThings] = useState<string[]>([]);

  function addThing(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter' && e.currentTarget.value) {
      setThings([...things, e.currentTarget.value]);
      e.currentTarget.value = '';
      setInputHasContent(false);
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
    <form className={classes.container}>
      <legend className={classes.legend}>Type in all the things you want to compare.</legend>

      {things.map((thing, index) =>(
        <Input
          key={index}
          label={`Thing to compare: ${index + 1}`}
          labelSrOnly={true}
          value={thing}
          onInput={e => updateThing(index, e.currentTarget.value)}
        />
      ))}
      
      <Input
        label={`Thing to compare: ${things.length + 1}`}
        labelSrOnly={true}
        onKeyDown={addThing}
        onInput={e => setInputHasContent(!!e.currentTarget.value)}
        ref={activeInput}
      />

      {inputHasContent ? <p>Hit enter to add another.</p> : null}

      <button className={classes.button} onClick={start} type="button">START COMPARING</button>
    </form>
  );
}

export default Setup;
