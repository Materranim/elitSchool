import { Component, OnInit } from '@angular/core';
import { ReclamationService } from 'src/app/services/reclamation.service';

@Component({
  selector: 'app-tab-reclamation',
  templateUrl: './tab-reclamation.component.html',
  styleUrls: ['./tab-reclamation.component.css']
})
export class TabReclamationComponent implements OnInit {
  reclamation:any= []
  selectedReclamation: any = null;
  etatChoisi: string = '';
  descriptionTraitement: string = '';
  constructor( private reclamationService:ReclamationService) { }

  ngOnInit(): void {
    this.getAllReclamation()
  }


  getAllReclamation(){
    this.reclamationService.getAllReclamation().subscribe((res)=>{
       this.reclamation=res.data
       console.log('reclamation',this.reclamation);
       
      })
      
       
     }



     openModal(reclamation: any) {
      this.selectedReclamation = reclamation;
      this.etatChoisi = reclamation.etat || '';
      this.descriptionTraitement = '';
    }
    
    cancel() {
      this.selectedReclamation = null;
      this.etatChoisi = '';
      this.descriptionTraitement = '';
    }
    
    submitTraitement() {
      const updatedReclamation = {
        ...this.selectedReclamation,
        etat: this.etatChoisi,
        description: this.descriptionTraitement
      };
    
      this.reclamationService.updateReclamationEtat(updatedReclamation._id, updatedReclamation)
        .subscribe(() => {
          this.getAllReclamation();
          this.cancel();
        });
    }
}
