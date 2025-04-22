import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClasseService } from 'src/app/services/classe.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-affectation-student',
  templateUrl: './affectation-student.component.html',
  styleUrls: ['./affectation-student.component.css']
})
export class AffectationStudentComponent implements OnInit {
  id:any
  student : any = {}
  data : any = {}
  classe:any= []
  sClasse: string = "";
  constructor( private activateRoute:ActivatedRoute , private usersService:UsersService  ,private classeService: ClasseService) { }

  ngOnInit(): void {
    this.id=this.activateRoute.snapshot.paramMap.get("id")
this.getStudentByID()
this. getAllStudent()
this.getAllClasses()
  }

  getStudentByID(){
    this.usersService.getStudentByID(this.id).subscribe((res)=>{
       this.student=res.student
      //  console.log(this.student);
       
     })
   }

   getAllStudent(){
    this.usersService.getAllStudent().subscribe((res)=>{
    this.data=res.data
    // console.log(this.data);
    
    })
      }


      getAllClasses(){
        this.classeService.getAllClasses().subscribe((res)=>{
         this.classe=res.data
          //  console.log(this.classe);
           
          }) 
           
         }

  // Méthode pour affecter l'étudiant à la classe
  affecterStudent() {
    const data = {
      studentId: this.id, // ID de l'étudiant récupéré depuis l'URL
      classeId: this.sClasse // ID de la classe sélectionnée
    };

    this.usersService.affecterStudent(data).subscribe(
      (res) => {
        console.log(res.message);
        alert('Affectation réussie!');
      },
      (err) => {
        console.error('Erreur d\'affectation :', err);
      }
    );
  }

         
 
}
