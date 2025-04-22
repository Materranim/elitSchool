import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
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



@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor( private router: Router) {}
 
  canActivate( route: ActivatedRouteSnapshot ): boolean {
     let token = localStorage.getItem('connectedUser')
  
      if (token) { 
        // 3andi user connecte
        let decoded=jwtDecode<CustomJwtPayload>(token);

        let userRole= decoded?.user?.role
        let requiredRole =route.data['role'];
        // console.log('userRole',userRole);
        // console.log('requiredRole',requiredRole);
        
        if (requiredRole?.includes(userRole)) {
        return true; // Autoriser la navigation 
          
        } else {  
        this.router.navigate(['/unauthorized']);
        return false 
        } 
       
     }else { 
        // ma3andich user connecté
          this.router.navigate(['/login']); // Rediriger vers la page de login 
           return false; // Bloquer la navigation 
          } }
        }
