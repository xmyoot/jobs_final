import { response } from 'express'
import Jobs from '../models/jobSchema.js'

export const getJobs = async (req, res) => {
    try {
        const jobs = await Jobs.find()
        res.status(200).json(jobs)
    } catch (error) {
        console.error(error)
        res.status(404).send({ message: error.message })
    }
}

export const postJob = async (req, res) => {
    const job = req.body
    const newJob = new Jobs(job)
    try {
        await newJob.save()
        res.status(201).json(newJob)
    } catch (error) {
        console.error(error)
        res.status(404).send({ message: error.message })
    }
}