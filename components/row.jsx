import React from 'react'

const Row = ({theKey,value}) => {
  return (
    <div className='mb-2 grid grid-cols-2 w-full gap-3 items-center'>
        <p>{theKey}</p>
        <p>{value}</p>
    </div>
  )
}

export default Row