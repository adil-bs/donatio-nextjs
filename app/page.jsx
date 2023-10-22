'use client'

import Dialog from "/components/dialog";
import { useReducer, useState } from "react";
import PaymentForm from "@/components/paymentForm"; 
import { fetchReq, loadScript } from "@/components/utility";
import { useRouter } from "next/navigation";
import Image from "next/image";

const reduceErrObject = (state, action) => {
  let {input,value} = action
  if (input === "amount") {
    value = parseFloat(value.replace(/\s+/g,""))
  }
  return ({
    ...state,
    [input] : state[input].map(ele => ({
      ...ele,
      err : ele.condition(value) 
    }))
  })  
}
const initialErrObject = {
  Name: [ 
    {id:0,err:false,msg:"Name shouldn't be less than 4 characters", condition : val => val.length < 4}
  ],
  email:[
    {id:0,err:false,msg:"Enter a valid email", condition : val => ! val.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)}
  ],
  amount : [
    {id:0,err:false,msg:"Amount shouldn't exceed 1 lakh rupees", condition : val => (val || 0) > 100000 },
    {id:1,err:true,msg:"Please donate minimum of 5 rupees", condition : val => (val || 0) < 5},
  ]
}

export default function Home() {
  const [isClicked, setIsClicked] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter();
  const [userInput, setUserInput] = useState({Name:"",email:"",amount:""})
  const [verifying,setVerifying] = useState(false)
  const [errObject, dispatchErrObject] = useReducer(reduceErrObject, initialErrObject)

  const handleSubmit = async (e) =>{
    e.preventDefault()

    setIsSubmitting(true)
    const resData = await fetchReq("/api/orders",{
      method:"POST",
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        ...userInput,
        amount:userInput.amount.replace(/\s+/g,"")
      }),
    })
    
    await loadScript("https://checkout.razorpay.com/v1/checkout.js")

    const rzp = new Razorpay({
      key: process.env.NEXT_PUBLIC_RZP_KEY,
      amount: resData.amount,
      currency: resData.currency,
      order_id: resData.id,
      name:"Donate to Greater Good",
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
          router.push("/result?msg="+error.message+"&fail=true")
        } finally {
          setVerifying(false)
        }
      },

      theme: { color:"#5b21b6"},
      modal : {ondismiss : () => setIsSubmitting(false) },
    })
    rzp.open()
  }

  const handleInputChange = e =>{
    if (e.target.name === "amount") {
      let newAmount = e.target.value.replace(/\s+/g,"")
      if ( !newAmount.match(/^\d*$/)) return

      for (let i = newAmount.length-3 ; i > 0; i -= 2) {
        newAmount = newAmount.slice(0,i) + ' ' + newAmount.slice(i)      
      }      
      setUserInput(prev =>( {...prev, amount:newAmount}))  
    } else {
      setUserInput(prev => ({...prev,[e.target.name] : e.target.value}))
    } 

    dispatchErrObject({input:e.target.name, value: e.target.value})
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
        className="px-16 py-7 bg-violet-200 w-4/5 md:w-[650px]"
        open = {isClicked}
        onClose={() => setIsClicked(false)} 
        closable 
      >
        <p className="text-2xl font-bold mb-10 px-9">Let us know you</p>
        <PaymentForm { ...{
          userInput,
          errObject,
          handleInputChange,
          isSubmitting,
          handleSubmit,
        }} />  

      </Dialog>

      <Dialog
        className="h-[150vh] w-[150vw] grid content-center justify-items-center gap-4 bg-gradient-radial from-violet-500 " 
        open={verifying}
      >
        <Image src={"/simpleLoader.gif"} height={70} width={70} alt=""/>
        <p className="text-3xl font-bold">Verifying payment</p>
      </Dialog>

    </main>
  )
}

