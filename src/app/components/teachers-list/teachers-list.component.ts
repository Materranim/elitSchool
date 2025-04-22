import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-teachers-list',
  templateUrl: './teachers-list.component.html',
  styleUrls: ['./teachers-list.component.css']
})
export class TeachersListComponent implements OnInit {
  professor:any= []
  constructor(private usersService:UsersService , private router:Router) { }

  ngOnInit(): void {
    this.usersService.getAllProfessorsWithDetails().subscribe((response) => {
      this.professor = response.data;  // Stocke les enseignants avec les détails
    });
  }
  



}
