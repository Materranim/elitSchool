import { Component, OnInit } from '@angular/core';
import { CoursService } from 'src/app/services/cours.service';

@Component({
  selector: 'app-add-cours',
  templateUrl: './add-cours.component.html',
  styleUrls: ['./add-cours.component.css']
})
export class AddCoursComponent implements OnInit {
  cour:any ={}
  file:any 
  filePreview:any
  hasTP: boolean = false;
tpFile: any;
tpFileName: string = '';
courFileName: string = '';

  constructor( private courService:CoursService ) { }

  ngOnInit(): void { 
  }
 


  addCours(){
     // récupère l’ID du prof connecté
    // this.cour.teacherId = localStorage.getItem("userId"); 
    
   

    this.courService.addCours(this.cour , this.file , this.tpFile).subscribe((result)=>{
    console.log(result.message); 
    
    })
}

onTpSelected(event: any) {
  this.tpFile = event.target.files[0];
  this.tpFileName = this.tpFile.name;
}

onImageSelected(event: any) {
  const file = event.target .files[0];
  // console.log(event.target .files);
  this.file=file
  this.courFileName = file.name; 

  const reader = new FileReader();
  reader.onload = () => {
  this.filePreview = reader.result as string
  };
  reader.readAsDataURL(file);
  }


}