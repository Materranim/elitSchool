const mongoose = require('mongoose');



const reclamationSchema = mongoose.Schema({
    
    nom:String,
    email:String,
    telephone:String,
    NomEleve:String,
    sujetReclamation:String,
    detailsReclamation:String,

}, { timestamps: true });
 

    const Reclamation = mongoose.model('Reclamation',reclamationSchema )

    module.exports = Reclamation 