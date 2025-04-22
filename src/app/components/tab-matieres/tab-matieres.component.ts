import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatiereService } from 'src/app/services/matiere.service';
import { NiveauService } from 'src/app/services/niveau.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tab-matieres',
  templateUrl: './tab-matieres.component.html',
  styleUrls: ['./tab-matieres.component.css']
})
export class TabMatieresComponent implements OnInit {
  niveau:any =[]
  matiereNiveau1: any[] = [];
  matiereNiveau2: any[] = [];
  matiereNiveau3: any[] = [];
  constructor( private matiereService: MatiereService , private router:Router , private niveauService:NiveauService) { }

  ngOnInit(): void {
    this.getAllMatieres()
    this.getAllNiveau()


  }

  getAllMatieres(){
    
    this.matiereService.getAllMatieres().subscribe((res) => {
      this.matiereNiveau1 = res.matiereNiveau1;
      this.matiereNiveau2 = res.matiereNiveau2;
      this.matiereNiveau3 = res.matiereNiveau3; 
      
    });
  }


//   getAllMatieres() {
//     this.matiereService.getAllMatieres().subscribe({
//         next: (res) => {
//             if (res.success) {
//                 this.matiereNiveau1 = res.matiereNiveau1;
//                 this.matiereNiveau2 = res.matiereNiveau2;
//                 this.matiereNiveau3 = res.matiereNiveau3;
//             } else {
//                 console.error('Erreur du serveur:');
//             }
//         },
//         error: (err) => {
//             console.error('Erreur HTTP:', err);
//             // Afficher un message d'erreur à l'utilisateur
//         }
//     });
// }



  deletMatiere(id:any){
 
  
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
    this.matiereService.deletMatieres(id).subscribe((result)=>{
      this.getAllMatieres()
    })
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success"
        });
      }
    });
  
  
  
  }

  navigateTo(id:any){
    this.router.navigate(['/add-matieres/'+id])
  }
  

  getAllNiveau(){
        
    this.niveauService.getAllNiveau().subscribe((res)=>{
       this.niveau=res.niveau
       console.log(res.niveau);
       
      })
      
       
     }






 



}
