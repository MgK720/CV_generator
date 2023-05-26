const multer = require("multer")
const path = require("path")


let fileDir = '';
let fileName = '';

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
         fileDir = "imgs";
        cb(null, fileDir)
    },
    filename: function (req, file, cb) {
        fileName = "cv_image" + "-" + Date.now()+".jpg";
        cb(null, fileName)
    }
  })

const maxSize = 10 * 1000 * 1000;
    
var upload = multer({ 
      storage: storage,
      limits: { fileSize: maxSize },
      fileFilter: function (req, file, cb){
      
          // Set the filetypes, it is optional
          var filetypes = /jpeg|jpg|png/;
          var mimetype = filetypes.test(file.mimetype);
    
          var extname = filetypes.test(path.extname(
                      file.originalname).toLowerCase());
          
          if (mimetype && extname) {
              return cb(null, true);
          }
        
          cb("Error: File upload only supports the "
                  + "following filetypes - " + filetypes);
        } 
    
  // mypic is the name of file attribute
  }).single("myimage");

module.exports = {
    upload,
    getFileDetails: (callback) => {
        callback(fileDir, fileName);
      },
    
}