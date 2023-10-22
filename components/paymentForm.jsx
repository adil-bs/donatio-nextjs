'use client'

import FloatLabel from './floatlabel'
import { isFormError } from './utility'
import Image from 'next/image'

const PaymentForm = (props) => {
    const {userInput,errObject,handleInputChange,isSubmitting,handleSubmit} = props
  return (
    <form onSubmit={handleSubmit} className=" bg-inherit space-y-8">
          
      {Object.keys(userInput).map(ele => (
        <FloatLabel
          label={"Enter "+ele}
          key = {ele}
          id={ele}
          inputProps={{
            name : ele,
            value : userInput[ele],
            onChange: handleInputChange,
            type:ele==="email" ? "email" : "text",
            autoComplete:"off",
            required: true
          }}
          errList={errObject[ele]}
        />  
      ))}

        <button  
          disabled={isFormError(errObject) || isSubmitting}
          className={`inline-flex items-center mt-5 py-1 px-3 text-white rounded-md violet_gradient 
          enabled:hover:scale-110 enabled:violet_gradient_hover enabled:active:brightness-50 transition-all disabled:grayscale `}
        >
          {isSubmitting 
            ? <Image src='/simpleLoader.gif' width={30} height={40} alt=""/> 
            : "Donate"
          }
        </button>
        
    </form>
  )
}

export default PaymentForm