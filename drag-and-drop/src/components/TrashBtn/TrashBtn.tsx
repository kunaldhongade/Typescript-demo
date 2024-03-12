import React from 'react';
import style from "./styles.module.css";
import {ReactComponent as TrashIcon} from "../../assets/icons/Trash.svg";

export interface ITrashBtn {
  onRemoveHandler: () => void,
  ml?: React.CSSProperties["marginLeft"],
  mr?: React.CSSProperties["marginRight"]
}

const TrashBtn = ({onRemoveHandler, ml, mr}: ITrashBtn) => {
  const containerProps = {
    style: (ml || mr)
      ?
      {
        marginLeft: ml ?? undefined,
        marginRight: mr ?? undefined
      } as React.CSSProperties
      : undefined
  }

  return (
    <div className={style.trash} onClick={onRemoveHandler} {...containerProps}>
      <TrashIcon/>
    </div>
  );
};

export default TrashBtn;