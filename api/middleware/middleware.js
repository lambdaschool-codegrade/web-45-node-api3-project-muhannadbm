const User = require('../users/users-model')

function logger(req, res, next) {
  // DO YOUR MAGIC
  console.log(req.method, req.originalUrl, new Date())
  next()
}

async function validateUserId(req, res, next) {
  // DO YOUR MAGIC\
  try{
  let user = await User.getById(req.params.id)
  if(user){
    req.user = user
    next()
  }
  else{
    next({message: "not found", status: 404})
  }
}
catch(err) {
  next(err)
}

}

function validateUser(req, res, next) {
  // DO YOUR MAGIC
 if(req.body.name){
   next()
 }
 else{
  next({message: "missing required name field", status: 400})
 }
}

function validatePost(req, res, next) {
  // DO YOUR MAGIC
  if(req.body.text){
    next()
  }
  else{
    next({message: "missing required text field", status: 400})
   }

}

// do not forget to expose these functions to other modules
module.exports = { logger, validateUserId ,validateUser ,validatePost}
