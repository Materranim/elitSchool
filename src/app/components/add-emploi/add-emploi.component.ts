import { Component, OnInit } from '@angular/core';
import { EmploiService } from 'src/app/services/emploi.service';
import { NiveauService } from 'src/app/services/niveau.service';

@Component({
  selector: 'app-add-emploi',
  templateUrl: './add-emploi.component.html',
  styleUrls: ['./add-emploi.component.css']
})
export class AddEmploiComponent implements OnInit {
  emploi:any 
  imagePreview:any
  niveau:any=[]
  image:any 
  data:any ={}
  constructor( private emploiService: EmploiService, private niveauService:NiveauService) { }

  ngOnInit(): void {
    this.getAllNiveau()
  }

  addemploi(){
   
    this.emploiService.addemploi(this.data, this.emploi).subscribe((result) => {
      console.log(result.message); 
    })
  }
  getAllNiveau(){
        
    this.niveauService.getAllNiveau().subscribe((res)=>{
       this.niveau=res.niveau
       console.log(res.niveau);
       
      })
      } 
  onImageSelected(event: any) {
    const file = event.target .files[0];
    // console.log(event.target .files);
    this.emploi=file
   
    const reader = new FileReader();
    reader.onload = () => {
    this.imagePreview = reader.result as string
    };
    reader.readAsDataURL(file);
    }


 
  
}
