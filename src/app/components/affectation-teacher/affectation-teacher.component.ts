import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ClasseService } from 'src/app/services/classe.service';
import { MatiereService } from 'src/app/services/matiere.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-affectation-teacher',
  templateUrl: './affectation-teacher.component.html',
  styleUrls: ['./affectation-teacher.component.css']
})
export class AffectationTeacherComponent implements OnInit {
  professor : any = {}
  id:any
  classe:any= []
  matiere:any= []
  selectedMatiere: string[] = [];
  selectedClasse: string[] = [];
  constructor(private activateRoute:ActivatedRoute ,private router:Router, private usersService:UsersService ,private classeService: ClasseService , private matiereService: MatiereService ,private toastr: ToastrService) { }

  ngOnInit(): void {
    this.id=this.activateRoute.snapshot.paramMap.get("id")

    this.getProfessorByID()
    this.getAllClasses()
    this.getAllMatieres()
  
  }



  getProfessorByID(){
   this.usersService.getProfessorByID(this.id).subscribe((res)=>{
      this.professor=res.professor
      console.log(this.professor);
      
    })
  }
    getAllClasses(){
      this.classeService.getAllClasses().subscribe((res)=>{
       this.classe=res.data
        //  console.log(this.classe);
         
        }) 
         
       }
     
      getAllMatieres(){
        this.matiereService.getAllMatieres().subscribe((res) => {
            console.log("Données reçues :", res);
            this.matiere = [...res.matiereNiveau1, ...res.matiereNiveau2, ...res.matiereNiveau3]; 
        }, (err) => {
            console.error("Erreur lors de la récupération des matières :", err);
        });
    }
    
  
  
    affecterProfesseur() {
      const data = {
        professeurId: this.id,
        matiereId: this.selectedMatiere,
        classeId: this.selectedClasse
      };
      //dazdjazdazdazjdzoazd
    
      this.matiereService.affecterProfesseur(data).subscribe(
        (res) => {
          console.log(res.message);
          this.toastr.success('Affectation réussie !', 'Succès');
           this.router.navigate(['/interface'])

        },
        (err) => {
          console.error("Erreur d'affectation :", err);
          this.toastr.error('Échec de l\'affectation', 'Erreur');
        }
      );
    }
    


 
//   affecterProfesseur() {
//     const data = {
//       professeurId: this.id, // ID du professeur récupéré depuis l'URL
//       matiereId: this.selectedMatiere, // ID de la matière sélectionnée
//       classeId: this.selectedClasse // ID de la classe sélectionnée
//     };
  
//     this.matiereService.affecterProfesseur(data).subscribe(
//       (res) => {
//         console.log(res.message);
//         alert("Affectation réussie !");
//         // this.router.navigate(['/interface'])
//       },
//       (err) => {
//         console.error("Erreur d'affectation :", err);
//       }
//     );
// }

 
// affecterProfesseur() {
//   if (!this.selectedMatiere.length || !this.selectedClasse.length) {
//     alert("Veuillez sélectionner au moins une matière et une classe");
//     return;
//   }

//   const affectations = [];
  
//   // Créer toutes les combinaisons matières/classes
//   for (const matiereId of this.selectedMatiere) {
//     for (const classeId of this.selectedClasse) {
//       affectations.push({
//         professeurId: this.id,
//         matiereId: matiereId,
//         classeId: classeId
//       });
//     }
//   }

//   // Envoyer toutes les affectations en une seule requête
//   this.usersService.affecterProfesseur(affectations).subscribe(
//     (res) => {
//       alert("Affectation réussie !");
//       // Réinitialiser les sélections
//       this.selectedMatiere = [];
//       this.selectedClasse = [];
//     },
//     (err) => {
//       console.error("Erreur d'affectation :", err);
//       alert("Une erreur est survenue lors de l'affectation");
//     }
//   );
// }
  
  
}
