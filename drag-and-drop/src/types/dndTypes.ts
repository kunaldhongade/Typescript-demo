export type TDragStartContext = {
  title: string,
  cb: () => void,
  xOffset?: number,
  yOffset?: number
}

export type TDragOverContext = {
  prefixClass: string
}

export type TDropContext = {
  cb: (target: HTMLElement) => void
}