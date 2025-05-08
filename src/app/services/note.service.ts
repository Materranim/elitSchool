import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NoteService {
 noteUrl='http://localhost:3000/note'
  constructor(private httpClient : HttpClient) { }


  addNote(data:any){
    return this.httpClient.post<{message:any}>(this.noteUrl , data)
   }

   getAllNote(){
    return this.httpClient.get<{note:any}>(this.noteUrl)
    }
  
    //pour récupérer les notes d'un étudiant avec matiere
     getNotesByStudentId(studentId: string) {
      return this.httpClient.get<any[]>(`${this.noteUrl}/student/${studentId}`);
    }
}
