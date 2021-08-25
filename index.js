import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import postsRoutes from './routes/posts.js'
import userRoutes from './routes/user.js'

const app = express()
dotenv.config()

app.use(express.urlencoded({ limit:'30mb', extended : true }))
app.use(express.json({ limit:'30mb', extended : true }))  
app.use(cors())

app.use('/posts', postsRoutes)
app.use('/users', userRoutes)

app.get('/', (req, res) => {
  res.send('Hello to MERN-APP-CUI！')
})


// mongodb connect
connectDB()
const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
