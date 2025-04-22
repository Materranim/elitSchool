import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  selectRole(event: Event, role: string) {
    event.preventDefault();  // Empêche la redirection
    this.router.navigate(['/signup'], { queryParams: { role: role } });
  }
  
}
