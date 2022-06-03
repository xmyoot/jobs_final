import express from 'express'
import cors from 'cors'
import connectDB from './database/connect.js'
import jobsRoute from './routes/jobs.js'

/**
 * -------------- GENERAL SETUP ----------------
 */

//Create the express application
const app = express()
// Instead of using body-parser middleware, use the new Express implementation of the same thing
app.use(express.json({ limit: '30mb', extended: true }))
app.use(express.urlencoded({ limit: '30mb', extended: true }))
// Allows our application to make HTTP requests to Express application
app.use(cors())

/**
 * -------------- ROUTES ----------------
 */
app.use('/jobs', jobsRoute)


//gets port from .env file
const PORT = process.env.PORT || 8080

/**
 * ---------------DATABASE & SERVER-------
 */

const main = async() => {
    try {
        await connectDB()
        // Server listens on http://localhost:8080 after connecting to db
        app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
    } catch (error) {
        console.error(error)
    }
}

main()
