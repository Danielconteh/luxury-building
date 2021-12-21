import mongoose, { Schema } from 'mongoose'
// import { connect1 } from './connection'

export const houseDesc = new Schema(
  {
    name: {
      type: String,
      require: [true, 'name is missing'],
      unique: true,
      // index: false,
    },
    slug: { type: String, unique: true, default: 'slug-test' },
    country: {
      type: String,
      required: [true, 'country must be specified'],
    },

    location: {
      type: {
        type: String,
        default: 'Point',
        enum: ['Point'],
      },
      coordinates: {
        type: [Number],
        require: [true, 'coordinates is need to provide accurate info...'],
      },
      'place name': {
        type: String,
        require: [true, 'place name is need to provide accurate info...'],
      },
    },
    price: {
      type: String,
      required: [true, 'house price is nedded!'],
    },
    image: {
      type: String,
      required: [true, 'please provide us a picture of the house'],
    },
    realtor: {
      type: [{ name: String, img: String }],
      required: [true, 'please include the realtor or realtors'],
    },
    rooms: {
      type: Number,
      require: [true, 'specified the number of rooms avilable'],
    },

    'rooms shape': {
      type: String,
      enum: ['oblong', 'Rectangle'],
      default: 'Rectangle',
    },
    store: {
      type: Number,
      default: 0,
    },
    'Living room': {
      type: Number,
      default: 1,
    },
    'dinning room': {
      type: Number,
      default: 1,
    },
    Bathroom: { type: Number, default: 1 },
    Kitchen: { type: Number, default: 1 },
    Garage: { type: Number, dafault: 1 },
    'Garden shade': { type: String, default: 'not-availabl' },
    'Attic/loft': { type: String, default: 'not-availabl' },
    'study room': { type: Number, default: 0 },
    decoration: {
      type: String,
      lowercase: true,
      enum: ['western-style', 'traditional', 'modern'],
      require: [true, 'please specified decoration type'],
    },
    'swimming pool': { type: String, default: 'not-availabl' },
    'Year built': { type: Number, default: 1980 },
    meter: Number,
    Furniture: {
      type: [String],
      enum: [
        'Sofa',
        'Armchair',
        'Coffee table',
        'tea table',
        'Floor lamp',
        'Curtains',
        'TV',
        'Rug',
        'Carpet',
        'Bookshelf',
        'Bookcase',
        'Painting',
        'Mirror',
      ],
      default: ['Sofa', 'Armchair', 'Coffee table', 'Curtains', 'TV'],
    },
    images: {
      type: [String],
      require: [
        true,
        'please provide images of the house, so customer can see it!',
      ],
      minlength: [7, 'the image shoul not be more or less than nine [9]'],
      maxlength: [7, 'the image shoul not be more or less than nine [9]'],
    },
    description: {
      type: [String],
      default: [
        'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nemo atque rerum possimus provident reprehenderit. Id dolore ipsam repellendus, corporis, dolorem, nemo rem vel nobis illum obcaecati adipisci fugit. Sapiente, eligendi.',
        'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nemo atque rerum possimus provident reprehenderit. Id dolore ipsam repellendus, corporis, dolorem, nemo rem vel nobis illum obcaecati adipisci fugit. Sapiente, eligendi.',
      ],
    },
    date: Date,
  },
  { toObject: { virtuals: true }, toJSON: { virtuals: true } }
)

// houseDesc.virtual('slug').get(function () {
//   return this.name.split(' ').join('-').toLowerCase()
// })

houseDesc.pre('save', function (next) {
  console.log(this)
  this.slug = this.name.split(' ').join('-').toLowerCase()
  next()
})
houseDesc.virtual('reviews', {
  ref: 'Review',
  localField: '_id',
  foreignField: 'houseID',
})
