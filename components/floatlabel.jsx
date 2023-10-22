import Image from 'next/image'
import React from 'react'

const FloatLabel = ({label,inputProps,errList,id}) => {
  const {className,...mainInputProps} = inputProps
  return (
    <div className='bg-inherit space-y-1'>
      <div className="relative bg-inherit">
        <input
          className={className+' h-12 peer w-full py-1 px-4 autofill:shadow-inner rounded-lg bg-transparent outline-2 outline outline-indigo-300 focus:outline-blue-800 focus:shadow-lg '}
          placeholder=' '
          id={id}
          {...mainInputProps}
        />
        <label 
          htmlFor={id}
          className='absolute font-serif text-sm left-2 -top-3 h-fit px-2 bg-inherit cursor-text text-black transition-all 
          peer-focus:left-2 peer-focus:-top-3 peer-focus:text-sm peer-focus:text-black
          peer-placeholder-shown:text-lg peer-placeholder-shown:top-auto peer-placeholder-shown:bottom-3  peer-placeholder-shown:text-slate-500'
        >{label} </label>
      </div>

      {errList?.map(ele => (ele.err ? 

        <div key={ele.msg} className='flex flex-row items-center text-left space-x-1' >
          <Image src='/caution.png' width={13} height={13} alt=""/>
          <p className='flex flex-wrap font-semibold text-red-600 text-sm'>{ele.msg}</p>  
        </div> 
        : null
      ))}

    </div>
    
  )
}

export default FloatLabel