const express = require('express')  // import express module
const bodyParser = require('body-parser') // import module body parser
const mongoose = require('mongoose');// import module mongoose 
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');




mongoose.connect('mongodb://127.0.0.1:27017/Elite') // connecte avec db localhost/27017 


const User = require('./models/users')
const Classe = require('./models/classe')
const Matiere = require('./models/matiere')
const Cour = require('./models/cours');
const Niveau = require('./models/niveau');
const Note = require('./models/note');
const Reclamation = require('./models/reclamation');
const Emploi = require('./models/emploi');



const app = express()  // creation application express (nom "app")

const secret_key = 'Elite'


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))     //app.use--> configuration
// parse application/json
app.use(bodyParser.json())

// Security configuration
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, Accept, Content-Type, X-Requested-with, Authorization"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, DELETE, OPTIONS, PATCH, PUT"
    );

    next();
});

 


app.use("/images", express.static(path.join("backend/images")));
// app.use("/cvs", express.static(path.join("backend/cvs")));

const MIME_TYPE = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/jpg": "jpg",
  "application/pdf": "pdf",

};

const MIME_TYPE_CV = {
  "application/pdf": "pdf",
};
const storage = multer.diskStorage({
  // destination
  destination: (req, file, cb) => {
    const isValid = MIME_TYPE[file.mimetype];
    let error = new Error("Mime type is invalid");
    if (isValid) {
      error = null;
    }
    cb(null, "backend/images");
  },
  filename: (req, file, cb) => {
    const name = file.originalname.toLowerCase().split(" ").join("-");
    const extension = MIME_TYPE[file.mimetype];
    const imgName = name + "-" + Date.now() + "-Elite-" + "." + extension;
    cb(null, imgName);
  },
});

const storageCV = multer.diskStorage({
 // destination
 destination: (req, file, cb) => {
    const isValid = MIME_TYPE_CV[file.mimetype];
    let error = new Error("Mime type is invalid");
    if (isValid) {
      error = null;
    }
    cb(null, "backend/cvs");
  },
  filename: (req, file, cb) => {
    const name = file.originalname.toLowerCase().split(" ").join("-");
    const extension = MIME_TYPE_CV[file.mimetype];
    const imgName = name + "-" + Date.now() + "-Elite-" + "." + extension;
    cb(null, imgName);
  },
});

  app.post("/api/signup", multer({ storage: storage }).fields([{ name: "photoProfil" }, { name: "cv" }]),
    async (req, res) => {
      console.log(req.body);
      console.log("Files", req.files);
      let url = req.protocol + "://" + req.get("host");
  
      // Profile Image
      let image = req.files["photoProfil"]
        ? url + "/images/" + req.files["photoProfil"][0].filename
        : null;
  
      // CV File
      let cv = req.files["cv"]
        ? url + "/images/" + req.files["cv"][0].filename
        : null;
  
      //  Vérifier si c'est un parent et si le numéro de l'enfant existe
      if (req.body.role === "parent") {
        const studentExists = await User.findOne({ role: "student", phone: req.body.phoneEnfant });
  
        if (!studentExists) {
          return res.status(400).json({ message: "Le numéro de l'enfant n'existe pas. Inscription refusée." });
        }
      }
  
      bcrypt.hash(req.body.password, 10, function (err, hash) {
        if (err) {
          console.log("bcrypt error");
        } else {
          const data = new User({
            role: req.body.role,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            adresse: req.body.adresse,
            phone: req.body.phone,
            password: hash,
            specialite: req.body.specialite,
            cv: cv,
            photoProfil: image,
            phoneEnfant: req.body.phoneEnfant,
            classe: req.body.classe,
            status: req.body.status
          });
  
          data.save((error, docs) => {
            if (error) {
              console.log("Database error", error);
              res.status(200).json({ message: "1" });
            } else {
              res.status(200).json({ message: "0" });
            }
          });
        }
      });
    }
  );
  
  app.post('/api/login', (req, res) => {
    User.findOne({ email: req.body.email })
      .populate('refClasses')     //  ajout populate refClasses
      .populate('refMatieres')    //  ajout populate refMatieres
      .then(async (findedUser) => {
        if (!findedUser) {
          return res.status(200).json({ message: '0' }); // email incorrect
        }
  
        const trustedPwd = await bcrypt.compare(req.body.password, findedUser.password);
        if (!trustedPwd) {
          return res.status(200).json({ message: '1' }); // Mot de passe incorrect
        }
  
        if (findedUser.role === 'teacher' && findedUser.status !== "confirmed") {
          return res.status(200).json({ message: '3' }); // Prof non confirmé
        }
  
        const token = jwt.sign({ user: findedUser }, secret_key, { expiresIn: '1h' });
        return res.status(200).json({ message: '2', user: token }); // Succès
      });
  });
  
app.get('/api/Professor', (req, res) => {
  //trait logique get all Professors  ********
 
  User.find({ role: "teacher" }).then((docs) => {
      res.status(200).json({ data: docs })
  })

})

app.get('/api/Professor_with_populate', async (req, res) => {
  try {
    // On récupère les utilisateurs avec le rôle 'teacher', et on peuple les références vers les matières et classes
    const teachers = await User.find({ role: "teacher" })
      .populate('refMatieres')  // Peuple les matières associées
      .populate('refClasses');  // Peuple les classes associées

    res.status(200).json({ data: teachers });  // Renvoie les enseignants avec leurs matières et classes
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});


app.get('/api/Professor/:id', (req, res) => {
  const id = req.params.id
  User.findOne({ _id: id }).then((findedProfessor) => {
      res.status(200).json({ professor: findedProfessor })
  })

})


app.put('/api/Professor/confirm/:id', (req, res) => {
  const id = req.params.id;

  User.findByIdAndUpdate(id, { status: "confirmed" }, { new: true })

    .then((updatedProfessor) => {
      if (!updatedProfessor) {
        return res.status(404).json({ message: "Professeur non trouvé" });
      }
      res.status(200).json({ message: "Professeur confirmé avec succès", professor: updatedProfessor });
    })
    .catch((error) => {
      res.status(500).json({ message: "Erreur serveur", error });
    });
});



app.delete('/api/Professor/:id', (req, res) => {
 
  const id = req.params.id
  User.deleteOne({ _id: id }).then(() => {
      res.status(200).json({ message: 'Professor deleted' })
  })

})



app.get('/api/Student/by-class', async (req, res) => {
  try {
      const students7 = await User.find({ classe: "7ème Année" });
      const students8 = await User.find({ classe: "8ème Année" });
      const students9 = await User.find({ classe: "9ème Année" });

      res.status(200).json({ students7, students8, students9 });
  } catch (error) {
      res.status(500).json({ message: 'Erreur serveur', error });
  }
});

app.get('/api/student/:id', (req, res) => {
  const id = req.params.id
  User.findOne({ _id: id }).then((findedStudent) => {
      res.status(200).json({ student: findedStudent })
  })

})

app.get('/api/allStudent', (req, res) => {
 
  User.find({ role: "student" }).then((docs) => {
      res.status(200).json({ data: docs })
  })

})

app.delete('/api/student/:id', (req, res) => { 
 
  const id = req.params.id
  User.deleteOne({ _id: id }).then(() => {
      res.status(200).json({ message: 'student deleted' })
  })

})
//  Route pour affecter un étudiant à une classe et mettre à jour les professeurs
app.post('/api/affecter', async (req, res) => {
  try {
    const { studentId, classeId } = req.body;

    // Vérifier si l'étudiant et la classe existent
    const student = await User.findById(studentId);
    if (!student) {
      return res.status(404).json({ message: "Étudiant non trouvé" });
    }

    const classe = await Classe.findById(classeId);
    if (!classe) {
      return res.status(404).json({ message: "Classe non trouvée" });
    }

    // Ajouter l'étudiant à la classe (dans refClasses et IdStudents)
    classe.IdStudents.push(studentId);
    await classe.save();

    // Ajouter la classe à l'étudiant dans refClasses
    student.refClasses.push(classeId);
    await student.save();

    // // Mettre à jour les professeurs associés à cette classe
    // for (let professorId of classe.profId) {
    //   const professor = await User.findById(professorId);
    //   if (professor) {
    //     professor.studentsAssigned.push(studentId);  // Ajouter l'étudiant dans le champ studentsAssigned du professeur
    //     await professor.save();
    //   }
    // }

    res.status(200).json({ message: "Étudiant affecté avec succès à la classe et aux professeurs associés" });
  } catch (error) {
    console.error("Erreur lors de l'affectation de l'étudiant :", error);
    res.status(500).json({ message: "Erreur serveur lors de l'affectation de l'étudiant" });
  }
});



app.post('/classes', (req, res) => {
  
  const data = new Classe({
    nom: req.body.nom,
    desc: req.body.desc,
    idNiveau: req.body.idNiveau,
  });

  data.save((err, doc) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ message: 'Erreur lors de l\'ajout de la classe' });
    }

    Niveau.findOne({ _id: req.body.idNiveau }).then((findedNiveau) => {
      if (findedNiveau) {
        // Vérifiez si `classes` existe avant d'essayer de pousser un nouvel élément
        if (Array.isArray(findedNiveau.classe)) {
          findedNiveau.classe.push(doc._id); // Ajout de la classe à l'array
          
          // Mettez à jour le niveau avec la nouvelle classe ajoutée
          Niveau.updateOne({ _id: req.body.idNiveau }, findedNiveau)
            .then(() => {
              res.status(200).json({ message: 'Classe ajoutée' });
            })
            .catch((updateErr) => {
              console.log(updateErr);
              res.status(500).json({ message: 'Erreur lors de la mise à jour du niveau' });
            });
        } else {
          res.status(400).json({ message: 'Propriété classe non définie correctement dans le niveau' });
        }
      } else {
        res.status(404).json({ message: 'Niveau non trouvé' });
      }
    }).catch((err) => {
      console.log(err);
      res.status(500).json({ message: 'Erreur lors de la recherche du niveau' });
    });
  });
});


// app.get('/classes', (req, res) => {
  
//   Classe.find().then((docs) => {
//       res.status(200).json({ data: docs })
//   })

// })

app.get('/classes', (req, res) => {
  
  Classe.find().populate('idNiveau').then((docs) => {
      res.status(200).json({ data: docs })
  })

})

app.get('/classes/:id', (req, res) => {
  const id = req.params.id;

  Classe.findOne({ _id: id })
    .populate('idNiveau') // Ajoutez le `populate` pour remplir la référence `idNiveau`
    .then((findedClasse) => {
      if (findedClasse) {
        res.status(200).json({ classe: findedClasse });
      } else {
        res.status(404).json({ message: 'Classe non trouvée' });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: 'Erreur lors de la récupération de la classe' });
    });
});

// app.delete('/classes/:id', (req, res) => {
//  const id = req.params.id
//  Classe.deleteOne({ _id: id }).then(() => {
//       res.status(200).json({ message: 'Classe deleted' })
//   })

// })

app.put('/classes', (req, res) => {
    
  const data = new Classe({
      _id: req.body._id,
       nom: req.body.nom,
       idNiveau: req.body.idNiveau,
  })
  Classe.updateOne({ _id: req.body._id }, data).then(() => {
      res.status(200).json({ message: 'Classe updete' })

  })
})

// app.put('/classes', async (req, res) => {
//   try {
//     const { _id, nom, niveau, refMatieres ,nombre_max_etudiants} = req.body;

//     // Vérifier si la classe existe
//     const existingClasse = await Classe.findById(_id);
//     if (!existingClasse) {
//       return res.status(404).json({ message: "Classe non trouvée" });
//     }

//     // Supprimer l'ancien ID de classe dans les matières qui ne la référencent plus
//     await Matiere.updateMany(
//       { refClasses: _id },
//       { $pull: { refClasses: _id } }
//     );

//     // Ajouter l'ID de la classe dans les nouvelles matières référencées
//     await Matiere.updateMany(
//       { _id: { $in: refMatieres } },
//       { $push: { refClasses: _id } }
//     );

//     // Mise à jour de la classe
//     await Classe.updateOne({ _id }, { nom, niveau, refMatieres ,nombre_max_etudiants});

//     res.status(200).json({ message: "Classe mise à jour et matières synchronisées" });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Erreur serveur" });
//   }
// });

app.delete('/classes/:id', async (req, res) => {
  try {
    const id = req.params.id;

    // Supprimer la classe des matières qui la référencent
    await Matiere.updateMany(
      { refClasses: id },
      { $pull: { refClasses: id } }
    );

    // Supprimer la classe
    await Classe.deleteOne({ _id: id });

    res.status(200).json({ message: "Classe supprimée et matières mises à jour" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur serveur" });
  }
});


app.get('/matieres/:id', (req, res) => {
const id = req.params.id
 Matiere.findOne({ _id: id }).then((findedMatiere) => {
     res.status(200).json({ matiere: findedMatiere})
 })

})

// app.put('/matieres', (req, res) => {
   
//  const data = new Matiere({
//      _id: req.body._id,
//      niveau: req.body.niveau,
//      name: req.body.name,
//      coefficient: req.body.coefficient,
//      heures: req.body.heures,
//      refClasses: req.body.refClasses 

//  })
//  Matiere.updateOne({ _id: req.body._id }, data).then(() => {
//      res.status(200).json({ message: 'Matiere updete' })

//  })
// })

// app.delete('/matieres/:id', (req, res) => {
//   const id = req.params.id
//   Matiere.deleteOne({ _id: id }).then(() => {
//        res.status(200).json({ message: 'Matiere deleted' })
//    })
 
//  })

app.put('/matieres', async (req, res) => {
  try {
    const { _id, niveau, name, coefficient, heures, refClasses } = req.body;

    // Vérifier si la matière existe
    const existingMatiere = await Matiere.findById(_id);
    if (!existingMatiere) {
      return res.status(404).json({ message: "Matière non trouvée" });
    }

    // Supprimer l'ancien ID de matière dans les classes qui ne la référencent plus
    await Classe.updateMany(
      { refMatieres: _id },
      { $pull: { refMatieres: _id } }
    );

    // Ajouter l'ID de la matière dans les nouvelles classes référencées
    await Classe.updateMany(
      { _id: { $in: refClasses } },
      { $push: { refMatieres: _id } }
    );

    // Mise à jour de la matière
    await Matiere.updateOne({ _id }, { niveau, name, coefficient, heures, refClasses });

    res.status(200).json({ message: "Matière mise à jour et classes synchronisées" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur serveur" });
  }
});

app.delete('/matieres/:id', async (req, res) => {
  try {
    const id = req.params.id;

    // Supprimer la matière des classes qui la référencent
    await Classe.updateMany(
      { refMatieres: id },
      { $pull: { refMatieres: id } }
    );

    // Supprimer la matière
    await Matiere.deleteOne({ _id: id });

    res.status(200).json({ message: "Matière supprimée et classes mises à jour" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur serveur" });
  }
});

app.post('/matieres/affecterProfesseur', async (req, res) => {
  try {
      console.log("Données reçues:", req.body);

      const { professeurId, matiereId, classeId } = req.body;

      // Vérification des données envoyées
      if (!professeurId || !matiereId || !classeId) {
          return res.status(400).json({ message: "Données manquantes" });
      }

      // Vérifier si le professeur existe
      const professeur = await User.findById(professeurId);
      if (!professeur) {
          return res.status(404).json({ message: "Professeur non trouvé" });
      }

      // Vérifier si la matière existe
      const matiere = await Matiere.findById(matiereId);
      if (!matiere) {
          return res.status(404).json({ message: "Matière non trouvée" });
      }

      // Vérifier si la classe existe
      const classe = await Classe.findById(classeId);
      if (!classe) {
          return res.status(404).json({ message: "Classe non trouvée" });
      }

      // 🔹 Ajouter le professeur à la liste des professeurs de la matière
      if (!matiere.profId.includes(professeurId)) {
          matiere.profId.push(professeurId);
      }

      // 🔹 Ajouter la classe à la liste des classes enseignées par le professeur
      if (!professeur.refClasses.includes(classeId)) {
          professeur.refClasses.push(classeId);
      }

      // 🔹 Ajouter la matière à la liste des matières enseignées par le professeur
      if (!professeur.refMatieres.includes(matiereId)) {
          professeur.refMatieres.push(matiereId);
      }

      // 🔹 Ajouter le professeur à la liste des professeurs de la classe
      if (!classe.profId.includes(professeurId)) {
          classe.profId.push(professeurId);
      }

      // Sauvegarder les modifications
      await matiere.save();
      await professeur.save();
      await classe.save();

      console.log("Professeur affecté avec succès !");
      res.status(200).json({ message: "Professeur affecté avec succès à la matière et à la classe" });

  } catch (error) {
      console.error("Erreur lors de l'affectation du professeur :", error);
      res.status(500).json({ message: "Erreur serveur lors de l'affectation du professeur", error: error.message });
  }
});






// const MIME_TYPETwo= {
//   "application/pdf": "pdf",
// };
// const storageTwo = multer.diskStorage({
//   // destination
//   destination: (req, file, cb) => {
//       const isValid = MIME_TYPETwo[file.mimetype];
//       let error = new Error("Mime type is invalid");
//       if (isValid) {
//           error = null;
//       }
//       cb(null, 'backend/cours')
//   },
//   filename: (req, file, cb) => {
//       const name = file.originalname.toLowerCase().split(' ').join('-');
//       const extension = MIME_TYPETwo[file.mimetype];
//       const imgName = name + '-' + Date.now() + '-Elite-' + '.' +
//           extension;
//       cb(null, imgName);
//   }
// })

app.use('/cours', express.static(path.join('backend/cours')));

// Ta config Multer
const MIME_TYPETwo = {
  "application/pdf": "pdf",
};
const storageTwo = multer.diskStorage({
  destination: (req, file, cb) => {
      const isValid = MIME_TYPETwo[file.mimetype];
      let error = new Error("Mime type is invalid");
      if (isValid) {
          error = null;
      }
      cb(null, 'backend/cours'); // C’est bien
  },
  filename: (req, file, cb) => {
      const name = file.originalname.toLowerCase().split(' ').join('-');
      const extension = MIME_TYPETwo[file.mimetype];
      const imgName = name + '-' + Date.now() + '-Elite-' + '.' + extension;
      cb(null, imgName);
  }
});
app.post('/cours', multer({ storage: storageTwo }).fields([
  { name: 'file', maxCount: 1 },
  { name: 'tp', maxCount: 1 }
]), async (req, res) => {
  try {
    let url = req.protocol + '://' + req.get('host');

    let file = req.files['file'] ? url + '/cours/' + req.files['file'][0].filename : '';
    let tp = req.files['tp'] ? url + '/cours/' + req.files['tp'][0].filename : '';

    // 1. Créer le cours
    const data = new Cour({
      duree: req.body.duree,
      nom: req.body.nom,
      desc: req.body.desc,
      file: file,
      tp: tp,
      teacherId: req.body.teacherId,
      idClasse: req.body.idClasse
    });

    // 2. Sauvegarder le cours
    const savedCours = await data.save();

    // 3. Mettre à jour la classe pour ajouter l'ID du nouveau cours
    await Classe.findByIdAndUpdate(
      req.body.idClasse,
      { $push: { idCours: savedCours._id } }
    );

    res.status(200).json({ message: 'Cour ajouté et Classe mise à jour !' });
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur serveur lors de l\'ajout du cours' });
  }
});

app.get('/cours/teacher/:teacherId', async (req, res) => {
  try {
    const teacherId = req.params.teacherId; // Récupère l'ID du professeur depuis les paramètres de l'URL

    // Recherche les cours associés à ce teacherId
    const cours = await Cour.find({ teacherId: teacherId });

    if (cours.length === 0) {
      return res.status(404).json({ message: 'Aucun cours trouvé pour ce professeur.' });
    }

    // Si des cours sont trouvés, on les retourne
    res.status(200).json(cours);
  } catch (error) {
    console.error('Erreur lors de la récupération des cours:', error);
    res.status(500).json({ message: 'Erreur serveur.' });
  }
});


app.post('/cours/by-ids', (req, res) => {
  const { ids } = req.body;
 Cour.find({ '_id': { $in: ids } })
    .then(courses => {
      res.json({ courses });
    })
    .catch(error => {
      res.status(500).json({ error: 'Erreur lors de la récupération des cours' });
    });
});

app.delete('/cours/:id', (req, res) => { 
 
  const id = req.params.id
  Cour.deleteOne({ _id: id }).then(() => {
      res.status(200).json({ message: 'cours deleted' })
  })

})



app.get('/classes/teacher/:teacherId', async (req, res) => {
  try {
    const teacherId = req.params.teacherId;
    const classes = await Classe.find({ profId: teacherId }).populate('idNiveau');
    res.status(200).json({ data: classes });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});



// // Dans votre fichier de routes (cours.js)
// app.get('/teacher/:teacherId', async (req, res) => {
//   try {
//     const { teacherId } = req.params;
//     const cours = await Cour.find({ teacherId });
//     res.json({ data: cours });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });


app.post('/niveau', (req, res) => {
  const data = new Niveau({
 
    name: req.body.name,
   desc: req.body.desc,
   })
 data.save().then(() => {
     res.status(200).json({ message: 'Nivau Added' })
 })
})
app.get('/niveau', (req, res) => {

  Niveau.find().then((docs) => {
      res.status(200).json({ niveau: docs })
  })

})


app.post('/matieres', (req, res) => {
  
  const data = new Matiere({

    name: req.body.name,
    coefficient: req.body.coefficient,
    heures: req.body.heures,
    desc:req.body.desc,
    idNiveau:req.body.idNiveau,
    nomNiveau: req.body.nomNiveau ,

  })
  data.save((err, doc) => {
      if (err) {
          console.log(err);
 
      } else {
        Niveau.findOne({ _id: req.body.idNiveau }).then((findedNiveau) => {
              if (findedNiveau) {
                findedNiveau.matieres.push(doc._id)
                Niveau.updateOne({ _id: req.body.idNiveau }, findedNiveau).then(() => {
                      res.status(200).json({ message: 'matieres Added' })

                  })

              }
          })
      }

  })
})
app.get('/matieres', async (req, res) => {
      try {
          const matiereNiveau1 = await Matiere.find({ nomNiveau: "7ème Année" }); 
          const matiereNiveau2 = await Matiere.find({ nomNiveau: "8ème Année" });
          const matiereNiveau3 = await Matiere.find({ nomNiveau: "9ème Année" });
  
          res.status(200).json({ 
              success: true,
              matiereNiveau1,
              matiereNiveau2,
              matiereNiveau3, 
          });
      } catch (error) {
          res.status(500).json({ 
              success: false,
              message: 'Erreur serveur', 
              error: error.message 
          });
      }
  });
app.get('/coefficient-options', (req, res) => {
  const schema = mongoose.model('Matiere').schema;
  const coefficientPath = schema.path('coefficient');
  
  if (coefficientPath.enumValues) {
      res.json({ coefficients: coefficientPath.enumValues });
  } else if (coefficientPath.options && coefficientPath.options.enum) {
      res.json({ coefficients: coefficientPath.options.enum });
  }
});


app.get('/nomClasse', async (req, res) => {
  const Classe = mongoose.model('Classe');
  const enumValues = Classe.schema.path('nom').enumValues;
  res.json({ nomClasse: enumValues });
});



app.post('/note', (req, res) => {
  // Créer une nouvelle note à partir des données reçues dans le corps de la requête
  const data = new Note({
    noteControle: req.body.noteControle,        
    noteSynthese: req.body.noteSynthese, 
    orale:req.body.orale,       
    desc: req.body.desc,        
    matieresId: req.body.matieresId,  
    studentId: req.body.studentId,   
    teacherId: req.body.teacherId 

  });

  // Sauvegarder la note dans la base de données
  data.save()
    .then(savedNote => {
      // Une fois la note enregistrée, ajouter l'ID de la note dans le tableau "notes" de l'étudiant
      User.findByIdAndUpdate(
        req.body.studentId, // L'ID de l'étudiant
        { $push: { notes: savedNote._id } }, // Ajouter l'ID de la note au tableau "notes"
        { new: true } // Option pour récupérer l'utilisateur mis à jour
      )
        .then(updatedUser => {
          // Retourner une réponse avec un message de succès
          res.status(200).json({ message: 'Note Added and User updated', updatedUser });
        })
        .catch(err => {
          res.status(500).json({ message: 'Error updating user notes', error: err });
        });
    })
    .catch(err => {
      res.status(500).json({ message: 'Error adding note', error: err });
    });
});


app.get('/note', (req, res) => {

  Note.find().then((docs) => {
      res.status(200).json({ note: docs })
  })

})




//  récupérer toutes les notes d'un étudiant avec les infos de la matière
app.get('/note/student/:id', async (req, res) => {
  try {
    const studentId = req.params.id;

    const notes = await Note.find({ studentId })
      .populate('matieresId') // pour récupérer les infos de la matière
      .exec();

    res.status(200).json(notes);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error });
  }
});



// Obtenir l'enfant via le numéro du parent
app.get('/api/child/:parentPhone', async (req, res) => {
  try {
    const parentPhone = req.params.parentPhone;

    // Chercher le parent par téléphone
    const parent = await User.findOne({ phone: parentPhone, role: 'parent' });
    if (!parent) {
      return res.status(404).json({ message: "Parent non trouvé." });
    }

    // Chercher l'étudiant (enfant) par le numéro stocké dans phoneEnfant
    const student = await User.findOne({ phone: parent.phoneEnfant, role: 'student' })
    .populate({
      path: 'refClasses',
      populate: [
        {
          path: 'idNiveau',
          model: 'Niveau',
          populate: {
            path: 'idEmploi', 
            model: 'Emploi'
          }
        }
      ]
    })
    .populate({
      path: 'notes',
      populate: {
        path: 'matieresId',
        model: 'Matiere' // adapte ce nom selon ton modèle exact
      }
    });
  
    if (!student) {
      return res.status(404).json({ message: "Enfant non trouvé." });
    }

    res.status(200).json({ student });
  } catch (error) {
    console.error("Erreur lors de la récupération de l'enfant :", error);
    res.status(500).json({ message: "Erreur serveur." });
  }
});


app.post('/reclamation', (req, res) => {
  const data = new Reclamation({
 
    nom: req.body.nom,
    email: req.body.email,
    telephone: req.body.telephone,
    NomEleve: req.body.NomEleve,
    sujetReclamation: req.body.sujetReclamation,
    detailsReclamation: req.body.detailsReclamation,
   })
 data.save().then(() => {
     res.status(200).json({ message: 'reclamation Added' })
 })
})

app.get('/reclamation', (req, res) => {

  Reclamation.find().then((docs) => {
      res.status(200).json({ data: docs })
  })

})




app.use('/images', express.static(path.join('backend/images')));

// Ta config Multer
const MIME_TYPEEmlpoi = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/jpg": "jpg",
  "application/pdf": "pdf",
};
const storageEmploi = multer.diskStorage({
  destination: (req, file, cb) => {
      const isValid = MIME_TYPEEmlpoi[file.mimetype];
      let error = new Error("Mime type is invalid");
      if (isValid) {
          error = null;
      }
      cb(null, 'backend/images'); 
  },
  filename: (req, file, cb) => {
      const name = file.originalname.toLowerCase().split(' ').join('-');
      const extension = MIME_TYPEEmlpoi[file.mimetype];
      const imgName = name + '-' + Date.now() + '-Elite-' + '.' + extension;
      cb(null, imgName);
  }
});
// app.post('/emploi', multer({ storage: storageEmploi }).fields([
//   { name: 'emploi', maxCount: 1 },
// ]), async (req, res) => {
//   try {
//     let url = req.protocol + '://' + req.get('host');

//     let file = req.files['emploi'] ? url + '/images/' + req.files['emploi'][0].filename : '';

//     const data = new Emploi({
//       annee: req.body.annee,
//       Commentaire: req.body.Commentaire,
//       idNiveau: req.body.idNiveau,
//       emploi: file,
//     });

//     await data.save();
//     res.status(200).json({ message: 'Emploi Added' });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Erreur lors de l\'ajout de l\'emploi', error });
//   }
// });

app.post('/emploi', multer({ storage: storageEmploi }).fields([
  { name: 'emploi', maxCount: 1 },
]), async (req, res) => {
  try {
    let url = req.protocol + '://' + req.get('host');
    let file = req.files['emploi'] ? url + '/images/' + req.files['emploi'][0].filename : '';

    const data = new Emploi({
      annee: req.body.annee,
      Commentaire: req.body.Commentaire,
      idNiveau: req.body.idNiveau,
      emploi: file,
    });

    const savedEmploi = await data.save();

    //  Mise à jour du niveau avec idEmploi
    await Niveau.findByIdAndUpdate(
      req.body.idNiveau,
      { idEmploi: savedEmploi._id },
      { new: true }
    );

    res.status(200).json({ message: 'Emploi Added & Niveau updated', emploi: savedEmploi });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de l\'ajout de l\'emploi', error });
  }
});



// Route pour récupérer l'emploi du temps du niveau
app.get('/emploi/niveau/:idNiveau/emploi', async (req, res) => {
  try {
    const niveau = await Niveau.findById(req.params.idNiveau).populate('idEmploi');
    if (!niveau) {
      return res.status(404).json({ message: 'Niveau non trouvé' });
    }
    res.json({ emploi: niveau.idEmploi });
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
});



// PUT /reclamation/:id
app.put('/reclamation/reclamation/:id', async (req, res) => {
  const { etat, description } = req.body;
  try {
    await Reclamation.findByIdAndUpdate(req.params.id, { etat, description });
    res.json({ message: "Reclamation mise à jour" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = app // make app exportable 