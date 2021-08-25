import dotenv from 'dotenv'
import mongoose from 'mongoose'

dotenv.config()

const connectDB = async() => {
  try {
    await mongoose.connect(process.env.MONGODB_URL, {
      useNewUrlParser: true, 
      useUnifiedTopology: true,
      useFindAndModify:false,
    })
    console.log("MongoDB connection SUCCESS")
  } catch (error) {
    console.error("MongoDB connection FAIL");
  }
}

export default connectDB