import React, { ButtonHTMLAttributes, useState } from 'react';
import { createUseStyles } from 'react-jss';

const buttonClass = {
  border: 0,
  cursor: 'pointer',
  fontWeight: 900,
  padding: [8, 16]
}

const useStyles = createUseStyles({
  main: {
    ...buttonClass,

    background: '#ffeeee',
    '&:hover': {
      background: '#ffdddd'
    }
  },
  confirm: {
    ...buttonClass,

    background: '#eeffee',
    margin: [0, 8],
    '&:hover': {
      background: '#ddffdd'
    }
  },
  cancel: {
    ...buttonClass,

    background: '#ffeeee',
    margin: [0, 8],
    '&:hover': {
      background: '#ffdddd'
    }
  }
});

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {}

function ButtonConfirm(props: Props) {
  const classes = useStyles();

  const [showConfirmation, setShowConfirmation] = useState<boolean>(false);

  function onClick() {
    setShowConfirmation(true);
  }

  function onConfirm(e: React.MouseEvent<HTMLButtonElement>) {
    setShowConfirmation(false);
    props.onClick?.(e);
  }

  function onCancel() {
    setShowConfirmation(false);
  }

  return (
    <>
      {showConfirmation ? (
        <>
          <p>Are you sure?</p>
          <button className={classes.confirm} onClick={onConfirm}>CONFIRM</button>
          <button className={classes.cancel} onClick={onCancel}>CANCEL</button>
        </>
      ) : (
        <button {...props} className={classes.main} onClick={onClick} />
      )}
    </>
  )
}

export default ButtonConfirm;
