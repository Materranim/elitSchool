import { Component, OnInit } from '@angular/core';
import { CoursService } from 'src/app/services/cours.service';
import { jwtDecode } from 'jwt-decode';
import { ClasseService } from 'src/app/services/classe.service';

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
classes: any[] = [];
  constructor( private courService:CoursService  ,private classeService: ClasseService) { }

  ngOnInit(): void { 
    let token = localStorage.getItem('connectedUser');
    if (token) {
      let decodedToken = jwtDecode<any>(token);
      console.log("Token décodé :", decodedToken); 

      let teacherId = decodedToken?.user?._id;
  
      this.classeService.getClassesByTeacher(teacherId).subscribe((res) => {
        this.classes = res.data;
        console.log('classe', this.classes);
        
      });
    }
  }
 

addCours() {
  // Récupérer le token et décoder l'ID du professeur
  let token = localStorage.getItem('connectedUser');
  if (token) {
    let decodedToken = jwtDecode<any>(token);
    let teacherId = decodedToken?.user?._id;  // Récupérer l'ID du professeur du token
    
    // Ajouter l'ID du professeur dans l'objet cours
    this.cour.teacherId = teacherId;
    // console.log('id', teacherId);

    // Maintenant, envoyez les données du cours avec l'ID du professeur au backend
    this.courService.addCours(this.cour, this.file, this.tpFile).subscribe((result) => {
      console.log(result.message);
    });
  }
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