import multer from 'multer'
const storage = multer.memoryStorage();


export default {
    storage: storage,
    limits: {
        fileSize: 2 * 1024 * 1024, //2Mb
    },
    fileFilter: (req, file, cb) => {
        if (file.mimetype.startsWith('image/')) {
            cb(null, true);

          } else {
            cb(null, false); // Aceita o arquivo, mas marca como falso
          }
    }
}