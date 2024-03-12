import React from 'react';
import Category from "../Category/Category";
import Item from "../Item/Item";
import Container from "../../components/Container/Container";
import {useAppSelector} from "../../store/hooks";

const MainLayout = () => {
  const {categories} = useAppSelector(state => state.category)
  const {items} = useAppSelector(state => state.item)

  return (
    <>
      {
        categories.length ?
          <Container>
            {
              categories.map(category =>
                <Category title={category.title} id={category.id} key={category.id}
                          inputFocus={category.title === 'Default title'}
                >
                  {
                    items.map(item =>
                      (item.categoryId === category.id) &&
                      <Item title={item.title} id={item.id} categoryId={item.categoryId} key={item.id}
                            inputFocus={!item.title}
                      />
                    )
                  }
                </Category>)
            }
          </Container>
          :
          <Container dFlex center>
            <h3 style={{fontFamily: 'monospace'}}>Categories list is empty. Add new category, please.</h3>
          </Container>
      }
    </>
  );
};

export default MainLayout;