import React, {useId} from 'react';
import style from './styles.module.css'
import {useAppDispatch, useAppSelector} from "../../store/hooks";
import {
  onDragEndHandler,
  onDragLeaveHandler,
  onDragOverHandler,
  onDragStartHandler,
  onDropHandler
} from "../../features/dnd";
import {TDragOverContext, TDragStartContext, TDropContext} from "../../types/dndTypes";
import {editCategory, moveCategory, removeCategoryAndItems, setCurrentCategory} from "../../store/categorySlice";
import {addItem, moveItem} from "../../store/itemSlice";
import Button from "../../components/Button/Button";
import {TCategoryExtended} from "../../types/dataInterfaces";
import {useHasChildren} from "../../hooks/useHasChildren";
import {onKeyDownHandler} from "../../features/eventsHandlers";
import TrashBtn from "../../components/TrashBtn/TrashBtn";

const Category = ({title, id, inputFocus, children}: TCategoryExtended) => {
  const {currentItem, items} = useAppSelector(state => state.item)
  const dispatch = useAppDispatch()
  const newItemId = useId()
  const defaultTitle = ''
  const isSeveralEmptyFields = useHasChildren(items, defaultTitle)

  const dragStartContext: TDragStartContext = {
    title,
    cb() {
      title && dispatch(setCurrentCategory({id, title}))
    },
    xOffset: 0,
    yOffset: 0
  }

  const dragOverContext: TDragOverContext = {
    prefixClass: 'styles_category'
  }

  const dropContext: TDropContext = {
    cb(target: HTMLElement) {
      if (target.dataset.id === id) {
        currentItem && dispatch(moveItem({
          ...currentItem,
          categoryId: target.dataset.id
        }))
      }
      dispatch(moveCategory({
        id: String(target.dataset.id),
        title: target.innerText,
      }))
    }
  }

  const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(editCategory({id, title: e.target.value}))
  }

  const buttonHandler = () => {
    dispatch(addItem({
      id: newItemId + Date.now(),
      title: defaultTitle,
      categoryId: id
    }))
  }

  const onRemoveHandler = () => dispatch(removeCategoryAndItems(id))

  return (
    <div
      className={style.category}
      draggable
      onDragStart={onDragStartHandler.bind(dragStartContext)}
      onDragLeave={onDragLeaveHandler}
      onDragOver={onDragOverHandler.bind(dragOverContext)}
      onDragEnd={onDragEndHandler}
      onDrop={onDropHandler.bind(dropContext)}
      data-id={id}
    >
      <div className={style.header}>
        <input
          type="text"
          className="text-input"
          value={title}
          onChange={inputHandler}
          onKeyDown={onKeyDownHandler}
          placeholder={"Enter category title ..."}
          autoFocus={inputFocus}
        />
        <TrashBtn onRemoveHandler={onRemoveHandler} ml={"auto"} mr={"1rem"}/>
        <Button
          onClickHandler={buttonHandler}
          disabled={isSeveralEmptyFields}
        >Add new item</Button>
      </div>
      <ul>
        {children}
      </ul>
    </div>
  );
};

export default Category;