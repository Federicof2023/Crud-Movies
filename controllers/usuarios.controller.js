const passport = require('passport')

const Usuario = require("../models/usuarios.model")

const showAuthFormSignUp = (req, res) => res.render('usuarios/signup') // mostrar el formulario de registro

const signup = async (req, res) => {

  try {
    const errors = []
    const { name, email, password, confirm_password } = req.body

    if (password !== confirm_password) {
      errors.push({ msg: 'La contraseña no coincide' })
    
    }

    if (password.length < 4) {
      errors.push({ msg: 'La contraseña debe tener al menos 4 caracteres' })
    }

    if (errors.length > 0) {
      return res.send('Hay errores')
    }

    // busco si el usuario existe por email //
    const userFound = await Usuario.findOne({ email })

    if (userFound) {
      return res.send('Ya existe el usuario en nuestros registros')
    }
    // si no existe se crea un nuevo usuario //
    const newUser = new Usuario({ name, email, password })

    // encripto el password que me pasa  el nuevo usuario y lo hasheo//
    newUser.password = await newUser.encriptarPassword(password)
    await newUser.save() //-> luego se guarda el usuario en la DB // 

    // crer view 
    res.render('usuarios/signin')
    
    
  } catch (error) {
    console.log('ERROR', error)
    res.status(401).send('Algo ocurrió, no se creo el usuario')
  }

}

const showAuthFormSignIn = (req, res) => { // mostrar el formulario de logueo
  res.render('usuarios/signin')
}

const signin = passport.authenticate('local', {
  successRedirect: '/peliculas',
  failureRedirect: '/auth/signin'
})

const logout = async (req, res, next) => {
  await req.logout(err => { // req.session.destroy() 
    if (err) return next()
    res.redirect('/auth/signin')
  })
}

module.exports = {
  showAuthFormSignUp,
  signup,
  showAuthFormSignIn,
  signin,
  logout
}

