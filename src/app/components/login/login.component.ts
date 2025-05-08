import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user:any = {}
  constructor( private userService:UsersService , private router:Router , private toastr: ToastrService ) { }

  ngOnInit(): void {
  }

  

  // login() {
  //   this.userService.login(this.user).subscribe((res) => {
  //     console.log(res.message);
      
  //     if (res.message === '0') {
  //       this.toastr.error('email incorrect', 'Erreur');
  //     } else if (res.message === '1') {
  //       this.toastr.error('Mot de passe incorrect', 'Erreur');
  //     } else if (res.message === '3') {
  //       this.toastr.warning('Votre compte n\'est pas encore confirmé', 'Attention');
  //     } else if (res.message === '2') {
  //       localStorage.setItem('connectedUser', JSON.stringify(res.user));
  //       this.toastr.success('Connexion réussie !', 'Bienvenue');
  //       this.router.navigate(['/interface']);
       

  //     }
  //   });
  // } 
  

  // login() {
  //   this.userService.login(this.user).subscribe((res) => {
  //     console.log(res.message);
  
  //     if (res.message === '0') {
  //       this.toastr.error('email incorrect', 'Erreur');
  //     } else if (res.message === '1') {
  //       this.toastr.error('Mot de passe incorrect', 'Erreur');
  //     } else if (res.message === '3') {
  //       this.toastr.warning('Votre compte n\'est pas encore confirmé', 'Attention');
  //     } else if (res.message === '2') {
  //       localStorage.setItem('connectedUser', JSON.stringify(res.user));
  //       this.toastr.success('Connexion réussie !', 'Bienvenue');
  
  //       const role = res.user.role;
  
  //       let route = '/interface'; 
  //       switch (role) {
  //         case 'admin':
  //           route = '/interface';
  //           break;
  //         case 'parent':
  //           route = '/ddashboard-parent';
  //           break;
  //         case 'teacher':
  //           route = '/dashboard-prof';
  //           break;
  //         case 'student':
  //           route = '/dashboard-student';
  //           break;
  //         default:
  //           this.toastr.error('Rôle utilisateur non reconnu', 'Erreur');
  //           return;
  //       }
  
  //       this.router.navigate([route]).then(() => {
  //         window.location.reload();
  //       });
  //     }
  //   });
  // }
  

  login() {
    this.userService.login(this.user).subscribe((res) => {
      console.log(res.message);
  
      if (res.message === '0') {
        this.toastr.error('email incorrect', 'Erreur');
      } else if (res.message === '1') {
        this.toastr.error('Mot de passe incorrect', 'Erreur');
      } else if (res.message === '3') {
        this.toastr.warning('Votre compte n\'est pas encore confirmé', 'Attention');
      } else if (res.message === '2') {
        localStorage.setItem('connectedUser', JSON.stringify(res.user));
        this.toastr.success('Connexion réussie !', 'Bienvenue');
        this.router.navigate(['/interface']).then(() => {
          window.location.reload();
        });
      }
    });
  }
  
}
