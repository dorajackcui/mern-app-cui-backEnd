import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import mongoose  from 'mongoose' 
import postsRoutes from './routes/posts.js'

const app = express()
dotenv.config()

app.use(express.urlencoded({ limit:'30mb', extended : true }))
app.use(express.json({ limit:'30mb', extended : true }))  
app.use(cors())

app.use('/posts', postsRoutes)


// mongodb connect
const PORT = process.env.PORT || 5000

mongoose.connect(process.env.CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then( () => app.listen(PORT, () => console.log(`Server running on port : ${PORT}`)) )
  .catch((err) => console.log(err.message))

mongoose.set('useFindAndModify', false)

