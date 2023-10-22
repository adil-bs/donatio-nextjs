const Razorpay = require('razorpay');

export async function POST(req) {
  try {
    const {Name,email,amount} = await req.json()
    var rzp = new Razorpay({
      key_id: process.env.NEXT_PUBLIC_RZP_KEY, 
      key_secret: process.env.RZP_PRIVATE_KEY 
    })
    const unix16MinutesLater = Math.floor(new Date().getTime()/1000 + 16*60)

    const optionsForOrder = {
      amount: amount*100,  
      currency: "INR"
      //  receipt: string (give unique id for the receipt ) 
      //  notes: json object (additional dummy info)
      //  partial_payment: bool (for emi)
    };
    const optionsForInvoice = {
      type:"invoice",
      customer : {     
        name : Name,
        email : email,
        //contact, billing_address, shipping_address
      },
      //customer_id:string create one using customers API to skip the above property
      line_items :[
        {
          //item_id:string create one using items API to skip the below parameters
          name: "Donation",
          description: "One click away",
          amount : amount*100,
          //currency:string imp for internation transac
          //quantity:int
        }
      ],
      expire_by : unix16MinutesLater,
      description : "All heroes don't wear capes",
      //sms_notify:bool ,email_notify:bool ,default 1 for notify, 0 for not notify
      //partial_payment:bool  
      //currency: string , imp for international transaction 
      //draft: bool ,Invoice is created in draft state when value is set to 1.
    }

    const order = await rzp.orders.create(optionsForOrder)
    await rzp.invoices.create(optionsForInvoice)

    return new Response(JSON.stringify(order), {
      status: 200, headers: { 'Content-Type': 'application/json' },
    });
    
  } catch (error) {
    console.log("server side",error);
    return new Response(JSON.stringify({ message:"server error" }), {
      status: 500, headers: { 'Content-Type': 'application/json' },
    });
  }

};