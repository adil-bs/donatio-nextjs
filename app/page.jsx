'use client'

import Dialog from "/components/dialog";
import { useReducer, useState } from "react";
import PaymentForm from "@/components/paymentForm"; 
import { fetchReq, indianCurrencyFormat } from "@/components/utility";
import { useRouter } from "next/navigation";
import Image from "next/image";
import useRazorpay from "react-razorpay";

const reduceInputs = (state, action) => {
  let {input,value} = action
  
  if (input === "amount" || input === "number") {
    value = parseFloat( value.replace(/[^0-9.]/g, '') ) || ''
  }
  
  let newState = {...state}
  newState[input].value = input === "amount" ? indianCurrencyFormat(value) : value
  newState[input].error = state[input].error.map(ele => {
    ele.err = ele.condition(value)
    return ele
  })
  return newState
}

const initialInputs = {
  Name: {
    value : '',
    placeholder:'Enter your name',
    error : [ 
      {err:false,msg:"Name shouldn't be less than 4 characters", condition : val => val.length < 4}
    ],
  },
  email:{
    value : '',
    placeholder:'Enter your email address',
    error : [ 
      {err:false,msg:"Enter a valid email", condition : val => ! val.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)}
    ],
  },
  number : {
    value : '',
    placeholder:'Enter contact number',
    error : [ 
      {err:false,msg:"Enter a valid phone number", condition : val => String(val).length < 10}
    ],
  },
  amount : {
    value : '',
    placeholder:'Enter amount',
    error : [ 
      {err:false,msg:"Amount shouldn't exceed 1 lakh rupees", condition : val => (val || 0) > 100000 },
      {err:true,msg:"Please donate minimum of 5 rupees", condition : val => (val || 0) < 5},
    ],
  }
}

export default function Home() {
  const [Razorpay] = useRazorpay()
  const router = useRouter();
  const [isClicked, setIsClicked] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [verifying,setVerifying] = useState(false)
  const [inputs, dispatchInputs] = useReducer(reduceInputs, initialInputs)

  const handleSubmit = async (e) =>{
    e.preventDefault()
    setIsSubmitting(true)
    
    const inputsValues = Object.keys(inputs).reduce( (acc,key ) => {
      acc[key] = key === "amount" 
        ? inputs[key].value.replace(/\s+/g,"") 
        : inputs[key].value
      return acc 
    },{})

    const resData = await fetchReq("/api/orders",{
      method:"POST",
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(inputsValues),
    })
    
    const rzp = new Razorpay({
      key: process.env.NEXT_PUBLIC_RZP_KEY,
      amount: resData.amount,
      currency: resData.currency,
      order_id: resData.id,
      name:"Donation",
      image: "/donate.png",

      handler: async (res) => {
        try {
          setVerifying(true)
          const paymentVerificationStatus = await fetchReq("/api/verify",{
            method:"POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({...res, order_id: resData.id}),
          })
          router.push("/result?msg="+paymentVerificationStatus.message+"&id="+res.razorpay_payment_id)
        } catch (error) {
          console.log(error);
          router.push("/result?msg="+error.message+"&id="+res.razorpay_payment_id+"&fail=true")
        } 
      },
      prefill:{
        name : inputs.Name.value,
        email : inputs.email.value,
        contact : inputs.number.value,
      },
      theme: { color:"#5b21b6"},
      modal : {ondismiss : () => setIsSubmitting(false) },
    })
    rzp.open()
  }

  const handleInputChange = e =>{
    dispatchInputs({input:e.target.name, value: e.target.value})
  }

  return (
    <main className="grid content-center text-center h-full overflow-hidden">
    <div className="grid justify-items-center p-7 backdrop-brightness-50">

      <p 
        className="text-5xl font-bold max-w-screen-lg
        bg-gradient-to-r from-blue-500 via-purple-500 to-violet-800 text-transparent bg-clip-text"
      >
        Sevice to others is the rent you pay for your room here on Earth
      </p>
      <p className="my-5 translate-x-[50%] text-2xl text-white"> 
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

      </div>

      <Dialog
        className="px-16 py-7 bg-violet-200 w-1/2 max-md:w-11/12 max-sm:px-7"
        open = {isClicked}
        onClose={() => setIsClicked(false)} 
        closable 
      >
        <p className="text-2xl font-bold mb-10 px-9">Let us know you</p>
        <PaymentForm { ...{
          inputs,
          handleInputChange,
          isSubmitting,
          handleSubmit,
        }} />  

      </Dialog>

      <Dialog
        className="h-[150vh] w-[150vw] grid content-center justify-items-center gap-4 " 
        open={verifying}
      >
        <Image src={"/simpleLoader.gif"} height={70} width={70} alt=""/>
        <p className="text-3xl text-slate-400 font-bold">Verifying payment</p>
      </Dialog>

    </main>
  )
}

