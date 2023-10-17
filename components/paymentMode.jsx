'use client'
import React from 'react'

const PaymentMode = ({mode,list,children}) => {
    const [isExpanded, setIsExpanded] = React.useState(false)
    const handleArrowClick = e => {
      e.stopPropagation()
      setIsExpanded(prev => !prev)
    }

  return (
    <section 
      className='p-5 w-full bg-slate-200 rounded-xl cursor-pointer border-black border-2 md:w-[700px] hover:shadow-lg '
      onClick={()=>{setIsExpanded(true)}}  
    >

      <div className='flex justify-between'>
        <h1 className='text-xl font-semibold'>{mode}</h1>
        <button 
            className={`px-1 pb-1 text-xl font-bold border-2 border-black rounded-full leading-[0.8] hover:bg-slate-300 transition-all 
            hover:shadow-black hover:shadow active:text-white active:border-white ${isExpanded?"rotate-90":"-rotate-90" }`}
            onClick={handleArrowClick}
        > &lt;  </button>
      </div>

      {isExpanded 
      ? children
      : null
      }
        
    </section>
  )
}

export default PaymentMode