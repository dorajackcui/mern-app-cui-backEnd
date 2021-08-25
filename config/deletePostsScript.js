import connectDB from './db.js'
import PostMessage from '../models/postMessage.js'
import dotenv from 'dotenv'

dotenv.config()
connectDB()

const DeletePosts = async () => {
  try {
    await PostMessage.deleteMany({})

    

    console.log("All Posts deleted")

    process.exit()
  } catch (error) {
    console.error("Error with data import", error)
    process.exit(1)
  }
};

DeletePosts()