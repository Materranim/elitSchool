const mongoose = require('mongoose');



const courSchema = mongoose.Schema({

    
    duree:String,
    nom:String,
    desc:String,
    file:String,
    tp: String, 

    // teacherId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },

    })

 
    const cour = mongoose.model('Cour',courSchema )

    module.exports = cour 