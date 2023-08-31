const passport = require('passport')
const { Strategy } = require('passport-local')
const Usuario = require('../models/usuarios.model')
const Swal = require('sweetalert2')

passport.use(
  new Strategy(
    {
      usernameField: 'email'  // indico por que campo quiero validar // 
    },
    async (email, password, done) => {

      const user = await Usuario.findOne({ email })

      if (!user) {
        return done(null, false,  { message: 'User not found.' }  )     
       
      }
                              

      const isMatch = await user.verificarPassword(password)

      if (!isMatch) {
        return done(null, false, { message: 'Password error.' })
      }

      return done(null, user)

    }
  )
)

passport.serializeUser((user, done) => {
  done(null, user.id)
})

passport.deserializeUser(async (id, done) => {

  const user = await Usuario.findById(id)
  done(null, user)

})