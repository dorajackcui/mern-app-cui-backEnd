import connectDB from './db.js'
import User from '../models/user.js'
import dotenv from 'dotenv'

dotenv.config()
connectDB()

const DeleteUsers = async () => {
  try {
    await User.deleteMany({})

    

    console.log("All Users deleted")

    process.exit()
  } catch (error) {
    console.error("Error with data import", error)
    process.exit(1)
  }
};

DeleteUsers()