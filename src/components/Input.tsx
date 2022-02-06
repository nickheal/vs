import React, { forwardRef, InputHTMLAttributes } from 'react';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  input: {
    border: {
      color: '#000000',
      radius: 0,
      width: 2
    },
    display: 'block',
    fontSize: 18,
    margin: [0, 'auto', 16, 'auto'],
    maxWidth: 240,
    padding: 8,
    width: '100%'
  }
});

interface Props extends InputHTMLAttributes<HTMLInputElement> {}

const Input = forwardRef<HTMLInputElement, Props>((props: Props, ref) => {
  const classes = useStyles();

  return <input className={classes.input} {...props} ref={ref} />;
});

// const forwardedRef = forwardRef(Input);

export default Input;
