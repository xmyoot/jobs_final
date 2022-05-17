import express from 'express'
import { getJobs, postJob } from '../controllers/jobs.js'

const router = express.Router()

//http://localhost:8080/jobs
router.get('/', getJobs)
router.post('/', postJob)

export default router