'use client'

import FloatLabel from './floatlabel'
import Image from 'next/image'

const PaymentForm = (props) => {
    const {inputs,handleInputChange,isSubmitting,handleSubmit} = props
    
    const isFormError = inputs => {
        let error = false
        const keysList = Object.keys(inputs)
        keysList.forEach(ele => {
            if (inputs[ele].error?.some(ele => ele.err)) {
                error = true
                return
            }
        })
        return error
    }

  return (
    <form onSubmit={handleSubmit} className=" bg-inherit space-y-6 sm:space-y-8">
          
      {Object.keys(inputs).map(ele => (
        <FloatLabel
          label={inputs[ele].placeholder}
          key = {ele}
          id={ele}
          inputProps={{
            name : ele,
            value : inputs[ele].value,
            type : inputs[ele].type,
            onChange: handleInputChange,
            autoComplete:"off",
            required: true
          }}
          errList={inputs[ele].error}
        />  
      ))}

        <button  
          disabled={isFormError(inputs) || isSubmitting}
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