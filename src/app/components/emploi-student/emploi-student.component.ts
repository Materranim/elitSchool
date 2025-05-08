import { Component, OnInit } from '@angular/core';
import { jwtDecode, JwtPayload } from 'jwt-decode';
import { EmploiService } from 'src/app/services/emploi.service';
import { NiveauService } from 'src/app/services/niveau.service';
interface CustomJwtPayload extends JwtPayload {

user?:{
  _id:string;
  firstName:string;
  LastName:string;
  email:string;
  tel:string;
  createdAt:string;
  updatedAt:string
  role:string
  idNiveau: string; 

};
}
@Component({
  selector: 'app-emploi-student',
  templateUrl: './emploi-student.component.html',
  styleUrls: ['./emploi-student.component.css']
})
export class EmploiStudentComponent implements OnInit {
  connectedUser:any
  emploiImageUrl: string = '';
  idNiveau: string = '';
  constructor( private emploiService:EmploiService) { }

  ngOnInit(): void {
    this.loadConnectedStudent();
  }
  loadConnectedStudent(): void {
    const token = localStorage.getItem('connectedUser');
    if (token) {
      const decoded = jwtDecode<CustomJwtPayload>(token);
      if (decoded.user) {
        this.connectedUser = decoded.user;
        console.log('Utilisateur connecté :', this.connectedUser);

        if (this.connectedUser.refClasses && this.connectedUser.refClasses.length > 0) {
          this.idNiveau = this.connectedUser.refClasses[0].idNiveau;
          console.log('idNiveau extrait :', this.idNiveau);
          this.loadEmploi();
       
        }
      }
    }
  }
  


  loadEmploi(): void {
    this.emploiService.getEmploiByNiveau(this.idNiveau).subscribe(
      (response) => {
        if (response && response.emploi && response.emploi.emploi) {
          this.emploiImageUrl = response.emploi.emploi;
          console.log("emploi", this.emploiImageUrl);
          
      
        }
      },
      (error) => {
        console.error("Erreur lors du chargement de l'emploi :", error);
      }
    );
  }
  


  
}
