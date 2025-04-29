import { Component, OnInit } from '@angular/core';
import { jwtDecode, JwtPayload } from 'jwt-decode';
import { CoursService } from 'src/app/services/cours.service';
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
  selector: 'app-cours-etudiant',
  templateUrl: './cours-etudiant.component.html',
  styleUrls: ['./cours-etudiant.component.css']
})
export class CoursEtudiantComponent implements OnInit {
  cours: any[] = [];
  connectedUser:any
  constructor( private courService:CoursService) { }

  ngOnInit(): void {
    this.loadConnectedstudent();
  }


 loadConnectedstudent(): void {
       const token = localStorage.getItem('connectedUser');
       if (token) {
         const decoded = jwtDecode<CustomJwtPayload>(token);
         if (decoded.user) {
           this.connectedUser = decoded.user;
           console.log('token',decoded);
          //  this.getCoursByTeacherId(this.connectedUser._id);
           

         }
   
       }
     }

     getCoursByStudentId(studentId: string): void {
      this.courService.getCoursByStudentId(studentId).subscribe(
        (response: any) => {
          console.log('Cours récupérés:', response);
          this.cours = response; // adapte ici selon ton backend
        },
        (error) => {
          console.error('Erreur lors de la récupération des cours:', error);
        }
      );
    }

}
