const crypto = require('crypto');
export async function POST(req) {
    try {
        const {razorpay_order_id,razorpay_payment_id,razorpay_signature} = await req.json()
        const signature = razorpay_order_id + "|" + razorpay_payment_id
        const expectedSignature = crypto
          .createHmac("sha256",process.env.RZP_PRIVATE_KEY)
          .update(signature.toString())
          .digest("hex")

        if (expectedSignature === razorpay_signature) {
            return new Response(JSON.stringify({ message: "Payment Verified" }), {
                status: 200, headers: { 'Content-Type': 'application/json' },
            })
        } else {
            return new Response(JSON.stringify({ message: "Payment Not Verified" }), {
                status: 400, headers: { 'Content-Type': 'application/json' },
            })
        }
    } 
    
    catch (error) {
        console.log("server side",error.message);
        return new Response(JSON.stringify({ message:"server error" }), {
          status: 500, headers: { 'Content-Type': 'application/json' },
        });
    }
}