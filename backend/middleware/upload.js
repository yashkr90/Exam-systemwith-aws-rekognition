import multerS3 from "multer-s3";
import multer from "multer";
import { S3Client } from "@aws-sdk/client-s3";
import path from "path";

const config = {
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION, // Replace with your region
};
const s3Client = new S3Client(config);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/uploads/");
  },
  filename: (req, file, cb) => {
    cb(null,file.originalname);
  },
});
const uploadStorage = multer({ storage: storage });

export const uploadToStorage = (req, res, next) => {
  uploadStorage.single("file")(req,res,(err)=>{

    if(err){
      return res.status(400).json({ error: err.message });
    }


    
    console.log("file after up",req.file);
    console.log("body after upload",req.body);
    next();
  })
};

//for s3 upload

/*
export const uploadFile = (req, res, next) => {
  const { email } = req.body;
  // console.log(req);

  const upload = multer({
    storage: multerS3({
      s3: s3Client,
      bucket: "imtestbucket",
      metadata: function (req, file, cb) {
        cb(null, { fieldName: file.fieldname });
      },
      key: function (req, file, cb) {
        console.log(req.body);
        const mail = req.body.email;
        cb(null, `${mail}${path.extname(file.originalname)}`);
      },
    }),
  });

  upload.single("file")(req, res, (err) => {
    if (err) {
      // Handle multer or S3 upload errors
      return res.status(400).json({ error: err.message });
    }
    // If the file was uploaded successfully, you can access its details via req.file
    console.log(req.file);
    console.log();

    // Access additional data (email) from req.body
    // const { email } = req.body;
    // console.log('Email:', email);

    // res.send('File uploaded successfully');
    next();
  });
};
*/
