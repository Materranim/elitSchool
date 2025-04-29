import { Component, OnInit } from '@angular/core';
import { jwtDecode , JwtPayload } from "jwt-decode";
import { UsersService } from 'src/app/services/users.service';
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
    refClasses: Array<{ profId: string }> 

  };
}
@Component({
  selector: 'app-dashboard-student-prof',
  templateUrl: './dashboard-student-prof.component.html',
  styleUrls: ['./dashboard-student-prof.component.css']
})
export class DashboardStudentProfComponent implements OnInit {
  connectedUser:any
  professors: any[] = []; // Pour stocker les professeurs récupérés

  constructor( private usersService:UsersService ) { }

  ngOnInit(): void {
    this.loadConnectedStudent();
  }

   loadConnectedStudent(): void {
      const token = localStorage.getItem('connectedUser');
      if (token) {
        const decoded = jwtDecode<CustomJwtPayload>(token);
        if (decoded.user) {
          this.connectedUser = decoded.user;
          console.log('token',decoded);
          this.getProfessorsByClass(decoded.user.refClasses);

        }
  
      }
    }

      // Récupérer les professeurs en utilisant le profId dans refClasses
  getProfessorsByClass(refClasses: any[]): void {
    const profIds = refClasses.map((classItem: any) => classItem.profId).flat();
    profIds.forEach((profId: string) => {
      this.usersService.getProfessorByID(profId).subscribe((response: any) => {
        if (response && response.professor) {
          this.professors.push(response.professor);
        }
      });
    });
  }
  
}
