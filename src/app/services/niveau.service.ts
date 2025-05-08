import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NiveauService {
  serviceUrl='http://localhost:3000/niveau'             

  constructor(private httpClient : HttpClient) { }

  addNiveau(data:any){
   return this.httpClient.post<{message:any}>(this.serviceUrl , data)
  }    
 
  getAllNiveau(){
    return this.httpClient.get<{niveau:any}>(this.serviceUrl)
    } 
   
    
}
