import mongoose, { Schema } from 'mongoose'

export const review = new Schema(
  {
    review: {
      type: String,
      require: [true, 'Review can not be empty'],
    },
    houseID: {
      type: Schema.Types.ObjectId,
      ref: 'House',
      require: [true, 'Review must belong to a tour'],
    },
    userID: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      require: [true, 'Review must belong to a tour'],
    },
    createdAt: { type: Date, default: Date.now },
  },
  { toObject: { virtuals: true }, toJSON: { virtuals: true } }
);

review.index({ userID: 1, houseID: 1 }, { unique: true });

review.pre(/^find/, function (next) {
  this.populate({ path: 'userID', select: '-_id -__v -role -email -createdAt' })
  next()
})
