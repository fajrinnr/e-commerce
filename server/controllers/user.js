const {User} = require('../models')
const createError = require('http-errors')
const bcrypt = require('../helpers/bcrypt')
const jwt = require('../helpers/jwt')

class UserController {

  static register(req, res, next){
    let regisUser = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      role: req.body.role
    }

    User.create(regisUser)
    .then(user => {
      // console.log(user)
      res.status(201).json(user)
    })
    .catch(error => {
      next(error)
    })
  }

  static login(req, res, next){
    let userEmail = {
      email: req.body.email
    }

    User.findOne(userEmail)
    .then(user => {
      if (!user){
        throw createError(404, {message: "User Not Found"})
      } else {
        if (bcrypt.checkPassword(req.body.password, user.password)){
          let data = {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role
          }
          res.status(200).json({token : jwt.createToken(data)})
        } else {
          throw createError(400, {message: "Email / Password Wrong"})
        }
      }
    })
    .catch(error => {
      console.log(error)
      next(error)
    })
  }

}

module.exports = UserController