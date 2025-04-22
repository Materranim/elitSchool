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
app.use("/cvs", express.static(path.join("backend/cvs")));

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

//  app.post('/api/signup',
//   multer({ storage: storage }).fields([{ name: "photoProfil" }, { name: "cv" }]),
//   (req, res) => {
//     console.log(req.body);
//     console.log("Files", req.files);
//     let url = req.protocol + "://" + req.get("host");

//     // Profile Image
//     let image = req.files["photoProfil"]
//       ? url + "/images/" + req.files["photoProfil"][0].filename
//       : null;

    
   
//     // CV File
//     let cv = req.files["cv"]
//       ? url + "/cvs/" + req.files["cv"][0].filename
//       : null;

//       bcrypt.hash(req.body.password, 10, function (err, hash) {
//         if (err) {
//           console.log("bcrypt error");
//         } else {
//           const data = new User({
//             role: req.body.role,
                    
//                     firstName: req.body.firstName,
//                     lastName: req.body.lastName,
//                     email: req.body.email,
//                     adresse: req.body.adresse,
//                     phone: req.body.phone,
//                     password: hash,
//                     specialite: req.body.specialite,
//                     cv:cv,
//                     photoProfil:image,
//                     phoneEnfant: req.body.phoneEnfant,
//                     classe:req.body.classe,
                    
//           });
  
//           data.save((error, docs) => {
//             if (error) {
//               console.log("Database error", error);
//               res.status(200).json({ message: "1" });
//             } else {
//               res.status(200).json({ message: "0" });
//             }
//           });
//         }
//       });
//     }
//   );


app.post("/api/signup",
  multer({ storage: storage }).fields([{ name: "photoProfil" }, { name: "cv" }]),
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

      // 🔹 Vérifier si c'est un parent et si le numéro de l'enfant existe
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

              data.save(async (error, docs) => {
                  if (error) {
                      console.log("Database error", error);
                      res.status(200).json({ message: "1" });
                  } else {
                      // Si le rôle est un professeur, on doit ajouter les étudiants assignés dans son profil
                      if (req.body.role === "teacher") {
                          try {
                              const classe = await Classe.findById(req.body.classe);  // Récupérer la classe assignée au professeur
                              if (classe) {
                                  // Ajouter l'étudiant dans la classe (si ce n'est pas déjà fait)
                                  classe.refProfessors.push(docs._id);  // Ajouter le professeur à la classe
                                  await classe.save();

                                  // Ajouter l'ID du professeur dans les étudiants de la classe (mettre à jour la collection User pour les étudiants)
                                  for (let studentId of classe.IdStudents) {
                                      const student = await User.findById(studentId);
                                      if (student && student.role === "student") {
                                          // Ajouter l'ID du professeur dans le profil de l'étudiant dans 'studentsAssigned'
                                          if (!student.studentsAssigned.includes(docs._id)) {
                                              student.studentsAssigned.push(docs._id);
                                              await student.save();
                                          }
                                      }
                                  }
                              }
                          } catch (err) {
                              console.log("Erreur lors de l'affectation des étudiants au professeur", err);
                          }
                      }
                      res.status(200).json({ message: "0" });
                  }
              });
          }
      });
  }
);


  // app.post("/api/signup",
  //   multer({ storage: storage }).fields([{ name: "photoProfil" }, { name: "cv" }]),
  //   async (req, res) => {
  //     console.log(req.body);
  //     console.log("Files", req.files);
  //     let url = req.protocol + "://" + req.get("host");
  
  //     // Profile Image
  //     let image = req.files["photoProfil"]
  //       ? url + "/images/" + req.files["photoProfil"][0].filename
  //       : null;
  
  //     // CV File
  //     let cv = req.files["cv"]
  //       ? url + "/images/" + req.files["cv"][0].filename
  //       : null;
  
  //     // 🔹 Vérifier si c'est un parent et si le numéro de l'enfant existe
  //     if (req.body.role === "parent") {
  //       const studentExists = await User.findOne({ role: "student", phone: req.body.phoneEnfant });
  
  //       if (!studentExists) {
  //         return res.status(400).json({ message: "Le numéro de l'enfant n'existe pas. Inscription refusée." });
  //       }
  //     }
  
  //     bcrypt.hash(req.body.password, 10, function (err, hash) {
  //       if (err) {
  //         console.log("bcrypt error");
  //       } else {
  //         const data = new User({
  //           role: req.body.role,
  //           firstName: req.body.firstName,
  //           lastName: req.body.lastName,
  //           email: req.body.email,
  //           adresse: req.body.adresse,
  //           phone: req.body.phone,
  //           password: hash,
  //           specialite: req.body.specialite,
  //           cv: cv,
  //           photoProfil: image,
  //           phoneEnfant: req.body.phoneEnfant,
  //           classe: req.body.classe,
  //           status: req.body.status
  //         });
  
  //         data.save((error, docs) => {
  //           if (error) {
  //             console.log("Database error", error);
  //             res.status(200).json({ message: "1" });
  //           } else {
  //             res.status(200).json({ message: "0" });
  //           }
  //         });
  //       }
  //     });
  //   }
  // );
  

  app.post('/api/login', (req, res) => {
    User.findOne({ email: req.body.email }).then(async (findedUser) => {
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
  
  
   

// app.post('/api/login', (req, res) => {
//   User.findOne({ email: req.body.email }).then(async (findedUser) => {
//       if (!findedUser) {
//           return res.status(200).json({ message: '0' }); // email incorrect
//       }

//       const trustedPwd = await bcrypt.compare(req.body.password, findedUser.password);
//       if (!trustedPwd) {
//           return res.status(200).json({ message: '1' }); // Mot de passe incorrect
//       }

//       if (findedUser.status !== "confirmed") {
//           return res.status(200).json({ message: '3' }); // Prof non confirmé
//       }
      
//       const token = jwt.sign({ user: findedUser }, secret_key, { expiresIn: '1h' });
//       return res.status(200).json({ message: '2', user: token }); // Succès
//   });
// });


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

// app.get('/api/Student', (req, res) => {
//   //trait logique get all Student  ********
 
//   User.find({}).then((docs) => {
//       res.status(200).json({ data: docs })
//   })

// })

app.get('/api/Student/by-class', async (req, res) => {
  try {
      const students7 = await User.find({ classe: "7eme" });
      const students8 = await User.find({ classe: "8eme" });
      const students9 = await User.find({ classe: "9eme" });

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
// ✅ Route pour affecter un étudiant à une classe et mettre à jour les professeurs
// app.post('/api/affecter', async (req, res) => {
//   try {
//     const { studentId, classeId } = req.body;

//     // Vérifier si l'étudiant et la classe existent
//     const student = await User.findById(studentId);
//     if (!student) {
//       return res.status(404).json({ message: "Étudiant non trouvé" });
//     }

//     const classe = await Classe.findById(classeId);
//     if (!classe) {
//       return res.status(404).json({ message: "Classe non trouvée" });
//     }

//     // Ajouter l'étudiant à la classe (dans refClasses et IdStudents)
//     classe.IdStudents.push(studentId);
//     await classe.save();

//     // Ajouter la classe à l'étudiant dans refClasses
//     student.refClasses.push(classeId);
//     await student.save();

//     // Mettre à jour les professeurs associés à cette classe
//     for (let professorId of classe.refProfessors) {
//       const professor = await User.findById(professorId);
//       if (professor) {
//         professor.studentsAssigned.push(studentId);  // Ajouter l'étudiant dans le champ studentsAssigned du professeur
//         await professor.save();
//       }
//     }

//     res.status(200).json({ message: "Étudiant affecté avec succès à la classe et aux professeurs associés" });
//   } catch (error) {
//     console.error("Erreur lors de l'affectation de l'étudiant :", error);
//     res.status(500).json({ message: "Erreur serveur lors de l'affectation de l'étudiant" });
//   }
// });



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


app.get('/classes', (req, res) => {
  
  Classe.find().then((docs) => {
      res.status(200).json({ data: docs })
  })

})

// app.get('/classes', (req, res) => {
  
//   Classe.find().populate('idNiveau').then((docs) => {
//       res.status(200).json({ data: docs })
//   })

// })


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



// app.get('/classes/:id', (req, res) => {
    
//   const id = req.params.id
//   Classe.findOne({ _id: id }).then((findedClasse) => {
//       res.status(200).json({ classe: findedClasse})
//   })

// })




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


// app.get('/matieres', async (req, res) => {
//   try {
//       const matiereNiveau1 = await Matiere.find({ niveau: "7eme" });
//       const matiereNiveau2 = await Matiere.find({ niveau: "8eme" });
//       const matiereNiveau3 = await Matiere.find({ niveau: "9eme" });

//       res.status(200).json({ matiereNiveau1, matiereNiveau2, matiereNiveau3 });
//   } catch (error) {
//       res.status(500).json({ message: 'Erreur serveur', error });
//   }
// });






// app.post('/matieres', async (req, res) nchofha 5ater code mbadel 


// app.post('/matieres', async (req, res) => {
//   try {
//     // Créer une nouvelle matière
//     const data = new Matiere({
//       niveau: req.body.niveau,
//       name: req.body.name,
//       coefficient: req.body.coefficient,
//       heures: req.body.heures,
//       refClasses: req.body.refClasses
//     });

//     // Sauvegarde de la matière
//     const doc = await data.save();

//     // Vérifier si la classe existe
//     const findedClasse = await Classe.findOne({ _id: req.body.refClasses });

//     if (!findedClasse) {
//       return res.status(404).json({ message: "Classe introuvable" });
//     }

//     // Mettre à jour la classe avec la nouvelle matière
//     await Classe.updateOne(
//       { _id: req.body.refClasses },
//       { $push: { matiere: doc._id } }
//     );

//     res.status(200).json({ message: "Matière ajoutée avec succès" });

//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Erreur serveur" });
//   }
// });







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






const MIME_TYPETwo= {
  "application/pdf": "pdf",
};
const storageTwo = multer.diskStorage({
  // destination
  destination: (req, file, cb) => {
      const isValid = MIME_TYPETwo[file.mimetype];
      let error = new Error("Mime type is invalid");
      if (isValid) {
          error = null;
      }
      cb(null, 'backend/cours')
  },
  filename: (req, file, cb) => {
      const name = file.originalname.toLowerCase().split(' ').join('-');
      const extension = MIME_TYPETwo[file.mimetype];
      const imgName = name + '-' + Date.now() + '-Elite-' + '.' +
          extension;
      cb(null, imgName);
  }
})


// app.post('/cours', multer({ storage: storageTwo }).single('file'), (req, res) => {
//   let url = req.protocol + '://' + req.get('host');
//   let file = url + '/cours/' + req.file.filename
  
//   console.log('add',req.body);
  
//   const data = new Cour({

//       duree: req.body.duree,
//       nom: req.body.nom,
//       desc: req.body.desc,
//       file :file,
//       teacherId:req.body.teacherId
//   })
//   console.log("data",data);
  
//   data.save().then(() => {
//       res.status(200).json({ message:'Cour Added' })
//   })
// })



app.post('/cours', multer({ storage: storageTwo }).fields([
  { name: 'file', maxCount: 1 },
  { name: 'tp', maxCount: 1 }
]), (req, res) => {
  let url = req.protocol + '://' + req.get('host');

  let file = req.files['file'] ? url + '/cours/' + req.files['file'][0].filename : '';
  let tp = req.files['tp'] ? url + '/cours/' + req.files['tp'][0].filename : '';

  const data = new Cour({
    duree: req.body.duree,
    nom: req.body.nom,
    desc: req.body.desc,
    file: file,
    tp: tp,
    // teacherId: req.body.teacherId,

  });

  data.save().then(() => {
    res.status(200).json({ message:'Cour Added' })
  });
});


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
          const matiereNiveau1 = await Matiere.find({ nomNiveau: "7ème Année " }); // Notez l'espace
          const matiereNiveau2 = await Matiere.find({ nomNiveau: "8ème Année " });
          const matiereNiveau3 = await Matiere.find({ nomNiveau: "9ème Année " });
  
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

module.exports = app // make app exportable 