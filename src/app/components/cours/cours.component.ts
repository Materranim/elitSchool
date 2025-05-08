import { Component, OnInit } from '@angular/core';
import { jwtDecode, JwtPayload } from 'jwt-decode';
import { CoursService } from 'src/app/services/cours.service';
import Swal from 'sweetalert2';
interface CustomJwtPayload extends JwtPayload {
  user?: {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    tel: string;
    createdAt: string;
    updatedAt: string;
    role: string;
    refClasses: Array<{ profId: string }> 
  };
}
@Component({
  selector: 'app-cours',
  templateUrl: './cours.component.html',
  styleUrls: ['./cours.component.css']
})
export class CoursComponent implements OnInit {
  cours: any[] = [];
  connectedUser:any
  constructor( private courService:CoursService) { }

  ngOnInit(): void {
    this.loadConnectedProf();


  }
 
    loadConnectedProf(): void {
       const token = localStorage.getItem('connectedUser');
       if (token) {
         const decoded = jwtDecode<CustomJwtPayload>(token);
         if (decoded.user) {
           this.connectedUser = decoded.user;
           console.log('token',decoded);
           this.getCoursByTeacherId(this.connectedUser._id);
           

         }
   
       }
     }


     getCoursByTeacherId(teacherId: string): void {
      this.courService.getCoursByTeacherId(teacherId).subscribe(
        (response: any) => {
          console.log('Cours récupérés:', response);
          this.cours = response; // adapte ici selon ton backend
        },
        (error) => {
          console.error('Erreur lors de la récupération des cours:', error);
        }
      );
    }

   
    deletCours(id:any){
            Swal.fire({
               title: "Êtes-vous sûr ?",
               text:"Vous ne pourrez pas annuler cette action !",
               icon: "warning",
               showCancelButton: true,
               confirmButtonColor: "#3085d6",
               cancelButtonColor: "#d33",
               confirmButtonText: "Oui, supprimer !",
                cancelButtonText: "Annuler"
             }).then((result) => { 
               if (result.isConfirmed) {
             this.courService.deletCour(id).subscribe((result)=>{
               this.loadConnectedProf()
             })
                 Swal.fire({
                   title: "Supprimé !",
                   text: "Cours a été supprimé avec succès.",
                   icon: "success"
                 });
               }
             });
           
           }

}
