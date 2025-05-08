import { Component, OnInit } from '@angular/core';
import { jwtDecode, JwtPayload } from 'jwt-decode';
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
  selector: 'app-dashboard-prof',
  templateUrl: './dashboard-prof.component.html',
  styleUrls: ['./dashboard-prof.component.css']
})
export class DashboardProfComponent implements OnInit {
  connectedUser:any
  constructor() { }

  ngOnInit(): void {
    this.loadConnectedProf()
  }

  loadConnectedProf(): void {
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
