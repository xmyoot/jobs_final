import mongoose from 'mongoose'

const jobSchema = mongoose.Schema({
    date: String,
    company: String,
    company_logo: String,
    position: String,
    tags: [String],
    description: String,
    location: String,
    apply_url: String
})

const JobPost = mongoose.model('JobPost', jobSchema)

export default JobPost