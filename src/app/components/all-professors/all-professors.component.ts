import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProfessorsService } from 'src/app/services/professors.service';
import { UsersService } from 'src/app/services/users.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-all-professors',
  templateUrl: './all-professors.component.html',
  styleUrls: ['./all-professors.component.css']
})
export class AllProfessorsComponent implements OnInit {
  professors:any= []
  constructor(private usersService:UsersService , private router: Router) { }

  ngOnInit(): void {
    this.getAllProfessor()
  }

 
  
  
  
  getAllProfessor(){
   this.usersService.getAllProfessor().subscribe((res)=>{
      this.professors=res.data
     })
     
      
    }
    confirmTeacher(id: string) {
      this.usersService.confirmTeacher(id).subscribe((res) => {
        console.log(res.message);
        this.getAllProfessor(); // Rafraîchir la liste après confirmation
      });
    }
 
    deletProfessor(id:any){
     Swal.fire({
        title: "Êtes-vous sûr ?",
        text: "Vous ne pourrez pas annuler cette action !",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Oui, supprimer !",
        cancelButtonText: "Annuler"
      }).then((result) => { 
        if (result.isConfirmed) {
      this.usersService.deletProfessor(id).subscribe((result)=>{
        this.getAllProfessor()
      })
          Swal.fire({
            title: "Supprimé !",
            text: "L'Enseignant a été supprimé avec succès.",
            icon: "success"
          });
        }
      });
    
    
    
    }



    goToAffectationPage(id: string) {
      this.router.navigate(['/affectation-teacher', id]);
  }
  

  editProfessor(id: string) {
    this.router.navigate([`/affectation-teacher/${id}/edit`]);  //  Navigate to Edit Mode
  }
}
