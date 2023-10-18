const Razorpay = require('razorpay');

export async function POST(req) {
  try {
    const data = await req.json()
    var rzp = new Razorpay({
      key_id: process.env.NEXT_PUBLIC_RZP_KEY, 
      key_secret: process.env.RZP_PRIVATE_KEY 
    })

    var options = {
      amount: data*100,  
      currency: "INR"
      //  receipt: string (give unique id for the receipt ) 
      //  notes: json object (additional dummy info)
      //  partial_payment: bool (for emi)
    };

    const order = await rzp.orders.create(options)

    return new Response(JSON.stringify(order), {
      status: 200, headers: { 'Content-Type': 'application/json' },
    });
    
  } catch (error) {
    console.log("server side",error.message);
    return new Response(JSON.stringify({ message:"server error" }), {
      status: 500, headers: { 'Content-Type': 'application/json' },
    });
  }

};