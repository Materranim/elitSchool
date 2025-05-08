import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ReclamationService {
  reclamationUrl='http://localhost:3000/reclamation'             

  constructor(private httpClient : HttpClient) { }

  addReclamation(data:any){
    return this.httpClient.post<{message:any}>(this.reclamationUrl , data)
}


   getAllReclamation(){
    return this.httpClient.get<{data:any}>(this.reclamationUrl)
    }

    updateReclamationEtat(id: string, data: any) {
      return this.httpClient.put(`${this.reclamationUrl}/reclamation/${id}`, data);
    }
    
}
