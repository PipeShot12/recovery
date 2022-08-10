import React from 'react'

export default function Index({size,label,placeholder,title,onChangeAction,type,defaultV}) {
    
    const handleChange = (e) =>{
        onChangeAction(((e.target.value).toUpperCase()).trim())
    }
  return (
    <div className={size}>
    <label htmlFor={label} className="form-label">{title}</label>
    <input autoComplete='off' onChange={(e)=> handleChange(e)} type={!type ? 'text': type} defaultValue={defaultV} className="form-control" id={label} placeholder={placeholder} />
  </div>
  )
}

