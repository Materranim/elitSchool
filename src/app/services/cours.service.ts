import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CoursService {

  coursUrl='http://localhost:3000/cours' 
  constructor( private httpClient : HttpClient) { }

  addCours(data:any , file:File , tpFile?: File){
    const formData = new FormData
    formData.append('file' , file)
    formData.append('duree' , data.duree)
    formData.append('nom' , data.nom)
    formData.append('desc', data.desc)
    // formData.append('teacherId', data.teacherId); // si tu as stocké l'ID du user connecté
    if (tpFile) {
      formData.append('tp', tpFile);
    }
    //  console.log(data);
   return this.httpClient.post<{message:any}>(this.coursUrl , formData) 
  }


 
    getAllCours(role: string, userId: string) {
      return this.httpClient.get<{data:any}>(`${this.coursUrl}?role=${role}&userId=${userId}`);
    }
}
