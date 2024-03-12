import {useMemo} from "react";
import {ICategory, IItem} from "../types/dataInterfaces";

export const useHasChildren = (data: ICategory[] | IItem[], content: string): boolean =>
  useMemo(() => data.some(el => el.title === content), [data, content])
