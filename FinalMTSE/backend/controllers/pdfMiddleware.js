const multer = require('multer');
const path = require('path');
const pdfExtensions = ['.pdf']; // Add PDF extensions
const fs = require('fs');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    try {
      // Ensure the 'uploads' directory exists
      fs.mkdirSync('./uploads', { recursive: true });
      cb(null, path.join('./uploads'));
    } catch (error) {
      cb(error, null);
    }
  },
  filename: function (req, file, cb) {
    const extname = path.extname(file.originalname);
    const basename = path.basename(file.originalname, extname);

    let filename = basename;

    let index = 1;
    while (fs.existsSync(path.join('./uploads', filename + extname))) {
      filename = basename + `(${index})`;
      index++;
    }

    cb(null, filename + extname);
  }
});

const fileFilter = (req, file, cb) => {
  const extname = path.extname(file.originalname).toLowerCase();

  if (pdfExtensions.includes(extname)) {
    return cb(null, true); // Accept the file
  }

  const error = new Error('File type not allowed.');
  error.code = 'LIMIT_FILE_TYPES';
  return cb(error, false);
};

exports.upload = multer({ storage: storage, fileFilter: fileFilter });