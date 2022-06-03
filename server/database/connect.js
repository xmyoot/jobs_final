import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

const CONNECTION_STRING = process.env.MONGO_URI

const connectDB = () => {
    return mongoose.connect(CONNECTION_STRING,{
        useNewUrlParser: true,
        useUnifiedTopology:true
    })
    .then(console.log('Connected to Database...'))
    .catch((error) => console.log(error.message))
}
export default connectDB
