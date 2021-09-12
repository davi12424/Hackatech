const mongoose = require("mongoose")

const schemaVisita = new mongoose.Schema({

    nome:{

        type: String,
        trim: true,

    },
    cel:{

        type: Number,
        
    },

    email:{

        type: String,
        trim: true,
        lowercase: true,

    },

    instituicao:{

        type: String,
    },

    
})

module.exports = mongoose.model('CadastroVisita', schemaVisita)
