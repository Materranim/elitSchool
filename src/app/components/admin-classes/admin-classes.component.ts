import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClasseService } from 'src/app/services/classe.service';
import { NiveauService } from 'src/app/services/niveau.service';

@Component({
  selector: 'app-admin-classes',
  templateUrl: './admin-classes.component.html',
  styleUrls: ['./admin-classes.component.css']
})
export class AdminClassesComponent implements OnInit {
  classe: any = {};
  id: any;
  title = 'ajoute classe';
  classes: any[] = [];
  niveau: any[] = [];
  filteredLetters: string[] = [];
  nomClasse: string[] = [];

  constructor(
    private router: Router,
    private classeService: ClasseService,
    private activatedRoute: ActivatedRoute,
    private niveauService: NiveauService
  ) {}

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    console.log(this.id);

    this.getAllNiveau();
    this.getNomClasse();
    this.getAllClasses();

    if (this.id) {
      this.title = 'Modifier ';
      this.getClassesByID();
    }
  }

  getAllClasses() {
    this.classeService.getAllClasses().subscribe((res) => {
      this.classes = res.data;
      this.updateFilteredLetters();
    });
  }

  addEditNiveau() {
    if (this.id) {
      this.classeService.updateClasses(this.classe).subscribe((res) => {
        this.router.navigate(['/tab-classe']);
      });
    } else {
      this.classeService.addClasse(this.classe).subscribe((result) => {
        this.router.navigate(['/tab-classe']);
      });
    }
  }

  getClassesByID() {
    this.classeService.getClassesByID(this.id).subscribe((res) => {
      this.classe = res.classe;
      console.log(this.classe);
      
    });
  }

  getAllNiveau() {
    this.niveauService.getAllNiveau().subscribe((res) => {
      this.niveau = res.niveau;
    });
  }

  getNomClasse() {
    this.classeService.getNomClasse().subscribe((res) => {
      this.nomClasse = res.nomClasse;
      this.updateFilteredLetters();
    });
  }

  onLevelChange() {
    this.updateFilteredLetters();
    this.classe.nom = '';
  }

  updateFilteredLetters() {
    if (this.classe.idNiveau) {
      const classesDuNiveau = this.classes.filter(
        (c: any) => c.idNiveau === this.classe.idNiveau
      );

      const lettresUtilisées = classesDuNiveau.map((c: any) => c.nom);

      this.filteredLetters = this.nomClasse.filter(
        (letter) => !lettresUtilisées.includes(letter)
      );
    } else {
      this.filteredLetters = this.nomClasse;
    }
  }

  onLetterSelect(event: Event) {
    const selectedLetter = (event.target as HTMLSelectElement).value;
    this.classe.nom = selectedLetter;
  }

  getNomClasseAffiche(): string {
    const niveauTrouvé = this.niveau.find((n: any) => n._id === this.classe.idNiveau);
    if (niveauTrouvé && this.classe.nom) {
      return `${niveauTrouvé.name} ${this.classe.nom}`;
    }
    return '';
  }
}
