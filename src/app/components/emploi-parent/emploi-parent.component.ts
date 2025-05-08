import { Component, OnInit } from '@angular/core';
import { jwtDecode, JwtPayload } from 'jwt-decode';
import { UsersService } from 'src/app/services/users.service';
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
    phoneEnfant:String
}};
@Component({
  selector: 'app-emploi-parent',
  templateUrl: './emploi-parent.component.html',
  styleUrls: ['./emploi-parent.component.css']
})
export class EmploiParentComponent implements OnInit {
  connectedUser: any;
  enfant: any;
  emploiImageUrl: string | null = null;

  constructor( private usersService: UsersService) { }

  ngOnInit(): void {
    this.loadConnectedParent()
  }
//  loadConnectedParent(): void {
//     const token = localStorage.getItem('connectedUser');
//     if (token) {
//       const decoded = jwtDecode<CustomJwtPayload>(token);
//       if (decoded.user) {
//         this.connectedUser = decoded.user;
//         console.log('token',decoded);

//         const parentPhone = this.connectedUser.phone;
//         if (parentPhone) {
//           this.usersService.getEnfantByParentPhone(parentPhone).subscribe({
//             next: (res) => {
//               this.enfant = res.student;
//               console.log('Enfant récupéré :', this.enfant);
//             },
//             error: (err) => {
//               console.error("Erreur lors de la récupération de l'enfant :", err);
//             }
//           });
//         }
      
    
  
//       }

//     }
//   }

loadConnectedParent(): void {
  const token = localStorage.getItem('connectedUser');
  if (token) {
    const decoded = jwtDecode<CustomJwtPayload>(token);
    if (decoded.user) {
      this.connectedUser = decoded.user;

      const parentPhone = this.connectedUser.phone;
      if (parentPhone) {
        this.usersService.getEnfantByParentPhone(parentPhone).subscribe({
          next: (res) => {
            this.enfant = res.student;
            console.log('Enfant récupéré :', this.enfant);

            //  Récupération de l'image de l'emploi
            const refClasse = this.enfant?.refClasses?.[0];
            const idNiveau = refClasse?.idNiveau;
            const idEmploi = idNiveau?.idEmploi;

            if (idEmploi?.emploi) {
              this.emploiImageUrl = idEmploi.emploi;
            }
          },
          error: (err) => {
            console.error("Erreur lors de la récupération de l'enfant :", err);
          }
        });
      }
    }
  }
}

}
