'use client'
import Row from '@/components/row'
import { fetchReq, toCurrency } from '@/components/utility'
import Image from 'next/image'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import React, { useState } from 'react'

const Result = () => {
    const searchParams = useSearchParams()
    const [details,setDetails] = useState()
    const [isExpanded, setIsExpanded] = useState(false)
    const [isCopied,setIsCopied] = useState(false)

    React.useEffect(()=>{
      if (searchParams.get("fail")) return

      fetchReq("/api/payments/"+searchParams.get("id"))
        .then(data => setDetails(data))
    },[])

    function handleCopy() {
      setIsCopied(true)
      navigator.clipboard.writeText(details.id)
      setTimeout( () => setIsCopied(false) ,3000)
    }

    let paymentTime = '' 
    if (details) {
      const date = new Date((details.created_at * 1000 ));
      const options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' };
      paymentTime = new Intl.DateTimeFormat('en-US', options).format(date);
    }

console.log(details );
    return (
    <main className='grid p-10 content-center justify-items-center h-screen'>
      
      <div className='relative h-24 w-24 mb-3'>
        <span className={`absolute bottom-5 right-5 h-14 w-14 animate-ping rounded-full ${searchParams.get("fail") ?" bg-red-700" :"bg-green-800"}`}/>
        <Image src={searchParams.get("fail")?"/redcross.png" :'/greentick.png'}  layout="fill" alt=''/>
      </div>

      <div className={`grid transition-all`}>

        <div className='flex justify-center'>
          <p  className={`text-3xl font-semibold ${searchParams.get("fail")?" text-red-500":""}`}> 
            {searchParams.get("msg")} 
          </p>

          <button 
            className={`ml-4 px-2 pb-2 border border-black text-3xl text-gray-500 font-semibold rounded-full leading-[0] transition-all 
            hover:shadow-black hover:shadow hover:bg-zinc-400 active:text-white active:border-white ${isExpanded?"rotate-90":"-rotate-90" }`}
            onClick={() => setIsExpanded(prev => !prev)}
            hidden={searchParams.get("fail")}
          > &lt;  </button>  
        </div>

        {isExpanded && 
        <div className={`mt-5 grid transition-all`} >
          <hr className=' mb-3 bg-gradient-to-r from-red-400 via-purple-500 to-indigo-600 h-1'/>

          {details ? 
          <>
            <div className='relative'>
              <Row 
                theKey={"Payment ID"} 
                value={details.id}
              />
              <Image 
                className='absolute w-auto right-0 top-1 cursor-pointer scale-150'
                src={isCopied ?'/copied.png':'/copy.png'}
                height={16}
                width={16}
                alt=''
                onClick={handleCopy}
              /> 
            </div>
            <Row 
              theKey={"Donated Amount"} 
              value={toCurrency( details.amount/100,'en-IN',"INR" )}
            />
            <Row
              theKey={"Time of payment"}
              value={paymentTime}
            />
            <Row 
              theKey={"GST"} 
              value={toCurrency( details.tax/100,'en-IN',"INR" )}
            />
            <Row 
              theKey={"Fee (including GST) charged by Razorpay"} 
              value={toCurrency( details.tax/100,'en-IN',"INR" )}
            />
          </>
          :
          <div className='my-5 grid content-center justify-items-center'>
            <Image src='/simpleLoader.gif' height={60} width={60} alt=''/>
            <p className=' text-gray-500'>Fetching your payment details...</p>
          </div>
          }
        </div>}


      </div>

      <Link 
        href={'/'}
        className='mt-10 py-2 px-3 relative clicked text-white violet_gradient rounded-2xl transition-all
        hover:scale-110 violet_gradient_hover clicked active:brightness-50'
      > Go Back </Link>
    </main> 
  )
}

export default Result