import catchAsync from '../ErrorController/catchAsync'
import { House,Puchase,User } from '../mongodConnection/connection'
const stripe = require('stripe')(process.env.STRIP_SERVER_SIDE_KEY)
import { getSession } from 'next-auth/client';
import { myOwnMadeError } from '../ErrorController/errorController';

// buy house
export const buyHouse =  catchAsync(async (req, res, next) => {
  const { user } = await getSession({ req });

  if (!user) return res.writeHead(302, {
       Location: '/',
  });
  
    // user exit
     const check_user = await User.findOne({ email: user.email });
   
     
     const house = await House.findOne({ slug: req.query.slug })
    if (!house) return next(myOwnMadeError(`invalid house name!`, 'danicoError'));
  

  // return if user has already puschased this house
      const check_if_house_has_been_puscgased = await Puchase.find({
        $and: [{ user: check_user._id }, { house: house.id }],
      });
  if (check_if_house_has_been_puscgased.length !== 0) return next(
    myOwnMadeError(
      `you have already buy this house. please buy another one!`,
      'danicoError'
    )
  );
  //==================  =================================================   

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
    cancel_url: `https://luxury-building.vercel.app/${house.slug}`,

    success_url: 'https://luxury-building.vercel.app/store',

    // customer_email: user.email,
      customer_email:null,
    client_reference_id: house.id, // needed for strpe web-hook
  });
 

  return res.status(200).json({
    status: 'sucessfull',
    price: house.price,
    result: session,
  })
})



// don't use catchAsync here 💥
export const deleteHouse = async (req, res) => {
  const data = await Puchase.deleteOne({ _id: req.query.slug })
 return res.status(200).json({
  data
 });
 }