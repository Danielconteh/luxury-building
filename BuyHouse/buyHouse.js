import catchAsync from '../ErrorController/catchAsync'
import { House,Puchase } from '../mongodConnection/connection'
const stripe = require('stripe')(process.env.STRIP_SERVER_SIDE_KEY)
import { getSession } from 'next-auth/client';





// buy house
export const buyHouse =  catchAsync(async (req, res, next) => {
  const { user } = await getSession({ req });
  console.log(user)

  if (!user) return res.writeHead(302, {
       Location: '/',
     });
   
  
  const house = await House.findOne({ slug: req.query.slug })
  if (!house) return next('invalid house name')

  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        name: `${house.name}`,
        amount: house.price * 100,
        currency: 'usd',
        quantity: 1,
        images: [`${house.image}`],
      },
    ],

    payment_method_types: ['card'],
    mode: 'payment',
    cancel_url: `https://luxury-building.vercel.app/`,

    // fake a user house puc... store  _id
    success_url: `https://luxury-building.vercel.app/api/buyHouse/completed/${house.id}/${user.email}`,
    customer_email: user.email,
    client_reference_id: house.id,
  });
 

  return res.status(200).json({
    status: 'sucessfull',
    price: house.price,
    result: session,
  })
})



export const deleteHouse = catchAsync(async (req, res) => {
  await Puchase.deleteOne({ _id: req.query.slug })
  return res.status(204).end();
 })