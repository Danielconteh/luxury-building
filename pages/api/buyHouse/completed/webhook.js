import { Puchase, User } from '../../../../mongodConnection/connection';
const stripe = require('stripe')(process.env.STRIP_SERVER_SIDE_KEY);
const micro = require('micro')


// const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

const creatBookingCheckOut = async session => {
  const data = session.client_reference_id.split('=');
  const house = data[0];
  // const user = (await User.findOne({ pin: session.customer_details.email }))._id;
  const user = (await User.findOne({ pin: data[1]}))._id;
  if(house && user) await Puchase.create({house,user});  
}

const checkOutHandler = async (req, res) => {


  if (req.method === 'POST') {
       
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
       
         creatBookingCheckOut(event.data.object);
        res.json({ received: true});
      
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