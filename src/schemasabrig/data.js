const mongoose = require("mongoose")

const schemaDataeHora = new mongoose.Schema({

    diautil: {
        type: String,
        
},
    fds: {
        type: String,
        
},
    horadiautil: [],

    horafds: [],

})

module.exports = mongoose.model('DataeHoraDisponíveis', schemaDataeHora)