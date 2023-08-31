const express = require('express');
const { showAuthFormSignUp, signup, showAuthFormSignIn, signin, logout } = require('../controllers/usuarios.controller')
const routerUsuarios = express.Router()

// Routers Auth //

routerUsuarios.get('/signup', showAuthFormSignUp) // muestra el formulario de registro //
routerUsuarios.post('/signup', signup)

routerUsuarios.get('/signin', showAuthFormSignIn) // muestra el formulario de logueo // 
routerUsuarios.post('/signin', signin)

routerUsuarios.get('/logout', logout)


module.exports = {
  routerUsuarios
}