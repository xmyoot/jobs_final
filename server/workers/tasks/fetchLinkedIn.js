import linkedIn from 'linkedin-job-scraper'
import Jobs from '../../models/jobSchema.js'
import connectDB from '../../database/connect.js'

const fetchLinkedIn = async () => {
    const jobs = await linkedIn.query({
        keyword: 'software engineer',
        dateSincePosted: 'past week',
        location: 'United States',
        experienceLevel: 'entry level',
        remoteFilter: 'remote',
        limit: '500'
    })

    console.log(`Fetched job length: ${jobs?.length}`)

    for ( let i = 0; i < jobs?.length; i++ ){
        let job = jobs[i]
        let position = job.position.toLowerCase()
        if (
            position.includes('senior') ||
            position.includes('manager') ||
            position.includes('sr.') ||
            position.includes('sr') ||
            position.includes('architect') ||
            position.includes('director')
            ) {
                jobs.splice(i, 1)
            }
            if(job.jobUrl === '') jobs.splice(i, 1)
    }

    console.log(`Filtered job length: ${jobs?.length}`)

    try {
        await connectDB()
        for (const job of jobs) {
            const newJob = new Jobs(job)
            try {
                await newJob.save()
            } catch (error) {
                console.error(error)
            }
            console.log('Succesfully saved the jobs to database...')
        }
        process.exit(0)
    } catch(error) {
        console.error(error)
        process.exit(1)
    } 
}
fetchLinkedIn()
export default fetchLinkedIn

