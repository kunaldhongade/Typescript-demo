import {configureStore} from "@reduxjs/toolkit";
import categoryReducer from "./categorySlice"
import itemReducer from "./itemSlice"

export const store = configureStore({
  reducer: {
    category: categoryReducer,
    item: itemReducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch