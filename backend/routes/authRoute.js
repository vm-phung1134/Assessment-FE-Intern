const express = require("express")
const Router = express.Router()
const {updateUser, login, register, getOneUser} = require('../controllers/authController')

Router.route('/login').post(login)
Router.route('/register').post(register)
Router.route('/user/:id').put(updateUser).get(getOneUser)

module.exports = Router