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
    refClasses: Array<{ idCours: string[] }>;
  };
}
 

@Component({
  selector: 'app-cours-etudiant',
  templateUrl: './cours-etudiant.component.html',
  styleUrls: ['./cours-etudiant.component.css']
})
export class CoursEtudiantComponent implements OnInit {
  courses: any[] = []; 
  connectedUser:any
  constructor( private courService:CoursService) { }

  ngOnInit(): void {
    this.loadConnectedStudent()
  }



  loadConnectedStudent(): void {
    const token = localStorage.getItem('connectedUser');
    if (token) {
      const decoded = jwtDecode<CustomJwtPayload>(token);
      if (decoded.user) {
        this.connectedUser = decoded.user;
        console.log('token', decoded);
        this.getCourses(decoded.user.refClasses[0]?.idCours);
      }
    }
  }
  
  getCourses(idCours: string[]): void {
    this.courService.getCoursByStudent(idCours).subscribe(
      (response: any) => {
        if (response && response.courses) {
          this.courses = response.courses; 
          console.log("cours", this.courses);
        }
      },
      (error) => {
        console.error('Erreur lors de la récupération des cours', error);
      }
    );
  }

}
