const mongoose = require('mongoose');



const niveauSchema = mongoose.Schema({
    
    name:String,
    desc:String,
    matieres:[{type:String, ref:'Matiere'}],
    // classe:[{type:String, ref:'Classe'}]
    classe: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Classe' }]  // Utilisation de ObjectId

}, { timestamps: true });
 

    const Niveau = mongoose.model('Niveau',niveauSchema )

    module.exports = Niveau 