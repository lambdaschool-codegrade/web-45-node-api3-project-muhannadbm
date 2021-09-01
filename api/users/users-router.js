const express = require('express');
const User = require('./users-model')
const Post = require('../posts/posts-model')
const { validateUserId ,validateUser ,validatePost} = require('../middleware/middleware')

// You will need `users-model.js` and `posts-model.js` both
// The middleware functions also need to be required

const router = express.Router();

router.get('/', async(req, res, next) => {
  // RETURN AN ARRAY WITH ALL THE USERS
  try{
  let users = await User.get()
  res.status(200).json(users)
  }
  catch(er){
    next(er)
  }


});

router.get('/:id',validateUserId, (req, res) => {
  // RETURN THE USER OBJECT
  // this needs a middleware to verify user id
  let user = req.user
  res.status(200).json(user)
});

router.post('/',validateUser, async (req, res) => {
  // RETURN THE NEWLY CREATED USER OBJECT
  // this needs a middleware to check that the request body is valid
   let my_user = await User.insert(req.body)
   res.status(201).json(my_user)
    
});

router.put('/:id',validateUserId,validateUser, async(req, res) => {
  // RETURN THE FRESHLY UPDATED USER OBJECT
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
  let my_user = await User.update(req.params.id, req.body)
  res.status(200).json(my_user)
});

router.delete('/:id',validateUserId, async(req, res) => {
  // RETURN THE FRESHLY DELETED USER OBJECT
  // this needs a middleware to verify user id
  let user = await User.getById(req.params.id)
  await User.remove(req.params.id)
  res.status(200).json(user)
});

router.get('/:id/posts',validateUserId, async(req, res) => {
  // RETURN THE ARRAY OF USER POSTS
  // this needs a middleware to verify user id
  let posts = await User.getUserPosts(req.params.id)
  res.json(posts)
});

router.post('/:id/posts',validateUserId,validatePost, async(req, res) => {
  // RETURN THE NEWLY CREATED USER POST
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
  req.body.user_id = req.params.id
  let my_post = await Post.insert(req.body)
  res.status(201).json(my_post)
});

// eslint-disable-next-line
router.use((err, req, res, next) => { // we plug it AFTER the endpoints
  res.status(err.status || 500).json({
    message: err.message,
    customMessage: 'Something bad inside the user router!'
  })
});

// do not forget to export the router
module.exports = router
