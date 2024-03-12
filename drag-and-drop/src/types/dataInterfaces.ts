import React from "react";

export interface ICategory {
  id: string
  title: string
}

export interface IItem {
  id: string
  title: string
  categoryId: string
}

export type TCategoryExtended = ICategory & React.PropsWithChildren & {inputFocus?: boolean}
export type TItemExtended = IItem & {inputFocus?: boolean}
