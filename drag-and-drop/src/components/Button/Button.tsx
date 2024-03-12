import React from 'react';
import style from './styles.module.css'

export type TButton = {
  onClickHandler: () => void
  disabled?: boolean
} & React.PropsWithChildren

const Button = ({onClickHandler, children, disabled}: TButton) => {
  return (
    <button
      className={style.btn}
      onClick={onClickHandler}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;