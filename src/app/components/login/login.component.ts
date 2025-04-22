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
