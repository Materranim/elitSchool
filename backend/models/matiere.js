const mongoose = require('mongoose');



const matiereSchema = mongoose.Schema({
    
    // niveau:String,
    name:String,
    coefficient: { 
        type: Number, 
        enum: [1, 2, 3,4.5], 
        required: true 
    },
    heures:String,
    desc:String,
    idNiveau:{type: String , ref:'Niveau'},
    nomNiveau: String,
    profId: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }] 


    // refClasses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Classe' }], // Relation avec plusieurs Classes
    // refProfessors: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }] // Relation avec Professeurs

    
    })


    const matiere = mongoose.model('Matiere',matiereSchema )

    module.exports = matiere 