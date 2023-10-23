import Image from 'next/image'
import React from 'react'

const FloatLabel = ({label,inputProps,errList,id}) => {
  const {className,...mainInputProps} = inputProps
  return (
    <div className='bg-inherit space-y-1'>
      <div className="relative bg-inherit">
        <input
          className={className+' h-10 sm:h-12 peer w-full px-4 rounded-lg bg-transparent outline-2 outline outline-indigo-300 focus:outline-blue-800 focus:shadow-lg '}
          placeholder=' '
          id={id}
          {...mainInputProps}
        />
        <label 
          htmlFor={id}
          className='absolute font-serif sm:text-sm text-xs left-2 translate-y-[-52%] h-fit px-2 bg-inherit cursor-text text-black transition-all 
          sm:peer-focus:text-sm peer-focus:text-xs peer-focus:text-black peer-focus:translate-y-[-52%] peer-focus:bottom-auto
          sm:peer-placeholder-shown:text-lg peer-placeholder-shown:text-base peer-placeholder-shown:bottom-[50%] peer-placeholder-shown:translate-y-[50%] peer-placeholder-shown:text-slate-500 '
        >{label} </label>
      </div>

      {errList?.map(ele => (ele.err ? 

        <div key={ele.msg} className='flex flex-row items-center text-left space-x-1' >
          <Image src='/caution.png' width={13} height={13} alt=""/>
          <p className='flex flex-wrap font-semibold text-red-600 sm:text-sm text-xs'>{ele.msg}</p>  
        </div> 
        : null
      ))}

    </div>
    
  )
}

export default FloatLabel