'use client'
import React from 'react'
import {useSearchParams} from 'next/navigation'
import { fetchReq } from '@/components/utility'

const PaymentOptionPage = () => {
  const searchParams = useSearchParams()
  const [clientSecret, setClientSecret] = React.useState("");

  React.useEffect(() => {

    // fetch("/api/paymentintent", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({ amount : searchParams.get("amount") }),
    // })
    //   .then((res) => res.json())
    //   .then((data) => {
    //     setClientSecret(data.clientSecret)
    //     console.log(clientSecret);
    //   })
    async function getClientSecret(){
      const data = await fetchReq("/api/paymentintent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount : searchParams.get("amount") }),
      }) 
      setClientSecret(data)
    }
    getClientSecret()
    console.log(clientSecret);

  }, []);

  return (
    <div>OptionPage</div>
  )
}

export default PaymentOptionPage