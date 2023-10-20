'use client'
import { useSearchParams } from 'next/navigation'
import React from 'react'

const Result = () => {
    const searchParams = useSearchParams()

  return (
    <div>{searchParams.get("msg")}</div>
  )
}

export default Result