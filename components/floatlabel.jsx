import React from 'react'

const FloatLabel = ({label,inputProps}) => {
  return (
    <div className="relative">
        <input
            className='peer py-1 px-2 rounded-lg bg-transparent outline-2 outline outline-indigo-300 focus:outline-blue-800 focus:shadow-lg'
            placeholder=' '
            id='amount'
            {...inputProps}
        />
        <label 
            htmlFor='amount'
            className='absolute text-sm left-2 -top-3 bg-inherit cursor-text text-black transition-all 
            peer-focus:left-2 peer-focus:-top-3 peer-focus:text-sm peer-focus:text-black
            peer-placeholder-shown:text-lg peer-placeholder-shown:top-0 peer-placeholder-shown:text-slate-500'
        >{label}</label>
    </div>
  )
}

export default FloatLabel