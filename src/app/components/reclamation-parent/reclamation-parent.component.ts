import { Component, OnInit } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { ReclamationService } from 'src/app/services/reclamation.service';

@Component({
  selector: 'app-reclamation-parent',
  templateUrl: './reclamation-parent.component.html',
  styleUrls: ['./reclamation-parent.component.css']
})
export class ReclamationParentComponent implements OnInit {
  reclamation:any ={}

  constructor( private reclamationService:ReclamationService) { }

  ngOnInit(): void {
   
  }


  addReclamation(){
   
    this.reclamationService.addReclamation(this.reclamation).subscribe((result)=>{
    console.log(result.message); 
    
    })
    
      }
}
