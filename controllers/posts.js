import Mongoose from 'mongoose'
import PostMessage from '../models/postMessage.js'

export const getPosts = async (req, res) => {
  const { page } = req.query
  try {
    const LIMIT = 6;
    const startIndex = (Number(page)-1) * LIMIT //get starting post from every page
    const totalPosts = await PostMessage.countDocuments({})

    //sort by newest post
    const posts = await PostMessage.find().sort({ _id:-1 }).limit(LIMIT).skip(startIndex)
    
    res.status(200).json({data: posts, currentPage: Number(page), totalPages: Math.ceil(totalPosts/LIMIT) })
  } catch (error) {
    res.status(404).json({message:error.message}) 
  }
}

export const getPostDetails = async (req, res) => {
  
  const { id:_id } = req.params
  try {
    if (!Mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No post with that Id')
    const post = await PostMessage.findById(_id)
    
    res.status(200).json(post)
  } catch (error) {
    res.status(404).json({message:error.message}) 
  }
}

// query  /posts?page=1 -> page = 1
// params /posts/123 -> id = 123
export const getPostsBySearch = async (req, res) => {
  const { searchQuery, tags } = req.query
  try {
    // convert to regExp for mongoDB
    const title = new RegExp(searchQuery, 'i')
    const posts = await PostMessage.find({ 
      $or: [ {title: title}, {tags: { $in: tags.split(',') }}, {tags: title} ]
    })
    
    res.status(200).json({ data: posts })
  } catch (error) {
    res.status(404).json({message:error.message}) 
  }
}


export const createPost = async (req, res) => {
  const post = req.body
  const newPost = new PostMessage({...post, creator: req.userId, createdAt: new Date().toISOString()})
  

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
  if (!req.userId) return res.json({ message:"Unauthenticated." })

  // find message
  if (!Mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post with that Id')
  const postLike = await PostMessage.findById(id)
  // find likes 
  const index = postLike.likes.findIndex((id)=> id === String(req.userId))

  if(index === -1 ){
    //like post
    postLike.likes.push(req.userId)
  }else {
    //delete like
    postLike.likes.filter((id) => id !== String(req.userId))
  } 
 
  const updatedPost = await PostMessage.findByIdAndUpdate(id, postLike, {new:true})

  
  try { 
    res.status(201).json(updatedPost)
  } catch (error) {
    res.status(409).json({ message:error.message })  
  }
}