const multer = require('multer')

const storage = multer.memoryStorage()

const fileFilter = (req, file, cb) => {
  const allowedFileTypes = /jpeg|jpg|png|gif/
  const mimetype = allowedFileTypes.test(file.mimetype)

  if (mimetype) {
    return cb(null, true)
  }
  cb(
    new Error('Only images with extensions jpeg, jpg, png, and gif are allowed')
  )
}

const upload = multer({ storage, fileFilter })

module.exports = {
  upload,
}
