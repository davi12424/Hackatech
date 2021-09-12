const mongoose = require("mongoose")

const schemaAbrigo = new mongoose.Schema({
    nome:{

        type: String,
        trim: true,

    },
    endereco:{
        type: String,
        trim: true,

    }, 
    cel:{
        type: Number,
        trim: true,
    },
    mail: {

        type: String,
        trim: true,
        lowercase: true,
    },
    
    obs:{

        type: String,
        trim: true,

    },
    
     
})

module.exports = mongoose.model('CadastroAbrigo', schemaAbrigo)