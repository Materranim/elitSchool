const mongoose = require('mongoose');



const courSchema = mongoose.Schema({

    
    duree:String,
    nom:String,
    desc:String,
    file:String,
    tp: String, 
    teacherId: { type: String, required: true }, // Ajout du champ teacherId
    idClasse: { type: String, required: true } // Ajout du champ teacherId

    // teacherId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },

    })

 
    const cour = mongoose.model('Cour',courSchema )

    module.exports = cour 