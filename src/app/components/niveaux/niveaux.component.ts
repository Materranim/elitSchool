import { Component, OnInit } from '@angular/core';
import { NiveauService } from 'src/app/services/niveau.service';

@Component({
  selector: 'app-niveaux',
  templateUrl: './niveaux.component.html',
  styleUrls: ['./niveaux.component.css']
})
export class NiveauxComponent implements OnInit {
  niveau:any ={}

  constructor(  private niveauService:NiveauService) { }

  ngOnInit(): void {
  }

  addNiveau(){
   
this.niveauService.addNiveau(this.niveau).subscribe((result)=>{
console.log(result.message); 

})

  }
  
}
