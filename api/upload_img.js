const multer = require("multer")
const path = require("path")


let fileDir = '';
let fileName = '';

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
         fileDir = "public/imgs";
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
    
  }).single("myimage");

const uploadFile = (req, res, next) => {
    upload(req,res, (err) => {
        if(err) {
            console.log(err);
            res.status(500).send("Uploaded file is too large or filetype is not supported");
        }
        else {
            next();
        }
    })
};
module.exports = {
    uploadFile,
    getFileDetails: (callback) => {
        callback(fileDir, fileName);
      },
    
}