import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode , JwtPayload } from "jwt-decode";

interface CustomJwtPayload extends JwtPayload{
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
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, AfterViewInit {
  connectedUser:any

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.initDropdowns();
  }

  initDropdowns(): void {
    // Correction: Utiliser Element au lieu de HTMLElement pour querySelectorAll
    document.querySelectorAll(".has-arrow + ul").forEach((dropdown: Element) => {
      (dropdown as HTMLElement).style.display = 'none';
    });

    // Gérer le clic sur les menus dropdown
    document.querySelectorAll(".has-arrow").forEach(arrow => {
      arrow.addEventListener('click', (e) => {
        e.preventDefault();
        this.toggleDropdown(e.currentTarget as HTMLElement);
      });
    });
  }

  toggleDropdown(currentArrow: HTMLElement): void {
    // Fermer les autres dropdowns
    document.querySelectorAll(".has-arrow").forEach((arrow: Element) => {
      if (arrow !== currentArrow) {
        arrow.classList.remove("active");
        ((arrow.nextElementSibling as HTMLElement)).style.display = 'none';
        arrow.setAttribute('aria-expanded', 'false');
      }
    });
    
    // Basculer l'état actuel
    const isActive = currentArrow.classList.contains("active");
    currentArrow.classList.toggle("active");
    const dropdown = currentArrow.nextElementSibling as HTMLElement;
    dropdown.style.display = isActive ? 'none' : 'block';
    currentArrow.setAttribute('aria-expanded', isActive ? 'false' : 'true');
  }

  selectRole(event: Event, role: string): void {
    event.preventDefault();
    this.router.navigate(['/signup'], { queryParams: { role: role } });
  }


  isLogged(){
    let token=localStorage.getItem('connectedUser')
   
    if (token) {
      const decoded=jwtDecode<CustomJwtPayload>(token);
      if (decoded.user) {
      
        this.connectedUser = decoded.user
      }
    
      console.log('token',decoded);
      // console.log('date exp', decoded.exp);
      // console.log('date iat', decoded.iat);
      }
    return !!token
    }


    logout(){
      localStorage.removeItem('connectedUser')
      this.router.navigate(['/'])
        }

 
}