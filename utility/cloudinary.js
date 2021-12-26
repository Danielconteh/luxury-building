const cloudinary = require('cloudinary').v2;
const { Readable } = require('stream');


 cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
 });

const bufferToStream =  (buffer) => {
  const readable =  new Readable({
    read() {
      this.push(buffer);
      this.push(null);
    },
  });
  return readable;
};



  



module.exports = {bufferToStream };
  
  // const cloudinaryImageUploadMethod = async file => {
  //     return new Promise(resolve => {
  //         cloudinary.uploader.upload( file , (err, res) => {
  //           if (err) return res.status(500).send("upload image error")
  //             resolve({
  //               res: res.secure_url
  //             }) 
  //           }
  //         ) 
  //     })
  //   }
 
 
//    (file, folder) => {
//    return new Promise((resolve) => {
//      cloudinary.uploader.upload(
//        file,
//        (result) => {
//          resolve({
//            url: result.url,
//            id: result.public_id,
//          });
//        },
//        {
//          resource_type: 'auto',
//          folder: folder,
//        }
//      );
//    });
//  };