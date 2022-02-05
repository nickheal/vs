import React from 'react';
import { createUseStyles } from 'react-jss';

interface Props {
  complete: number;
  total: number;
}

const useStyles = createUseStyles({
  placeholder: {
    background: '#f0f0f0',
    height: 8,
    margin: '0 auto 32px auto',
    position: 'relative',
    width: 320
  },
  bar: {
    background: '#11ff11',
    height: '100%',
    left: 0,
    position: 'absolute',
    top: 0,
    transition: 'width 150ms ease-in-out',
    width: (props: Props) => `${(props.complete / props.total) * 100}%`
  }
});

function ProgressBar(props: Props) {
  const classes = useStyles(props);
  
  return (
    <div className={classes.placeholder}>
      <div className={classes.bar} />
    </div>
  );
}

export default ProgressBar;