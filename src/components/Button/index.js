import React from 'react'

export default function index({children,looks, handlerClick}) {
  return (
    <button onClick={()=> handlerClick()} type="button" className={`btn btn-primary ${looks}`}>{children}</button>
  )
}
