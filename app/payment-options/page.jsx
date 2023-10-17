'use client'
import React from 'react'
import {useSearchParams} from 'next/navigation'
import PaymentMode from '@/components/paymentMode'
import CardForm from '@/components/cardForm'

const PaymentOptionPage = () => {
  const searchParams = useSearchParams()

  React.useEffect(() => {

    

  }, []);

  return (
    <main className='p-10'>
      <h2 className='text-4xl font-semibold text-center'>Select Payment Mode</h2>
      
      <div className='grid justify-items-center mt-10 space-y-5'>
        <PaymentMode mode="Pay via UPI"  list={[]}> 
          <div/>
        </PaymentMode>

        <PaymentMode mode="Pay via cards" list={[]}> 
          <CardForm/>
        </PaymentMode>  

        <PaymentMode mode="Net banking"  list={[]}>
          <div/>
        </PaymentMode>       
      </div>

    </main>
  )
}

export default PaymentOptionPage