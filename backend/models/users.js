const mongoose = require('mongoose'); 



const userSchema = mongoose.Schema({

    role:{type:String , required:true},
    firstName:{type:String , required:true},
    lastName:{type:String , required:true},
    email:{type:String , required:true , unique:true},
    adresse:{type:String , required:true},
    phone:{type:String , required:true},
    password:{type:String , required:true},
    specialite:{type:String , required:false},
    cv:{type:String , required:false},
    photoProfil:{type:String , required:false},
    phoneEnfant:{type:String , required:false},
    classe: { type: String },
    refClasses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Classe' }],
    refMatieres: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Matiere' }],
    // IdClasseStudent: { type: mongoose.Schema.Types.ObjectId, ref: 'Classe' }, // Référence à la classe de l'étudiant
    // studentsAssigned: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],  // Ajouter ce champ dans le schéma User

    status: { 
        type: String, 
        default: function() { return this.role === 'teacher' ? 'pending' : undefined; } 
      } 


}, 
    {timestamps:true}
)
 const user = mongoose.model('User',userSchema )

    module.exports = user