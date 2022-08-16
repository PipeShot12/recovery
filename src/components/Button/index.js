import React from 'react'

export default function index({children,looks}) {
  return (
    <button  type="button" className={`btn btn-primary ${looks}`}>{children}</button>
  )
}
