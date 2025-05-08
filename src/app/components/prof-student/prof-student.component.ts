import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode, JwtPayload } from 'jwt-decode';
import { NiveauService } from 'src/app/services/niveau.service';
import { NoteService } from 'src/app/services/note.service';
import { UsersService } from 'src/app/services/users.service';

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
    refClasses: Array<{ profId: string }> 

  };
}
@Component({
  selector: 'app-prof-student',
  templateUrl: './prof-student.component.html',
  styleUrls: ['./prof-student.component.css']
})
export class ProfStudentComponent implements OnInit {
  connectedUser:any
  studentsByClass: { [classId: string]: any[] } = {};
  classes:any
  niveaux: { [id: string]: string } = {};
  notes:any=[] 
  constructor( private usersService:UsersService ,  private niveauService: NiveauService ,  private router: Router , private noteService:NoteService) { }

  ngOnInit(): void {
    this.loadConnectedProf();
    this.loadNiveaux();
    this.getAllNote()
  }


loadConnectedProf(): void {
  const token = localStorage.getItem('connectedUser');
  if (token) {
    const decoded = jwtDecode<CustomJwtPayload>(token);
    if (decoded.user) {
      this.connectedUser = decoded.user;
             console.log('token',decoded); 

      this.classes = this.connectedUser.refClasses || [];

      // Récupérer les étudiants pour chaque classe
      this.classes.forEach((classe:any) => {
        this.studentsByClass[classe._id] = [];

        classe.IdStudents.forEach((studentId: string) => {
          this.usersService.getStudentByID(studentId).subscribe(
            (res: any) => {
              this.studentsByClass[classe._id].push(res.student);
            },
            (err: any) => {
              console.error('Erreur chargement étudiant', err);
            }
          );
        });
      });
    }
  }
}


loadNiveaux(): void {
  this.niveauService.getAllNiveau().subscribe(
    (res: any) => {
      res.niveau.forEach((niveau: any) => {
        this.niveaux[niveau._id] = niveau.name;
      });
    },
    (err) => {
      console.error('Erreur de chargement des niveaux', err);
    }
  );
}



getAllNote(){
        
  this.noteService.getAllNote().subscribe((res)=>{
     this.notes=res.note
     console.log( 'note',res.note);
     
    })
    }


    // getNoteForStudent(studentId: string): string {
    //   const noteTrouvee = this.notes.find((n: any) =>
    //     n.studentId === studentId &&
    //     n.teacherId === this.connectedUser._id
    //   );
    
    //   return noteTrouvee ? noteTrouvee.note : 'En cours';
    // }

    getNoteDetail(studentId: string, type: 'orale' | 'noteControle' | 'noteSynthese'): string {
      const note = this.notes.find((n: any) =>
        n.studentId === studentId && n.teacherId === this.connectedUser._id
      );
    
      if (note && note[type] !== undefined) {
        return note[type];
      }
    
      return 'En cours';
    }
    
    
    goToNotePage(studentId: string, matiereId: string) {
      this.router.navigate(['/note-student', studentId, matiereId]);
    }
    

// note(id: string) {
//   this.router.navigate(['/note-student',id]);
// }
    



}
