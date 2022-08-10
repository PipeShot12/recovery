import React from 'react'
import Option from '../Option'
export default function Index({array,size,label,onChangeAction,title,newOptionId,defaultV,keySub}) {
  return (
    <div className={size}>
    <label htmlFor={label} className="form-label">{title}</label>
    <select autoComplete='off' onChange={({ target }) => onChangeAction(target)} className="form-select" id={label} >
      <option disabled selected={!defaultV} value="" id={newOptionId}>Selecionar...</option>
      {array.map((value, index) => {
        return (value.item === defaultV ? <Option item={value.item} default={true} key={`${keySub} ${index}`} /> : <Option item={value.item} key={`${keySub} ${index}`} />)
      }
      )}
    </select>
  </div>
  )
}
