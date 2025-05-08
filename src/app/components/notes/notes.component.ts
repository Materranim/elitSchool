import { Component, OnInit } from '@angular/core';
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
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {
  connectedUser:any
  notes: any[] = [];

  constructor( private noteService: NoteService) { }

  ngOnInit(): void {
    this.loadConnectedStudent()
    
  }


  
    loadConnectedStudent(): void {
      const token = localStorage.getItem('connectedUser');
      if (token) {
        const decoded = jwtDecode<CustomJwtPayload>(token);
        if (decoded.user) {
          this.connectedUser = decoded.user;
          console.log('token',decoded);
          this.loadNotes(this.connectedUser._id);

  
        }
  
      }
    }


    loadNotes(studentId: string): void {
      this.noteService.getNotesByStudentId(studentId).subscribe(
        (res) => {
          this.notes = res;
          console.log('Notes:', this.notes);
        },
        (err) => {
          console.error('Erreur chargement notes', err);
        }
      );
    }

}
