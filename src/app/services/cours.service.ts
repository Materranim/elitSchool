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
    formData.append('teacherId', data.teacherId); // si tu as stocké l'ID du user connecté
    formData.append('idClasse', data.idClasse);
    if (tpFile) {
      formData.append('tp', tpFile);
    }
    //  console.log(data);
   return this.httpClient.post<{message:any}>(this.coursUrl , formData) 
  }

  
   // Récupérer les cours par TeacherId
   getCoursByTeacherId(teacherId: string) {
    return this.httpClient.get(`${this.coursUrl}/teacher/${teacherId}`);
  }
  
    // Récupérer les cours par TeacherId
    getCoursByStudentId(studentId: string) {
      return this.httpClient.get(`${this.coursUrl}/student/${studentId}`);
    }
 

   

     
}

