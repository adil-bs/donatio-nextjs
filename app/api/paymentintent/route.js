export async function POST(req) {
  try {
    const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY);
    const data = await req.json()

    if (!data.amount) {
      throw new Error("bad request")
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: null,
      currency: "inr",
    });

    return new Response.json({ clientSecret: paymentIntent.client_secret })
    
  } catch (error) {

    return new Response(JSON.stringify({ message: error.message }), {
      status: (error.message === "bad request") ? 400:500  ,
      headers: { 'Content-Type': 'application/json' },
    });
  }

};