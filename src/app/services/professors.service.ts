import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProfessorsService {

  ProfessorUrl='http://localhost:3000/Professors'


  constructor(private httpClient : HttpClient) { }



  // getAllProfessor(){
  //   return this.httpClient.get<{data:any}>(this.ProfessorUrl)
  //   }

    confirmTeacher(id: string) {
      return this.httpClient.put<{ message: string }>(`${this.ProfessorUrl}/confirm/${id}`, {});
    }
    

}
