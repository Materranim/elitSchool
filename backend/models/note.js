const mongoose = require('mongoose');



const noteSchema = mongoose.Schema({
    
    noteControle:String,
    noteSynthese:String,
    orale:String,
    desc:String,
    matieresId:{type:String, ref:'Matiere'},
    studentId:{type:String , ref:'User'},
    teacherId: { type: String, ref: 'User' }  

}, { timestamps: true });
 

    const Note = mongoose.model('Note',noteSchema )

    module.exports = Note 