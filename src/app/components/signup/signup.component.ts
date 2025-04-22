import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UsersService } from 'src/app/services/users.service';
import { MustMatch } from 'src/app/shared/Cpwd';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signupForm!: FormGroup;
  selectedRole: string = '';
  file:any 
  filePreview:any
  constructor( private formBuilder: FormBuilder , private route: ActivatedRoute , private userService:UsersService , private router:Router,private toastr: ToastrService ) { }

  ngOnInit(): void {
    // this.route.queryParams.subscribe(params => {
    //   this.selectedRole = params['role'] || '';
    // });

    

    this.signupForm = this.formBuilder.group({
       role: ['', Validators.required],
    firstName: ['', [Validators.required, Validators.minLength(5)]],
      lastName: ['', [Validators.required, Validators.maxLength(7)]],
      email: ['', [Validators.required, Validators.email]],
      adresse: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern(/^\d{8}$/)]],
      password: ['', [Validators.required, Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).+$/)]],
      cPassword: ['',Validators.required],
      specialite: ['', Validators.required],  // Pour les teachers
      cv: ['', Validators.required],  // Pour les teachers
      photoProfil: ['', Validators.required],  // Pour les students
      classe: ['', Validators.required],  // Pour les students 

      phoneEnfant: ['' ,[Validators.required, Validators.pattern(/^\d{8}$/)]],  // Pour les parents
      
    }, {
      validators: MustMatch('password', 'cPassword')
    });
    this.route.queryParams.subscribe(params => {
      this.selectedRole = params['role'] || '';
      if (this.selectedRole) {
        this.signupForm.patchValue({ role: this.selectedRole });
      }
    });

  }
  // selectRole(role: string) {
  //   console.log("Role sélectionné :", role); 
  //   this.signupForm.patchValue({ role: role });
  //   console.log("Valeurs du formulaire :", this.signupForm.value);
  // }
  
  


  // signup(){
  //   console.log(this.signupForm.value);
  //   // this.signupForm.value.role=window.location.pathname==='/signupAdmin' ? 'admin': 'user'
  //   this.userService.inscription(this.signupForm.value , this.file).subscribe((res)=>{
  //     console.log(res.message);
  //     if (res.message==='1') {
  //       this.toastr.error('email Existe', 'Signup');
  //     } else  if (res.message==='0') {   
  //       this.router.navigate(['/login'])
  //     }
  //   })

  // }

  signup() {
    // console.log(this.signupForm.value);
    this.userService.inscription(this.signupForm.value, this.file).subscribe(
      (res) => {
        console.log(res.message);
        if (res.message === "1") {
          this.toastr.error("Email Existe", "Signup");
        } else if (res.message === "0") {
          this.router.navigate(["/login-role"]);
        }
      },
      (error) => {
        if (error.status === 400) {
          this.toastr.error("Le numéro de l'enfant n'existe pas. Inscription refusée.", "Signup");
        } else {
          this.toastr.error("Erreur d'inscription", "Signup");
        }
      }
    );
  }
  

  onImageSelected(event: any ) {
    const file = event.target .files[0];
    // console.log(event.target .files);
    this.signupForm.patchValue({ img: file });
     this.signupForm.updateValueAndValidity();
    this.file=file
    const reader = new FileReader();
    reader.onload = () => {
    this.filePreview = reader.result as string
    };
    reader.readAsDataURL(file);
    }
  
 
  

  
  
}




