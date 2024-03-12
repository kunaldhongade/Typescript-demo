import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import items from '../assets/data/items.json'
import {IItem} from "../types/dataInterfaces";

interface ItemState {
  items: IItem[],
  currentItem: IItem | null,
}

const initialState: ItemState = {
  items,
  currentItem: null
}

export const itemSlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<IItem>) => {
      state.items.push(action.payload)
    },
    setCurrentItem: (state, action: PayloadAction<IItem>) => {
      state.currentItem = action.payload
    },
    moveItem: (state, action: PayloadAction<IItem>) => {
      if (state.currentItem) {
        const currentIndex = state.items.findIndex(({id}) => state.currentItem?.id === id)
        const targetIndex = state.items.findIndex(({id}) => action.payload.id === id)
        state.items.splice(currentIndex, 1);
        state.items.splice(
          (targetIndex <= currentIndex) ? targetIndex : targetIndex - 1,
          0,
          (state.currentItem.categoryId === action.payload.categoryId)
            ? state.currentItem
            : {...state.currentItem, categoryId: action.payload.categoryId}
        )
        state.currentItem = null
      }
    },
    editItem: (state, action: PayloadAction<Omit<IItem, "categoryId">>) => {
      const idx = state.items.findIndex(el => el.id === action.payload.id)
      if (idx >= 0) {
        state.items[idx].title = action.payload.title
      }
    },
    removeItem: (state, action: PayloadAction<{ id: string, categoryId?: never } | { id?: never, categoryId: string }>) => {
      state.items = action.payload.id
        ? state.items.filter(el => el.id !== action.payload.id)
        : state.items.filter(el => el.categoryId !== action.payload.categoryId)
    }
  }
})


export const {addItem, setCurrentItem, moveItem, editItem, removeItem} = itemSlice.actions
export default itemSlice.reducer