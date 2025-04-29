import { Component, OnInit } from '@angular/core';
import { jwtDecode , JwtPayload } from "jwt-decode";
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
  };
}

@Component({
  selector: 'app-dashboard-student',
  templateUrl: './dashboard-student.component.html',
  styleUrls: ['./dashboard-student.component.css']
})
export class DashboardStudentComponent implements OnInit {
  connectedUser:any

  constructor() { }

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

      }

    }
  }
}
