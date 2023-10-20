import React from 'react'

const Dialog = ({children,open,onClose,closable,className}) => {

  return (
    <div 
        className={`fixed inset-0 flex items-center justify-center backdrop-blur-sm transition-all ${open ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={closable ? onClose : ()=>{}}
    >
        <div 
            onClick={(e)=>e.stopPropagation()} 
            className={`${className ? className:""} relative rounded-xl p-1 shadow-gray-500 shadow-lg `}
        >
            {children}
            <button 
                className='h-6 w-6 text-sm font-bold rounded-full bg-red-600 text-white absolute right-[-10px] top-[-10px] 
                hover:shadow-md hover:shadow-red-600'
                onClick={onClose}
            >
                X
            </button>

            {/* <div className='flex justify-end'>
                <button
                    className='px-3 py-1 rounded-lg text-white transition-all bg-gradient-to-r from-red-600 to-orange-400 
                    hover:scale-110 '
                    onClick={onClose}
                > 
                    Cancel
                </button>
            </div> */}
            
        </div>
    </div>
  )
}

export default Dialog