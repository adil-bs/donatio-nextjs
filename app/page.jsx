'use client'

import { fetchReq, loadScript } from "@/components/utility";
import Dialog from "/components/dialog";
import FloatLabel from "/components/floatlabel";
import Link from "next/link";
import { useState } from "react";

export default function Home() {
  const [isClicked, setIsClicked] = useState(false)
  const [amount, setAmount] = useState('')

  const handleSubmit= async (e) =>{
    e.preventDefault()

    const resData = await fetchReq("/api/orders",{
      method:"POST",
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(amount.replace(/\s+/g,"")),
    })
    
    const loadRazorpayScript = await loadScript("https://checkout.razorpay.com/v1/checkout.js")

    const rzp = new Razorpay({
      key: process.env.NEXT_PUBLIC_RZP_KEY,
      amount: resData.amount,
      currency: resData.currency,
      order_id: resData.id,
      name:"Donate to Greater Good",

      handler: async (res) => {
        try {
          const paymentVerificationStatus = await fetchReq("/api/verify",{
            method:"POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(res),
          })
          console.log(paymentVerificationStatus);
        } catch (error) {
          console.log(error);
        }
      },

      theme: { color:"#5b21b6"}

    })

    rzp.open()
  }

  const handleAmountChange = e =>{
    let newAmount = e.target.value.replace(/\s+/g,"")

    if ( newAmount.match(/^\d*$/)) {
      for (let i = newAmount.length-3 ; i > 0; i -= 2) {
        newAmount = newAmount.slice(0,i) + ' ' + newAmount.slice(i)      
      }

      setAmount(newAmount)  
    }  
  }

  return (
    <main className="px-7 flex flex-col justify-center items-center text-center h-full" >

      <p 
        className="text-5xl font-bold max-w-screen-lg
        bg-gradient-to-r from-blue-500 via-purple-500 to-violet-800 text-transparent bg-clip-text"
      >
        Sevice to others is the rent you pay for your room here on Earth
      </p>
      <p className="my-5 ml-60 text-2xl"> 
        -Mohammed Ali
      </p>

      <button
        className="relative mt-7 py-2 px-5 text-xl text-slate-50 violet_gradient rounded-2xl transition-all
        hover:scale-110 violet_gradient_hover clicked active:brightness-50 "
        href={isClicked ? "/options":""}
        onClick={()=>setIsClicked(true)}
      >
        Donate To The Cause
      </button> 

      {isClicked &&
      <Dialog
        className="px-16 py-7 bg-violet-200"
        onClose={() => setIsClicked(false)} 
        closable 
      >
        <p className="text-2xl font-bold pb-5 px-9">One Step Closer</p>
        <form onSubmit={handleSubmit}>
          
          <FloatLabel
            label="Enter amount"
            inputProps={{
              value : amount,
              onChange: handleAmountChange,
              autoComplete:"off"
            }}
          />  
          {/* <Link href={"/payment-options?amount="+amount} > */}
            <button  
              disabled={!amount}
              className={`mt-5 py-1 px-3 text-white rounded-md violet_gradient relative  
              violet_gradient_hover active:brightness-50  transition-all
              ${amount? ' clicked hover:scale-110 ' :' disabled:grayscale '} `}
            >
              Donate
            </button>
          {/* </Link> */}
        
        </form>  
      
      </Dialog> }     
      
    </main>
  )
}
