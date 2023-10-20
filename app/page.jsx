'use client'

import { fetchReq, loadScript } from "@/components/utility";
import Dialog from "/components/dialog";
import FloatLabel from "/components/floatlabel";
import Link from "next/link";
import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const [isClicked, setIsClicked] = useState(false)
  const [userInput, setUserInput] = useState({name:"",email:"",amount:""})
  const [isPaying, setIsPaying] = useState(false)
  const [verifying,setVerifying] = useState(false)
  const [errList,setErrList] = useState([
    {id:0,err:false,msg:"Amount shouldn't exceed 1 lakh rupees"},
    {id:1,err:true,msg:"Please donate minimum of 5 rupees"},
  ])
  const handleSubmit= async (e) =>{
    e.preventDefault()

    setIsPaying(true)
    const resData = await fetchReq("/api/orders",{
      method:"POST",
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(setUserInput.amount.replace(/\s+/g,"")),
    })
    
    const loadRazorpayScript = await loadScript("https://checkout.razorpay.com/v1/checkout.js")

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
            body: JSON.stringify(res),
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
      modal : {ondismiss : () => setIsPaying(false) },
    })

    rzp.open()
  }

  const handleAmountChange = e =>{
    let newAmount = e.target.value.replace(/\s+/g,"")

    if ( newAmount.match(/^\d*$/)) {

      const errConditions = [
        parseFloat(newAmount || 0) > 100000,
        parseFloat(newAmount || 0) < 5
      ]
      setErrList(prev => prev.map(ele => ( {...ele,err:errConditions[ele.id] } ) ))

      for (let i = newAmount.length-3 ; i > 0; i -= 2) {
        newAmount = newAmount.slice(0,i) + ' ' + newAmount.slice(i)      
      }

      setAmount(newAmount)  
    }  
  }

  return (
    <main className="grid content-center text-center h-full bg-[url('/homeImage.jpg')] bg-cover bg-center">
    <div className="grid justify-items-center p-7 backdrop-brightness-50 overflow-hidden">

      <p 
        className="text-5xl font-bold max-w-screen-lg
        bg-gradient-to-r from-blue-500 via-purple-500 to-violet-800 text-transparent bg-clip-text"
      >
        Sevice to others is the rent you pay for your room here on Earth
      </p>
      <p className="my-5 ml-60 text-2xl text-white"> 
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

      <Dialog
        className="px-16 py-7 bg-violet-200"
        open = {isClicked}
        onClose={() => setIsClicked(false)} 
        closable 
      >
        <p className="text-2xl font-bold mb-10 px-9">One Step Closer</p>
        <form onSubmit={handleSubmit} className=" bg-inherit">
          
          <FloatLabel
            label="Enter amount"
            inputProps={{
              value : setUserInput.amount,
              onChange: handleAmountChange,
              autoComplete:"off"
            }}
            errList={errList}
          />  
            <button  
              disabled={errList.some(ele => ele.err===true) || isPaying}
              className={`inline-flex items-center mt-5 py-1 px-3 text-white rounded-md violet_gradient relative 
              enabled:hover:scale-110 enabled:violet_gradient_hover active:brightness-50  transition-all disabled:grayscale `}
            >
              {isPaying 
                ? <Image src='/simpleLoader.gif' width={30} height={40} alt=""/> 
                : "Donate"
              }
            </button>
        
        </form>  

      </Dialog>  

      <Dialog 
        className="h-[150vh] w-[150vw] grid content-center justify-items-center gap-4 bg-gradient-radial from-violet-500 " 
        open={verifying}
      >
        <Image src={"/simpleLoader.gif"} height={70} width={70} alt=""/>
        <p className="text-3xl font-bold">Verifying payment</p>
      </Dialog>

    </div>
    </main>
  )
}
