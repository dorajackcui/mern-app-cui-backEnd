import Mongoose from 'mongoose'
import PostMessage from '../models/postMessage.js'

export const getPosts = async (req, res) => {
  try {
    const postMessages = await PostMessage.find()
    
    res.status(200).json(postMessages)
  } catch (error) {
    res.status(404).json({message:error.message}) 
  }
}


export const createPost = async (req, res) => {
  const post = req.body
  const newPost = new PostMessage(post)

  try { 
    await newPost.save()

    res.status(201).json(newPost)
  } catch (error) {
    res.status(409).json({ message:error.message })  
  }
}


export const updatePost = async (req, res) => {
  const { id:_id } = req.params
  const post = req.body

  if (!Mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No post with that Id')
  const updatedPost = await PostMessage.findByIdAndUpdate(_id, {...post, _id}, {new : true})


  try { 
    res.status(201).json(updatedPost)
  } catch (error) {
    res.status(409).json({ message:error.message })  
  }
}

export const deletePost = async (req, res) => {
  const { id } = req.params
  console.log(id)
  if (!Mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post with that Id')
  try {
    await PostMessage.findByIdAndRemove(id)
    console.log('DELETE')
    res.json({message:'Post deleted successfully'})
    
  } catch (error) {
    res.json({ message:error.message }) 
  }
}


export const likePost = async (req, res) => {
  const { id } = req.params

  if (!Mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post with that Id')
  
  const postLike = await PostMessage.findById(id)
  const updatedPost = await PostMessage.findByIdAndUpdate(id, { likeCount: postLike.likeCount + 1}, {new:true})

  
  try { 
    res.status(201).json(updatedPost)
  } catch (error) {
    res.status(409).json({ message:error.message })  
  }
}