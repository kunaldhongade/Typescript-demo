import React from 'react';
import Container from "../components/Container/Container";
import Button from "../components/Button/Button";
import {useAppDispatch, useAppSelector} from "../store/hooks";
import {addCategory} from "../store/categorySlice";
import {useHasChildren} from "../hooks/useHasChildren";

const Header = () => {
  const {categories} = useAppSelector(state => state.category)
  const dispatch = useAppDispatch()
  const id = React.useId()
  const defaultTitle = 'Default title'
  const isSeveralDefaultCategories = useHasChildren(categories, defaultTitle)

  const onAddCategoryHandler = () => {
    dispatch(addCategory({
      id: id + Date.now(),
      title: defaultTitle
    }))
  }
  return (
    <header>
      <Container columnsCount={1} dFlex>
        <h1>Drag and drop</h1>
        <Button onClickHandler={onAddCategoryHandler} disabled={isSeveralDefaultCategories}>Add new category</Button>
      </Container>
    </header>
  );
};

export default Header;