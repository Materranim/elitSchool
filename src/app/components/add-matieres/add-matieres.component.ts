import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ClasseService } from 'src/app/services/classe.service';
import { MatiereService } from 'src/app/services/matiere.service';
import { NiveauService } from 'src/app/services/niveau.service';

@Component({
  selector: 'app-add-matieres',
  templateUrl: './add-matieres.component.html',
  styleUrls: ['./add-matieres.component.css']
})
export class AddMatieresComponent implements OnInit {

  matiere:any ={}
  classes:any=[]
  id:any
  title='Ajouter Matiere'
  title1='Ajouter une Matière'
  niveau:any=[] 
  coefficientOptions: number[] = [];

  constructor( private router: Router,private activatedRoute:ActivatedRoute , 
  private matiereService: MatiereService, private niveauService:NiveauService,private toastr: ToastrService ) { }

  ngOnInit(): void {
    this.id=this.activatedRoute.snapshot.paramMap.get('id')
    console.log(this.id);
    // this.getAllClasses()
   this.getAllNiveau()
   this.getCoefficientOptions();

    if (this.id) {
      this.title='Modifier Matiere '
      this.title1='Modifier une Matière'
      this.getMatieresByID()
      }
    
  }

  // addEditMatiere() {
  //   // Trouver le niveau correspondant à l'ID sélectionné
  //   const selectedNiveau = this.niveau.find((n: any) => n._id === this.matiere.idNiveau);
    
  //   // Si un niveau est sélectionné, ajouter son nom à l'objet matiere
  //   if (selectedNiveau) {
  //     this.matiere.nomNiveau = selectedNiveau.name;
  //   }
  
  //   if (this.id) {
  //     // Edit*******
  //     this.matiereService.updateMatieres(this.matiere).subscribe((res) => {
  //       console.log(res.message);
  //       this.router.navigate(['/tab-matieres']);
  //     });
  //   } else {
  //     // Add*******
  //     this.matiereService.addMatieres(this.matiere).subscribe((result) => {
  //       console.log(result.message);
  //       this.router.navigate(['/tab-matieres']);
  //     });
  //   }
  // }


  addEditMatiere() {
    // Vérification des champs requis
    if (!this.matiere.idNiveau || !this.matiere.name || !this.matiere.coefficient || !this.matiere.heures) {
      this.toastr.error('Veuillez remplir tous les champs obligatoires', 'Erreur');
      return;
    }
  
    // Trouver le niveau correspondant à l'ID sélectionné
    const selectedNiveau = this.niveau.find((n: any) => n._id === this.matiere.idNiveau);
    
    // Si un niveau est sélectionné, ajouter son nom à l'objet matiere
    if (selectedNiveau) {
      this.matiere.nomNiveau = selectedNiveau.name;
    }
  
    if (this.id) {
      // Edit*******
      this.matiereService.updateMatieres(this.matiere).subscribe(
        (res) => {
          this.toastr.success('Matière modifiée avec succès', 'Succès');
          this.router.navigate(['/tab-matieres']);
        },
        (error) => {
          this.toastr.error('Erreur lors de la modification de la matière', 'Erreur');
          console.error(error);
        }
      );
    } else {
      // Add*******
      this.matiereService.addMatieres(this.matiere).subscribe(
        (result) => {
          this.toastr.success('Matière ajoutée avec succès', 'Succès');
          this.router.navigate(['/tab-matieres']);
        },
        (error) => {
          this.toastr.error('Erreur lors de l\'ajout de la matière', 'Erreur');
          console.error(error);
        }
      );
    }
  }
  onNiveauChange() {
    const selectedNiveau = this.niveau.find((n: any) => n._id === this.matiere.idNiveau);
    if (selectedNiveau) {
      this.matiere.nomNiveau = selectedNiveau.name;
    }
  }

      getMatieresByID(){ 
        
        
        this.matiereService.getMatieresByID(this.id).subscribe((res)=>{
          console.log(res.matiere); 

          this.matiere=res.matiere
          
        })
      }

      

    
      getAllNiveau(){
        
        this.niveauService.getAllNiveau().subscribe((res)=>{
           this.niveau=res.niveau
           console.log(res.niveau);
           
          })
          } 
    
          getCoefficientOptions() {
            this.matiereService.getCoefficientOptions().subscribe((res) => {
              this.coefficientOptions = res.coefficients;
              console.log("coefficients reçus :", this.coefficientOptions);

            });

          }       
      
}



































