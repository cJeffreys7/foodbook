import util from 'util'
import multer from 'multer'
import { GridFsStorage } from 'multer-gridfs-storage'

let storage = new GridFsStorage({
  url: process.env.DATABASE_URL,
  options: { useNewUrlParser: true, useUnifiedTopology: true },
  file: (req, file) => {
    const match = ["image/png", "image/jpeg"]
    if (match.indexOf(file.mimetype) === -1) {
      const filename = `${file.originalname}`
      return filename
    }

    return {
      bucketName: 'uploads',
      filename: `${file.originalname}`
    }
  }
})

let uploadFiles = multer({ storage: storage }).single("file")
let upload = util.promisify(uploadFiles)

export {
  upload
}