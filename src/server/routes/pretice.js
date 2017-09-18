import express from 'express'
const router = express.Router()

import * as newsCtrl from '../controllers/news'

router.get('/getNews',newsCtrl.getAllNews);

export default router