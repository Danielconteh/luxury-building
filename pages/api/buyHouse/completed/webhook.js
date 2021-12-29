import { buffer } from 'micro';
import { Puchase, User,House } from '../../../../mongodConnection/connection';
const stripe = require('stripe')(process.env.STRIP_SERVER_SIDE_KEY);

export const config = {api: {bodyParser: false, },};

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
         return res.status(400).send(`Webhook Error: ${err.message}`);
       }
         
       if (event.type === 'checkout.session.completed') {
           const session = event.data.object
            const houseID = (
              await House.findOne({
                name: session.line_item_group.line_items.name,
              })
            )._id;
            const userID = (
              await User.findOne({ email: session.customer_email })
            )._id;
            const priceID = session.payment_intent.amount / 100;
           const data =  await Puchase.create({
              house: houseID,
              user: userID,
              price: priceID,
            });

            return res.status(200).json({ received: true,data });
      };
         
       
      //  ================================
     } else {
       res.setHeader('Allow', 'POST');
       res.status(405).end('Method Not Allowed');
     }
};


export default checkOutHandler;