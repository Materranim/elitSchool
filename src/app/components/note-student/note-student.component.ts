import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { jwtDecode, JwtPayload } from 'jwt-decode';
import { NoteService } from 'src/app/services/note.service';
interface CustomJwtPayload extends JwtPayload {
  user?:{
    _id:string;
    firstName:string;
    LastName:string;
    email:string;
    tel:string;
    createdAt:string;
    updatedAt:string
    role:string
  };
}
@Component({
  selector: 'app-note-student',
  templateUrl: './note-student.component.html',
  styleUrls: ['./note-student.component.css']
})
export class NoteStudentComponent implements OnInit {
id:any
connectedUser:any
selectedMatiereId: string = '';
matiereId: any;
matiereName = '';

note:any ={}
  constructor( private activateRoute:ActivatedRoute , private noteService:NoteService ,   private router: Router
  ) { }

  ngOnInit(): void {
    this.id=this.activateRoute.snapshot.paramMap.get("id")
    console.log('Student ID:', this.id);
    this.matiereId = this.activateRoute.snapshot.paramMap.get("matiereId");

    this.loadConnectedProf()

  }

//  loadConnectedProf(): void {
//       const token = localStorage.getItem('connectedUser');
//       if (token) {
//         const decoded = jwtDecode<CustomJwtPayload>(token);
//         if (decoded.user) {
//           this.connectedUser = decoded.user;
//           console.log('token',decoded);
  
//         }
  
//       }
//     }


loadConnectedProf(): void {
  const token = localStorage.getItem('connectedUser');
  if (token) {
    const decoded = jwtDecode<CustomJwtPayload>(token);
    if (decoded.user) {
      this.connectedUser = decoded.user;

      // Chercher la matière selon l'ID passé dans l'URL
      const matiere = this.connectedUser.refMatieres.find(
        (m: any) => m._id === this.matiereId
      );

      if (matiere) {
        this.selectedMatiereId = matiere._id;
        this.matiereName = matiere.name;
      }
    }
  }
}

    addNote() {
      this.note.studentId = this.id;
      this.note.matieresId = this.selectedMatiereId;
      this.note.teacherId = this.connectedUser._id;

      this.noteService.addNote(this.note).subscribe((result) => {
        console.log(result.message);
        this.router.navigate(['/profStudent']); 

      });
    }
    
}
