import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const notFound = () => {
  return (
    <div className='grid items-center h-screen'>
        <div  className='grid grid-flow-row justify-items-center gap-4' >
            <div className='relative w-2/3 aspect-video lg:w-[55%]'>
            <Image 
                src='/error404.png'
                alt='Error 404'
                fill
            />     
            </div> 
            <p className="text-3xl font-bold">Looks like you are lost</p>
            <Link
                className='relative py-1 px-2 mt-3 bg-purple-500 rounded-lg font-bold text-white clicked 
                hover:shadow-lg hover:scale-105 shadow-slate-500 active:brightness-50 transition-all' 
                href={'/'}  
            > Go Home </Link> 
        </div>    
    </div>
    
  )
}

export default notFound