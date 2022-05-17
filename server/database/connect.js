import mongoose from 'mongoose'

export default function connectDB(url){
    return mongoose.connect(url,{
        useNewUrlParser: true,
        useUnifiedTopology:true
    })
    .then(console.log('Connected to Database...'))
    .catch((error) => console.log(error.message))
}
