import { buffer } from 'micro';
import { Puchase, User,House } from '../../../../mongodConnection/connection';
const Stripe = require('stripe');

export const config = {
  api: {
    bodyParser: false, // Disallow body parsing, consume as stream
  },
};

const stripe = new Stripe(process.env.STRIP_SERVER_SIDE_KEY, {
  apiVersion: '2020-08-27',
});

const creatBookingCheckOut = async session => {
    const houseID = (
      await House.findOne({ name: session.line_item_group.line_items.name })
    )._id;
    const userID = (await User.findOne({ email: session.customer_email }))._id;
    const priceID = session.payment_intent.amount / 100;
    await Puchase.create({
      house: '612a0bf674f1a82d902b78a7',
      user: userID,
      price: 9000000,
    });
        
}

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;


const checkOutHandler = async (req, res) => {

     if (req.method === 'POST') {
       const buf = await buffer(req);
       const sig = req.headers['stripe-signature'];

       let event;

       try {
         event = stripe.webhooks.constructEvent(buf, sig, webhookSecret);
       } catch (err) {
         console.log('error', err)
         res.status(400).send(`Webhook Error: ${err.message}`);
         return;
       }

         
       if (event.type === 'checkout.session.completed') {
         // Handle successful charge
         console.log(event.data.object);
        //  creatBookingCheckOut(event.data.object);
         return res.json({
           name: 'danico',
           data:event.data.object,
           received: true
         }); 
           
         }
         
          return res.json({ received: true });  
       
      //  ================================
     } else {
       res.setHeader('Allow', 'POST');
       res.status(405).end('Method Not Allowed');
     }
};


export default checkOutHandler;