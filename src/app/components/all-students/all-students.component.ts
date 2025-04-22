import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ClasseService } from 'src/app/services/classe.service';
import { UsersService } from 'src/app/services/users.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-all-students',
  templateUrl: './all-students.component.html',
  styleUrls: ['./all-students.component.css']
})
export class AllStudentsComponent implements OnInit {

  // students:any=[]
  students7: any[] = [];
  students8: any[] = [];
  students9: any[] = [];
  classes:any= []
  niveau:any
  nom:any
  nombreMaxEtudiants:any
  selectedClasse: string = "";
  id:any

  constructor(private usersService:UsersService ,private classeService: ClasseService ,private toastr: ToastrService,  private router: Router) { }

  ngOnInit(): void {
    this.getAllStudent()
    this.getAllClasses()
  }


//   getAllStudent(){
//     this.usersService.getAllProfessor().subscribe((res)=>{
//        this.students=res.data
//       })

// }

getAllStudent() {
  this.usersService.getStudentsByClass().subscribe((res) => {
    this.students7 = res.students7;
    this.students8 = res.students8;
    this.students9 = res.students9; 
  });
}

getAllClasses(){
  this.classeService.getAllClasses().subscribe((res)=>{
     this.classes=res.data
    }) 
  }

 
  goToAffectationPage(id: string) {
    this.router.navigate(['/affectation-student',id]);
}
  

deletStudent(id:any){
        Swal.fire({
           title: "Êtes-vous sûr ?",
           text:"Vous ne pourrez pas annuler cette action !",
           icon: "warning",
           showCancelButton: true,
           confirmButtonColor: "#3085d6",
           cancelButtonColor: "#d33",
           confirmButtonText: "Oui, supprimer !",
            cancelButtonText: "Annuler"
         }).then((result) => { 
           if (result.isConfirmed) {
         this.usersService.deletStudent(id).subscribe((result)=>{
           this.getAllStudent()
         })
             Swal.fire({
               title: "Supprimé !",
               text: "L'élève a été supprimé avec succès.",
               icon: "success"
             });
           }
         });
       
       }


}
