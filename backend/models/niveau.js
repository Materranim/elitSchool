const mongoose = require('mongoose');



const niveauSchema = mongoose.Schema({
    
    name:String,
    desc:String,
    matieres:[{type:String, ref:'Matiere'}],
    classe: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Classe' }] , //  ObjectId
    idEmploi: { type: mongoose.Schema.Types.ObjectId, ref: 'Emploi' }  


}, { timestamps: true });
 

    const Niveau = mongoose.model('Niveau',niveauSchema )

    module.exports = Niveau 