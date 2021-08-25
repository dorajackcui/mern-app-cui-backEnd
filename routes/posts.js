import express from 'express'
import { getPostDetails, getPostsBySearch, getPosts, createPost, updatePost, deletePost, likePost } from '../controllers/posts.js'
import auth from '../middleware/auth.js'

const router = express.Router()


router.get('/search', getPostsBySearch)

router.get('/', getPosts)
router.get('/:id', getPostDetails)
router.post('/',auth, createPost)
router.patch('/:id', auth, updatePost)
router.delete('/:id', auth, deletePost)

router.patch('/:id/likePost', auth, likePost)

export default router