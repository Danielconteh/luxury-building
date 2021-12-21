import { Mongoose, Schema } from 'mongoose'

export const puchase = new Schema({
  house: {
    type: Schema.Types.ObjectId,
    ref: 'House',
    required: [true, 'there must be a house to buy'],
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'there must be user'],
  },
  createdAt: { type: Date, default: Date.now() },
  paid: { type: Boolean, default: true },
})

puchase.index({ user: 1, house: 1 }, { unique: true });

puchase.pre(/^find/, function(next){
this.populate({path:'user', select:'-_id -__v'}).populate({path:'house', select:'image name slug country rooms price meter -_id'})
  next()
})