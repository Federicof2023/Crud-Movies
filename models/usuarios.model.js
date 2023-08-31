const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const passport = require('passport')

const usuarioSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true, 
            

    },
    email : {
        type: String,
        required : true,
        unique : true  
    },
     password : {
        type: String,
        required : true,
        
    }

},{
    timestamps : true,
    versionKey : false
})

usuarioSchema.methods.encriptarPassword = async function(password){ // aca se pasa una regular function // 
    const salt = await bcrypt.genSalt(10) // genero semilla//
    return await bcrypt.hash(password,salt) // encripto password // 
}

usuarioSchema.methods.verificarPassword = async function(password){ // aca se pasa una regular function // 
  // con COMPARE compara el pass que me llega del form con el del modelo osea el de la DB//   
    return await bcrypt.compare(password,this.password) //  recibo un booleano aca// 
}

// expo
module.exports= mongoose.model("usuarios",usuarioSchema)