import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  userUrl='http://localhost:3000/api'

  constructor(private httpClient:HttpClient) { }



  inscription(user: any, file: File) {
    const formData = new FormData();
    formData.append('role', user.role);
    formData.append('firstName', user.firstName);
    formData.append('lastName', user.lastName);
    formData.append('email', user.email);
    formData.append('adresse', user.adresse);
    formData.append('phone', user.phone);
    formData.append('password', user.password);
  
    if (user.role === 'teacher') {
      formData.append('cv', file);
      formData.append('specialite', user.specialite);
      formData.append('status',user.status );
    } else if (user.role === 'student') {
      formData.append('photoProfil', file);
      formData.append('classe', user.classe);
    } else if (user.role === 'parent') {
      formData.append('phoneEnfant', user.phoneEnfant);
    }
  
    return this.httpClient.post<{ message: any }>(this.userUrl + '/signup', formData);
  }
  
 
      login(user:any){
        return this.httpClient.post<{message:any , user:any}>(this. userUrl+'/login',user)
          }



   getAllProfessor(){
            return this.httpClient.get<{data:any}>(this.userUrl+'/Professor')
            }


   getProfessorByID(id:any){
              return this.httpClient.get<{professor:any}>(`${this.userUrl}/Professor/${id}`)
            }

    confirmTeacher(id: string) {
              return this.httpClient.put<{ message: any }>(`${this.userUrl}/Professor/confirm/${id}`, {});
            }
      
            deletProfessor(id:any){
     return this.httpClient.delete<{message:any}>(`${this.userUrl}/Professor/${id}`)
            }
            
            // getAllStudent(){
            //   return this.httpClient.get<{data:any}>(this.userUrl+'/Student')
            //   }
            getStudentsByClass() {
              return this.httpClient.get<{ students7: any[], students8: any[], students9: any[] }>(
                this.userUrl + '/Student/by-class'
              );
            }
         
            getAllStudent(){
              return this.httpClient.get<{data:any}>(this.userUrl+'/allStudent')
              }
            getAllProfessorsWithDetails() {
              return this.httpClient.get<{ data: any }>(this.userUrl + '/Professor_with_populate');
            }
         
            getStudentByID(id:any){
              return this.httpClient.get<{student:any}>(`${this.userUrl}/student/${id}`)
            }
           
              // Méthode pour affecter un étudiant à une classe
  affecterStudent(data: any) {
    return this.httpClient.post<{ message: string }>(`${this.userUrl}/affecter`, data);
  }


  deletStudent(id:any){
    return this.httpClient.delete<{message:any}>(`${this.userUrl}/student/${id}`)
           }
            
}
 