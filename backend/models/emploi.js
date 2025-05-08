const mongoose = require('mongoose');



const emploiSchema = mongoose.Schema({

    
    annee:String,
    Commentaire:String,
    emploi:String,
    idNiveau:{type: String , ref:'Niveau'},


    })

 
    const emploi = mongoose.model('Emploi',emploiSchema )

    module.exports = emploi 