const Razorpay = require('razorpay');

export async function GET(req,{params}) {
  
  try {
    var rzp = new Razorpay({
      key_id: process.env.NEXT_PUBLIC_RZP_KEY, 
      key_secret: process.env.RZP_PRIVATE_KEY 
    })
    const details = await rzp.payments.fetch(params.id)

    return new Response(JSON.stringify(details), {
      status: 200, headers: { 'Content-Type': 'application/json' },
    });
  } 

  catch (error) {
    console.log("server side",error.message);
    return new Response(JSON.stringify({ message:"server error" }), {
      status: 500, headers: { 'Content-Type': 'application/json' },
    });  
  }

}