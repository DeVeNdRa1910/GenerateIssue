import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {

    cb(null, path.resolve(__dirname, "../../public/assets"));
  },
  filename: (req, file, cb) => {
    const {fname} = req.body;
    let fileName;
    if(fname === undefined){
      const {title} = req.body;
      fileName = `${title}.${file.originalname.split(".").pop()}`;
    } else {
      fileName = `${fname}.${file.originalname.split(".").pop()}`;
    }
    cb(null, fileName);
  }
});

const upload = multer({ 
  storage: storage, 
  limits: { fileSize: 10 * 1024 * 1024 }  // File size limit: 10MB
});

export default upload;
