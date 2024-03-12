import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import categories from '../assets/data/categories.json'
import {ICategory} from "../types/dataInterfaces";
import {removeItem} from "./itemSlice";

interface CategoryState {
  categories: ICategory[],
  currentCategory: ICategory | null
}

export const removeCategoryAndItems = createAsyncThunk(
  'category/remove',
  (id: string, {dispatch}) => {
    dispatch(removeCategory({id}))
    dispatch(removeItem({categoryId: id}))
  }
)

const initialState: CategoryState = {
  categories,
  currentCategory: null
}

export const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    addCategory: (state, action: PayloadAction<ICategory>) => {
      state.categories.push(action.payload)
    },
    setCurrentCategory: (state, action: PayloadAction<ICategory>) => {
      state.currentCategory = action.payload
    },
    moveCategory: (state, action: PayloadAction<ICategory>) => {
      if (state.currentCategory) {
        const currentIndex = state.categories.findIndex(({id}) => state.currentCategory?.id === id)
        const targetIndex = state.categories.findIndex(({id}) => action.payload.id === id)
        state.categories.splice(currentIndex, 1);
        state.categories.splice(
          (targetIndex <= currentIndex) ? targetIndex : targetIndex - 1,
          0,
          state.currentCategory
        )
        state.currentCategory = null
      }
    },
    editCategory: (state, action: PayloadAction<ICategory>) => {
      const idx = state.categories.findIndex(el => el.id === action.payload.id)
      if (idx >= 0) {
        state.categories[idx].title = action.payload.title
      }
    },
    removeCategory: (state, action: PayloadAction<Pick<ICategory, "id">>) => {
      state.categories = state.categories.filter(el => el.id !== action.payload.id)
    }
  }
})


export const {addCategory, setCurrentCategory, moveCategory, editCategory, removeCategory} = categorySlice.actions
export default categorySlice.reducer