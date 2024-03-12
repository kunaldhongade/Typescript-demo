import React from "react";

const onKeyDownHandler = (e: React.KeyboardEvent<HTMLInputElement> & { target: HTMLInputElement }) => {
  ['Enter', 'Escape'].includes(e.code) && e.target.blur()
}

export {onKeyDownHandler}