import React, { forwardRef, InputHTMLAttributes } from 'react';
import { createUseStyles } from 'react-jss';
import { srOnly } from '../utils/srOnly';

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
  },
  label: (props: Props) => props.labelSrOnly ? ({ ...srOnly }) : ({})
});

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  labelSrOnly?: boolean;
}

const Input = forwardRef<HTMLInputElement, Props>((props: Props, ref) => {
  const {
    label,
    labelSrOnly = false,
    ...defaultProps
  } = props;
  
  const classes = useStyles({ label, labelSrOnly });

  return (
    <>
      <label className={classes.label} htmlFor={label}>{ label }</label>
      <input className={classes.input} {...defaultProps} name={label} id={label} ref={ref} />
    </>
  );
});

export default Input;
