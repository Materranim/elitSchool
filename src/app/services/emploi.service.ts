import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EmploiService {
 emploiUrl = 'http://localhost:3000/emploi';

  constructor(private httpClient: HttpClient) { }


  addemploi(data:any , file:File){
    const formData = new FormData

    formData.append('emploi' , file)
    formData.append('annee' , data.annee)
    formData.append('Commentaire' , data.Commentaire)
    formData.append('idNiveau' , data.idNiveau)
    

   return this.httpClient.post<{message:any}>(this.emploiUrl , formData)
  }

  getEmploiByNiveau(idNiveau: string) {
    return this.httpClient.get<any>(`${this.emploiUrl}/niveau/${idNiveau}/emploi`);
  }
}
