import { getJobsList } from 'indeed-job-scraper'
import dotenv from 'dotenv'
import connectDB from '../../database/connect.js'
import Jobs from '../../models/jobSchema.js'

//Gives use access to .env file
dotenv.config()


const CONNECTION_STRING = process.env.MONGO_URI

const getIndeedJobs = async () => {
    try {
        //connect to our database
        await connectDB(CONNECTION_STRING)

        //fetch data from indeed for various entry_level roles
        const programmerJobs = await getJobsList({ queryTitle: 'programmer', level:'entry_level', fromdays: 30, location: 'remote' })
        const softwareJobs = await getJobsList({ queryTitle: 'software', level:'entry_level', fromdays: 30, location: 'remote' })
        const developerJobs = await getJobsList({ queryTitle: 'developer', level:'entry_level', fromdays: 30, location: 'remote' })

        //combine results into a single array
        const allJobs = [...programmerJobs, ...softwareJobs, ...developerJobs]

        //to create a new array with keys that match our database schema
        const jobsToDatabase = allJobs.map(job => 
            ({
                company : job['company-name'],
                date : job['post-date'],
                description: job['job-snippet'],
                position : job['job-title'],
                location : job['company-location'],
                jobUrl : job['job-link'],
            }))

        //to post the various jobs to the database
        for (const job of jobsToDatabase) {
            const newJob = new Jobs(job)
            try {
                await newJob.save()
            } catch (error) {
                console.error(error)
            }
        }

        process.exit()
    } catch (error) {
        console.error(error)
    }
}
getIndeedJobs()

export default getIndeedJobs