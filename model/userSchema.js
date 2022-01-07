const bcrypt = require('bcrypt')
const validator = require('validator')
const crypto = require('crypto')
import { Schema } from 'mongoose'

const UserSchema = new Schema({
  name: {
    type: String,
    required: [true, 'fullname must not be empty'],
    trim: true,
  },

  email: {
    type: String,
    required: [true, 'Enter a valid email'],
    validate: [validator.isEmail, 'Please provide a valid email'],
    unique: true,
    lowercase: true,
  },
  image: {
    type: String,
  },
  pin: {
    type: String,
    default: '1234',
  },
  //   password: {
  //     type: String,
  //     required: [true, 'Please enter your password'],
  //     minlength: [8, 'password is too short!'],
  //     select: false,
  //   },
  //   passwordConfirm: {
  //     type: String,
  //     required: [true, 'Please confirm your password'],
  //     validate: {
  //       validator: function (el) {
  //         return el === this.password
  //       },
  //       message: 'password are not the same!',
  //     },
  //   },
  //   active: {
  //     type: Boolean,
  //     default:false
  // },
  // role: {
  //   type: String,
  //   default: 'user',
  //   enum: ['user', 'co-admin', 'admin'],
  //   lowercase: true,
  // },

  // createdAt: {
  //   type: Date,
  //   default: Date,
  // },
  // // for the  [forgotpassword]
  // passwordHashedResetToken: String,
  // passwordResetTokenExpires: Date,

  // // check when the pass was change if < jwt [which should alway  be true]
  // passwordChangedAt: Date,

  // // GOOGLE
  // provider: String,
  // googleID: Number,
});
export default UserSchema
// PASSWORD MIDDLEWARE
// userData.pre('save', async function (next) {
//   //if the password has not been modified (or change) return to next middle...
//   if (!this.isModified('password')) return next()

//   // hashing the password
//   this.password = await bcrypt.hash(this.password, 14)

//   // setting the passwordConfirm to nothing
//   this.passwordConfirm = undefined
//   next()
// })

// // for ResetPassWord only because of the if check
// userData.pre('save', async function (next) {
//   //if the password has not change or in the document is new on then return to next middle...

//   if (!this.isModified('password') || this.isNew) return next()

//   // but the pass has been chang and the and the doc is not new
//   this.passwordChangedAt = Date.now() - 1000 // we minus one because saving to DB it's a bit slower

//   return next()
// })

// userData.method(
//   'user_Change_Password_After_The_Jwt_Token_Was_Issue',
//   function (JwtTimestamp) {
//     if (this.passwordChangedAt) {
//       const changedTimestamp = parseInt(
//         this.passwordChangedAt.getTime() / 1000,
//         10
//       )
//       console.log(JwtTimestamp, changedTimestamp)
//       return JwtTimestamp < changedTimestamp
//       // meaning the JWT is < than passwordChangeAt [which should not be]
//     }
//     // meaning the JWT is > than passwordChangeAt
//     return false
//   }
// )

// userData.method(
//   'verifyPassword',
//   async (rawPassword, encryPassword) =>
//     await bcrypt.compare(rawPassword, encryPassword)
// )

// userData.methods.createPasswordResetToken = function () {
//   // this is the not hashed token that will be sent to the user
//   const resetToken = crypto.randomBytes(50).toString('hex')

//   // save [hashed token] the reset token to the specific user DB in order to compare it later
//   this.passwordHashedResetToken = crypto
//     .createHash('sha256')
//     .update(resetToken)
//     .digest('hex')

//   // set the time the token should expire
//   this.passwordResetTokenExpires = Date.now() + 10 * 60 * 1000
//   return resetToken
// }
