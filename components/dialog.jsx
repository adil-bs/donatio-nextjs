import React from 'react'

const Dialog = ({children,onClose,closable,className}) => {
//   alert(isStrict)
  return (
    <div 
        className="fixed inset-0 flex items-center justify-center backdrop-blur-sm"
        onClick={closable ? onClose : ()=>{}}
    >
        <div 
            onClick={(e)=>e.stopPropagation()} 
            className={`${className ? className:""} relative rounded-xl p-1 shadow-gray-500 shadow-lg`}
        >
            {children}
            <button 
                className='h-6 w-6 text-sm font-bold rounded-full bg-red-600 text-white absolute right-[-10px] top-[-10px] 
                hover:shadow-md hover:shadow-red-600'
                onClick={onClose}
            >
                X
            </button>
        </div>
    </div>
  )
}

export default Dialog