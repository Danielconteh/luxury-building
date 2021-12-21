import mongoose from 'mongoose'
import { houseDesc } from '../model/houseSchema'
import { userData } from '../model/userSchema'
import { review } from '../model/reviewSchema'
import { puchase } from '../model/puchaseCompleted'

const options = {
  useNewUrlParser: true,
  useFindAndModify: false,
  useCreateIndex: true,
  useUnifiedTopology: true,
}
const connect1 = mongoose.createConnection(
  process.env.CONNECTION_URI,
  options
);

// const connect2 = mongoose.createConnection(process.env.CONNECTION_URI, options)

export const House = connect1.model('House', houseDesc)
export const User = connect1.model('User', userData)
export const Review = connect1.model('Review', review)
export const Puchase = connect1.model('Puchase', puchase)
