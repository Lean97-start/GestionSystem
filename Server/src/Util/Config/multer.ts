import { Request } from "express";

const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req: Request, file: any, cb: any) {
      cb(null, 'uploads/');
    },
    filename: function (req: Request, file: any, cb: any) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      cb(null, file.fieldname + '-' + uniqueSuffix);
    }
  });
  
  const upload = multer({ storage: storage });
  