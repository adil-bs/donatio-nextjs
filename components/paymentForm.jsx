import React from 'react'
import Dialog from './dialog'
import FloatLabel from './floatlabel'

const PaymentForm = ({open,onClose,formSubmit,}) => {
  return (
    <Dialog
        className="px-16 py-7 bg-violet-200"
        open = {open}
        onClose={onClose} 
        closable 
      >
        <p className="text-2xl font-bold mb-10 px-9">One Step Closer</p>
        <form onSubmit={formSubmit} className=" bg-inherit">
          
          <FloatLabel
            label="Enter amount"
            inputProps={{
              value : amount,
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
  )
}

export default PaymentForm