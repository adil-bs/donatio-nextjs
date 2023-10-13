'use client'
import Link from 'next/link'
import React from 'react'

const ErrorPage = ({error,reset}) => {
    console.log(error);
  return (
    <div className='grid grid-flow-col place-content-center'>
        <p className='text-lg font-bold'>Something went wrong :( </p>

        <div className='flex space-x-3 items-center'>
            <button 
                className='p-1 mt-3 bg-red-400 rounded-lg'
                onClick={()=>reset()} 
            > Try Again </button>
            <Link
                className='p-1 mt-3 bg-purple-400 rounded-lg' 
                href={'/'}  
            > Home </Link>  
        </div>
        
    </div>
  )
}

export default ErrorPage