import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ClasseService {

  classeUrl='http://localhost:3000/classes'

  constructor( private httpClient : HttpClient) { }

 
  addClasse(data:any){
    // console.log(data);
   return this.httpClient.post<{message:any}>(this.classeUrl , data)
  }


  getAllClasses(){
    return this.httpClient.get<{data:any}>(this.classeUrl)
    }

 

    getClassesByID(id:any){
      return this.httpClient.get<{classe:any}>(`${this.classeUrl}/${id}`)
     }


     deletClasses(id:any){
     return this.httpClient.delete<{message:any}>(`${this.classeUrl}/${id}`)
    }

    updateClasses(data:any){
      return this.httpClient.put<{message:any}>(this.classeUrl , data)
    } 

   
    getNomClasse() {
      return this.httpClient.get<{ nomClasse: string[] }>('http://localhost:3000/nomClasse');
    }
  
    getClassesByTeacher(teacherId: string) {
      return this.httpClient.get<{data:any[]}>(`${this.classeUrl}/teacher/${teacherId}`);
    }
  
  
}
