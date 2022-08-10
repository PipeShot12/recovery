import React from 'react'

export default function Index({item,dafult,key}) {
  return (
    dafult ? (<option defaultValue={item} key={key}>{item}</option>) : <option value={item} key={key}>{item}</option> 
  )
}
