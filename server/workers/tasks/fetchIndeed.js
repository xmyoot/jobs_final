import indeed from '../../utils/indeed-scraper-master/index.js'
import connectDB from '../../database/connect.js'
import Jobs from '../../models/jobSchema.js'

const fetchIndeed = async () => {
    try {
        //connect to our database
        await connectDB()
        // const softwareEntry = await indeed.query({ query: 'entry level software', city: 'remote', maxAge: '30', sort: 'date' })
        const juniorEngineerJobs = await indeed.query({ query: 'junior engineer', city: 'remote', maxAge: '30', sort: 'date' })

        //combine results into a single array
        const allJobs = [...juniorEngineerJobs]
        //to create a new array with keys that match our database schema
        const jobsToDatabase = allJobs.map(job => 
            ({
                company : job.company,
                date : job.postDate,
                description: job.summary,
                position : job.title,
                location : job.location,
                salary: job.salary,
                jobUrl : job.url
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
        console.log(`I got ${jobsToDatabase.length} Indeed jobs!`)
        process.exit(0)
    } catch (error) {
        console.error(error)
    }
}
fetchIndeed()
export default fetchIndeed