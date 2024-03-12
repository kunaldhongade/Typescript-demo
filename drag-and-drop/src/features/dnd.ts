import React from "react";
import {TDragOverContext, TDragStartContext, TDropContext} from "../types/dndTypes";

function onDragStartHandler(this: TDragStartContext, e: React.DragEvent) {
  e.stopPropagation()
  const target = e.target as HTMLElement
  target.style.opacity = '0.4'
  e.dataTransfer.setDragImage(target, this.xOffset ?? 30, this.yOffset ?? (target.clientHeight - 20))
  this.cb()
}

function onDragOverHandler(this: TDragOverContext, e: React.DragEvent) {
  e.preventDefault()
  const target = e.target as HTMLElement
  if (target.className.includes(this.prefixClass)) {
    target.style.outline = 'dashed 3px gray'
    target.style.outlineOffset = '-3px';
  }
}

function onDragLeaveHandler(e: React.DragEvent) {
  const target = e.target as HTMLElement
  target.style.outline = 'none'
}

function onDragEndHandler(e: React.DragEvent) {
  const target = e.target as HTMLElement
  target.style.opacity = '1'
  target.style.outline = 'none'
}

function onDropHandler(this: TDropContext, e: React.DragEvent) {
  e.preventDefault()
  const target = e.target as HTMLElement
  this.cb(target)
  target.style.outline = 'none'
}

export {onDragStartHandler, onDragOverHandler, onDragLeaveHandler, onDragEndHandler, onDropHandler}