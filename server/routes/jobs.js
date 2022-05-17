import express from 'express'
import { getJobs } from '../controllers/jobs.js'

const router = express.Router()

//http://localhost:8080/jobs
router.get('/', getJobs)

export default router