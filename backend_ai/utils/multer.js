// const multer = require('multer');
// const path = require('path');


// //  Configure Multer 
// const storage = multer.diskStorage({
//     destination:(req, file,cb) =>(null,"upload/"),
//     filename:(req, file,cb) => cb(null, Date.now() + path.extname(file.originalname))
// });

// const fileFilter = (req, file, cb) => {
//     if(file.mimetype === 'application/pdf') cb(null, true);
//     else cb(new Error("only PDF allowed"),false);
// };

//  exports.upload = multer({ storage, fileFilter});


const multer = require('multer');
const path = require('path');

// Configure Multer 
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads"); // FIXED
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'application/pdf') cb(null, true);
  else cb(new Error("Only PDF allowed"), false);
};

exports.upload = multer({ storage, fileFilter });


// 3:05