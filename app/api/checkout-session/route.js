import getStripe from "@/components/getStripe"

export const POST = async (req,res) => {
  try{
    const stripe = await getStripe()
    
    const checkoutSession=await stripe.checkout.sessions.create({
      submit_type: 'donate',
      payment_method_types: ['card'],
      line_items: [
        {
          name: 'Custom amount donation',
          amount: req.body.amount,
          quantity: 1,
        },
      ],
      success_url: '/',
      cancel_url: '/',
    })    
    
    res.status(200).json(checkoutSession)
  }
  catch(err){
    console.error("api error",err.message);
    res.status(500).json({ error: err.message })
  }
}
