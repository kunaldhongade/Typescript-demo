import React from 'react';
import style from './styles.module.css'

export type TContainer = {
  columnsCount?: number,
  dFlex?: boolean,
  center?: boolean
} & React.PropsWithChildren

const Container = ({columnsCount, dFlex, center, children}: TContainer) => {
  const containerProps = {
    style: (columnsCount || dFlex || center)
      ?
      {
        "--columns-count": columnsCount ?? undefined,
        display: (dFlex || center) ? 'flex' : undefined,
        justifyContent: dFlex ? (center ? 'center' : 'space-between') : undefined,
        alignItems: dFlex ? 'center' : undefined
      } as React.CSSProperties
      : undefined
  }

  return (
    <div className={style.container} {...containerProps}>
      {children}
    </div>
  );
};

export default Container;