const mongoose = require('mongoose');



const classeSchema = mongoose.Schema({
    nom: {
        type: String,
        enum: ['A', 'B', 'C', 'D', 'E'],
        required: true
    },

    desc:String,
    idNiveau:{type: String , ref:'Niveau'},
    profId: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }] ,
    idCours: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Cour' }],


    // refProfessors: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], // Liste des professeurs affectés
    IdStudents: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],

}, { timestamps: true });
 

    const classe = mongoose.model('Classe',classeSchema )

    module.exports = classe 