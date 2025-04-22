import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MatiereService {
  matiereUrl='http://localhost:3000/matieres'

  constructor( private httpClient : HttpClient) { }
 
  addMatieres(data:any){
    // console.log(data);
   return this.httpClient.post<{message:any}>(this.matiereUrl , data)
  }


  // getAllMatieres(){
  //   return this.httpClient.get<{ matiereNiveau1: any[], matiereNiveau2: any[], matiereNiveau3: any[]}>(this.matiereUrl)
  //   }
  getAllMatieres() {
    return this.httpClient.get<{
        success: boolean,
        matiereNiveau1: any[],
        matiereNiveau2: any[],
        matiereNiveau3: any[]
    }>(this.matiereUrl);
}

   getMatieresByID(id:any){
      return this.httpClient.get<{matiere:any}>(`${this.matiereUrl}/${id}`)
     }
     
   

     deletMatieres(id:any){
     return this.httpClient.delete<{message:any}>(`${this.matiereUrl}/${id}`)
    }

    updateMatieres(data:any){
      return this.httpClient.put<{message:any}>(this.matiereUrl , data)
    } 

    // affecterProfesseur(data: any) {
    //   return this.httpClient.post<{ message: string }>(this.matiereUrl,data);
    // }
    
    affecterProfesseur(data: any) {
      return this.httpClient.post<{ message: string }>(`${this.matiereUrl}/affecterProfesseur`, data);
    }
  
  
    getCoefficientOptions() {
      return this.httpClient.get<{ coefficients: number[] }>('http://localhost:3000/coefficient-options');
    }
    

   
}
