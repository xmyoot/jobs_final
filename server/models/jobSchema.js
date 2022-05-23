import mongoose from 'mongoose'

const jobSchema = mongoose.Schema({
    date: String,
    company: String,
    companyLogo: String,
    position: String,
    tags: [String],
    description: String,
    location: String,
    jobUrl: String,
    companyUrl: String,
    contactEmail: String
})

const JobPost = mongoose.model('JobPost', jobSchema)

export default JobPost