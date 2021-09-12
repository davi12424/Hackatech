const mongoose = require("mongoose")

const schemaVisitadate = new mongoose.Schema({
    
diavisita:{

    type: Date,

},

horavisita:{

    type: Number,

},

})

module.exports = mongoose.model('dateVisita', schemaVisitadate)