import express  from 'express'
const routes = express.Router()

import { upload,uploadFIle } from '../controllers/image.controlers.js'

routes.post('/profilepicture',upload,uploadFIle)

// routes.post('/profilepicture:id',upload,uploadFIle)

export default routes
