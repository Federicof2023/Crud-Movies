const mongoose = require('mongoose')

const peliculaSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    year :{
        type:Number,
        required: true
    }
})

module.exports  = mongoose.model('peliculas',peliculaSchema)

