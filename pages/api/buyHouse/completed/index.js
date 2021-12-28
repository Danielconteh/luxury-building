import { buffer } from 'micro';
import Stripe from 'stripe';
import { Puchase, User } from '../../../../mongodConnection/connection';
const stripe = require('stripe')(process.env.STRIP_SERVER_SIDE_KEY);



const creatBookingCheckOut = async session => {
           console.log('reached22222222222222222222!!!!');

    const house = session.client_reference_id;
    const user = (await User.findOne({ email: session.customer_email }))._id;
    const price = session.line_items[0].amount / 100;
   const data = await Puchase.create({ house, user, price });
           console.log(data);
  
}


// const stripe = new Stripe(process.env.STRIP_SERVER_SIDE_KEY, {
//   apiVersion: '2020-08-27',
// });

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;


const checkOutHandler = async (req, res) => {

     if (req.method === 'POST') {
       const buf = await buffer(req);
       const sig = req.headers['stripe-signature'];

       let event;

       try {
         event = stripe.webhooks.constructEvent(buf, sig, webhookSecret);
       } catch (err) {
         console.log(err.message)
         res.status(400).send(`Webhook Error: ${err.message}`);
         return;
       }

         
         if (event.type === 'checkout.session.completed') {
           // Handle successful charge
           console.log('reached!!!!')
           console.log(event.data.object);
           creatBookingCheckOut(event.data.object);
         } 
         res.json({ received: true });     
     } else {
       res.setHeader('Allow', 'POST');
       res.status(405).end('Method Not Allowed');
     }
};

export const config = {
  api: {
    bodyParser: false, // Disallow body parsing, consume as stream
  },
};

export default checkOutHandler;