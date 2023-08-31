
const mongoose = require('mongoose')

const conectarDB = async (url)=>{
    try {
        await mongoose.connect(url)
    } catch (error) {
        throw new Error('Error en la conexion de la DB',error)
    }
}

module.exports ={conectarDB}