import { Puchase, User } from '../../../../mongodConnection/connection';
const stripe = require('stripe')(process.env.STRIP_SERVER_SIDE_KEY);
const micro = require('micro')
import { getToken } from 'next-auth/jwt';


// const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
const secret = process.env.NEXTAUTH_SECRET_KEY; 

const creatBookingCheckOut = async (session,token) => {

  const house = session.client_reference_id;
  // const user = (await User.findOne({ pin: session.customer_details.email }))._id;
  const user = (await User.findOne({ pin: token.pin}))._id;
  if(house && user) await Puchase.create({house,user});  
}

const checkOutHandler = async (req, res) => {


  if (req.method === 'POST') {
      const token = await getToken({ req, secret});
       
       const buf = await micro.buffer(req);
       const sig = req.headers['stripe-signature'];

       let event;

    try {
      event = stripe.webhooks.constructEvent(buf,sig,process.env.STRIPE_WEBHOOK_SECRET);
    } catch (err) {
      res.status(400).send(`Webhook Error: ${err.message}`);
      return;
    }

  
       if (event.type === 'checkout.session.completed') 
         // Handle successful charge
       
         creatBookingCheckOut(event.data.object, token);
        res.json({ received: true, data: event.data.object });
      
      //  ================================
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