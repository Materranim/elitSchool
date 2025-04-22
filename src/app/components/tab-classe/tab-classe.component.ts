import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClasseService } from 'src/app/services/classe.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tab-classe',
  templateUrl: './tab-classe.component.html',
  styleUrls: ['./tab-classe.component.css']
})
export class TabClasseComponent implements OnInit {

  classes:any= []

  constructor( private router:Router ,private classeService: ClasseService) { }

  ngOnInit(): void {
    this.getAllClasses()
  }

  // getAllClasses(){
  //  this.classeService.getAllClasses().subscribe((res)=>{
  //     this.classes=res.data
  //    }) 
      getAllClasses(){
   this.classeService.getAllClasses().subscribe((res)=>{
      this.classes=res.data
      console.log('a',res.data);
      
     }) 
      
    }

navigate(id:any){

      this.router.navigate(['/admin-classes/'+id])
        }



         
        deletClasse(id:any){
 
  
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
    this.classeService.deletClasses(id).subscribe((result)=>{
      this.getAllClasses()
    })
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success"
        });
      }
    });
  
  
  
  }
}
