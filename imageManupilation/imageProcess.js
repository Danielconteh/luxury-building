const cloudinary = require('cloudinary').v2;

const multer = require('multer');
const sharp = require('sharp');
import { bufferToStream } from '../utility/cloudinary';

// ======================

// store to memory and easy to manupilate with sharp
const multerStorage = multer.memoryStorage();

// filter the data to allow only image[mimetype]
const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb('Not an image!please upload only image', false);
  }
};

// =======================

// single(),array(),fields()
export const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

// =====================

// resize with the sharp package = this is only for user photo[single()]
export const resizeUserPhoto = async (req, res, next) => {
  if (!req.file) return next();
  req.file.path = `user-${Date.now()}-${
    Math.random() + new Date().getTime()
  }.jpeg`;

  // console.log(req.file, req.file.path)
  try {
    await sharp(req.file.buffer)
      .resize(500, 500)
      .toFormat('jpeg')
      .jpeg({ quality: 90 })
      .toFile(`public/uploads/Users-Images/${req.file.path}`);
  } catch (err) {
    throw new Error('Function not implemented.');
  }
  next();
};

// ===================
// 1) banner | cover  image = [image]

// resize multiplies images of different type, with the sharp package
export const resizeHousesImages = async (req, res, next) => {
 
  if (req.files?.image) {
   
      const data = await sharp(req.files.image[0].buffer)
        .resize(1920, 1080)
        .toFormat('jpeg')
        .jpeg({ quality: 95 })
        .toBuffer();

    const uploadFromBuffer = (req) => { 
       return new Promise((resolve, reject) => {
         let bannerImg = cloudinary.uploader.upload_stream(
           { folder: 'LUXURY_ZONE' },
           (error, result) => {
             if (result) {
               resolve(result);
             } else {
               reject(error);
             }
           }
         );

          bufferToStream(data).pipe(bannerImg);  

        //  streamifier.createReadStream(req.file.buffer).pipe(cld_upload_stream);
       });

    }
    const result = await uploadFromBuffer(req);
    req.body.image = result.secure_url;
  }



  // 2) arrray of images uploaded[multipl image store in array of string] = images
  if (req.files?.images) {
    req.body.images = [];

    try {
      await Promise.all(
        req.files.images?.map(async (file, _) => {

          const data = await sharp(file.buffer)
            .resize(2000, 1333)
            .toFormat('jpeg')
            .jpeg({ quality: 95 })
            .toBuffer();
          
             const uploadFromBuffer = (req) => {
               return new Promise((resolve, reject) => {
                 let arrImages = cloudinary.uploader.upload_stream(
                   { folder: 'LUXURY_ZONE' },
                   (error, result) => {
                     if (result) {
                       resolve(result);
                     } else {
                       reject(error);
                     }
                   }
                 );

                 bufferToStream(data).pipe(arrImages);
               });
             };
          const result = await uploadFromBuffer(req);
            // PUSH IMAGES TO THE STACK OF ARRAY!
             req.body.images.push(result.secure_url);
        })
      );
    } catch (err) {
      console.log(err);
    }
  }
  next();
};
