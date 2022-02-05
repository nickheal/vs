import React, { forwardRef, InputHTMLAttributes } from 'react';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  input: {
    display: 'block',
    margin: [0, 'auto', 16, 'auto'],
    maxWidth: 160,
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
