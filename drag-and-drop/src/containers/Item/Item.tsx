import React from 'react';
import style from './styles.module.css'
import {editItem, moveItem, removeItem, setCurrentItem} from "../../store/itemSlice";
import {useAppDispatch} from "../../store/hooks";
import {
  onDragEndHandler,
  onDragLeaveHandler,
  onDragOverHandler,
  onDragStartHandler,
  onDropHandler
} from "../../features/dnd";
import {onKeyDownHandler} from "../../features/eventsHandlers";
import {TDragOverContext, TDragStartContext, TDropContext} from "../../types/dndTypes";
import {TItemExtended} from "../../types/dataInterfaces";
import TrashBtn from "../../components/TrashBtn/TrashBtn";

const Item = ({title, id, categoryId, inputFocus}: TItemExtended) => {
  const dispatch = useAppDispatch()

  const dragStartContext: TDragStartContext = {
    title,
    cb() {
      title && dispatch(setCurrentItem({id, title, categoryId}))
    },
  }

  const dragOverContext: TDragOverContext = {
    prefixClass: 'styles_item'
  }

  const dropContext: TDropContext = {
    cb(target: HTMLElement) {
      if (!(target instanceof HTMLInputElement)) {
        dispatch(moveItem({
          id: String(target.dataset.id),
          title: target.innerText,
          categoryId: String(target.dataset.categoryid)
        }))
      }
    }
  }

  const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(editItem({id, title: e.target.value}))
  }

  const onRemoveHandler = () => {
    dispatch(removeItem({id}))
  }

  return (
    <li
      className={style.item}
      draggable
      onDragStart={onDragStartHandler.bind(dragStartContext)}
      onDragOver={onDragOverHandler.bind(dragOverContext)}
      onDragLeave={onDragLeaveHandler}
      onDragEnd={onDragEndHandler}
      onDrop={onDropHandler.bind(dropContext)}
      data-id={id}
      data-categoryid={categoryId}
    >
      <input
        type="text"
        className="text-input"
        value={title}
        onChange={inputHandler}
        onKeyDown={onKeyDownHandler}
        placeholder={"Enter item title ..."}
        autoFocus={inputFocus}
      />

      <TrashBtn onRemoveHandler={onRemoveHandler}/>
    </li>
  );
};

export default Item;