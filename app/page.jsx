'use client'

import Dialog from "/components/dialog";
import FloatLabel from "/components/floatlabel";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Link from "next/link";
import { useState } from "react";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY);

export default function Home() {
  const [isClicked, setIsClicked] = useState(false)
  const [amount, setAmount] = useState(0)
  
  const handleSubmit= async (e) =>{
    
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
        className="px-10 py-7  bg-fuchsia-200"
        onClose={() => setIsClicked(false)} 
        closable 
      >

        <form onSubmit={handleSubmit}>
          
          <FloatLabel
            label="Enter amount"
            inputProps={{
              type:"number",
              value : amount,
              onChange:(e)=> {setAmount(e.target.value)},
              autoComplete:"off",
            }}
          />  
          <Link href={"/payment-options?amount="+amount} >
            <button  
              disabled={!amount}
              className={`mt-5 py-1 px-3 text-white rounded-md violet_gradient relative  
              violet_gradient_hover active:brightness-50  transition-all
              ${amount? ' clicked hover:scale-110 ' :' disabled:grayscale '} `}
            >
              Pay
            </button>
          </Link>
        
        </form>  
      
      </Dialog> }     
    </main>
  )
}
