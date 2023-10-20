import Image from 'next/image'
import React from 'react'

const FloatLabel = ({label,inputProps,errList}) => {
  return (
    <div className='bg-inherit'>
      <div className="relative bg-inherit">
        <input
          className='peer w-full mb-2 py-1 px-4 rounded-lg bg-transparent outline-2 outline outline-indigo-300 focus:outline-blue-800 focus:shadow-lg'
          placeholder=' '
          id='amount'
          {...inputProps}
        />
        <label 
          htmlFor='amount'
          className='absolute font-serif text-sm left-2 -top-3 px-2 bg-inherit cursor-text text-black transition-all 
          peer-focus:left-2 peer-focus:-top-3 peer-focus:text-sm peer-focus:text-black
          peer-placeholder-shown:text-lg peer-placeholder-shown:top-0 peer-placeholder-shown:text-slate-500'
        >{label} </label>
      </div>

      {errList?.map(ele => (ele.err ? 

        <div key={ele.id} className='flex items-center space-x-1' >
          <Image src='/caution.png' width={13} height={13} alt=""/>
          <p className='font-semibold text-red-600 text-sm'>{ele.msg}</p>  
        </div> 
        : null
      ))}

    </div>
    
  )
}

export default FloatLabel