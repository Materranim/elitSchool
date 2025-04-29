import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NiveauService } from 'src/app/services/niveau.service';
import { UsersService } from 'src/app/services/users.service';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';


@Component({
  selector: 'app-teachers-list',
  templateUrl: './teachers-list.component.html',
  styleUrls: ['./teachers-list.component.css']
})
export class TeachersListComponent implements OnInit {
  professor:any= []
  niveaux: any[] = []; 
  constructor(private usersService:UsersService , private router:Router , private niveauService:NiveauService) { }

  ngOnInit(): void {

    this.niveauService.getAllNiveau().subscribe((res) => {
      this.niveaux = res.niveau;
      // console.log('niveaux', this.niveaux);
    });

    this.usersService.getAllProfessorsWithDetails().subscribe((response) => {
      this.professor = response.data;  // Stocke les enseignants avec les détails
      // console.log('prof', this.professor);
      
    });

   
  }
  


  getNiveauName(idNiveau: string): string {
    const niveau = this.niveaux.find(n => n._id === idNiveau);
    // console.log(niveau);
   return niveau ? niveau.name : '';
    
  }
  

  downloadPDF() {
    const DATA = document.getElementById('pdfTable');
    
    if (DATA) {
      html2canvas(DATA).then(canvas => {
        const imgWidth = 208;
        const imgHeight = canvas.height * imgWidth / canvas.width;
        const contentDataURL = canvas.toDataURL('image/png');
        let pdf = new jsPDF('p', 'mm', 'a4');
        pdf.addImage(contentDataURL, 'PNG', 0, 0, imgWidth, imgHeight);
        pdf.save('professors-list.pdf');
      });
    }
  }
  

}
