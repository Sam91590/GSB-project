import { MedecinsComponent } from './../medecins/medecins.component';
import { Component, OnInit } from '@angular/core';
import { ServicesComponent } from './../services/services.component';

@Component({
  selector: 'app-visites',
  templateUrl: './visites.component.html',
  styleUrls: ['./visites.component.scss']
})
export class VisitesComponent implements OnInit {
  gestionMajRapport = false;
  afficherRapport = false;
  gestionAjoutRapport = false;
  dateVisite: Date;
  lesRapports: any;
  titre = '';
  date: Date;
  idVisiteur: any;
  test: string;
  nomMedecin: any;
  lesMedecins: any;
  rapport: any;
  medecin: any;
  motif: string;
  bilan: string;
  dateNouveauRapport: Date;
  nomMedicament: string;
  lesMedicaments: any;
  qtes: Array<number> = [1, 2, 3, 4, 5];
  qteSelect: string;
  medicamentsSelect: any = new Array();
  messageEnregistrement: string;
  typeMessage: string;
  medicament: any;
  idMed: string;

  constructor(private servicesComponent: ServicesComponent) { }

  modifierRapport() {
    this.gestionMajRapport = true;
    this.gestionAjoutRapport = false;
  }

  initNouveauRapport() {
        this.nomMedecin = '';
}
  ajouterRapport() {
    this.initNouveauRapport();
    this.gestionAjoutRapport = true;
    this.gestionMajRapport = false;
  }

  chargerMedecins() {
    this.servicesComponent.chargerMedecins(this.nomMedecin)
    .subscribe(
      (data) => {this.lesMedecins = data ; },
      (error) => {  }
      );
  }

  chargerVisites(): void  {
    this.titre = 'Medecins visité(s) à ce jour';
    console.log(this.servicesComponent.visiteur.id);
    console.log(this.dateVisite);
    this.servicesComponent.chargerRapportsAuneDate(this.servicesComponent.visiteur.id, this.dateVisite).subscribe(
      (data) => {this.lesRapports = data ; } ,
      (error) => {  }
      );

  }

  selectionner(rapport) {
    this.rapport = rapport;
    this.afficherRapport = true;
    console.log(this.rapport);

  }

  valider() {
    this.servicesComponent.majRapport(this.rapport.idRapport, this.rapport.motif , this.rapport.bilan)
    .subscribe(
      (data) => { this.test = 'Enregistrement effectué'; },
      (error) => { this.test = 'Enregistremennt effectué' ; }
              );
    console.log(this.rapport.idRapport);
    console.log(this.rapport.motif);
    console.log(this.rapport.bilan);
  }
  selectionnerMedecin(medecin) {
    this.medecin = medecin;
    this.nomMedecin = this.medecin.nom + ' ' + this.medecin.prenom + ' dep:' + this.medecin.departement;
    this.lesMedecins = null;
  }

  enregistrer() {
    this.servicesComponent.enregistrerRapport(this.servicesComponent.visiteur.id,
       this.medecin.id, this.motif, this.dateNouveauRapport, this.bilan, this.medicamentsSelect).subscribe(
      (data) => { this.messageEnregistrement = 'Enregistrement effectué'; },
      (error) => { this.test = 'Enregistremennt effectué' ; });
  }
  ajouter() {
    this.medicamentsSelect.push({nom : this.medicament.nomCommercial, qte : this.qteSelect});
    this.nomMedicament = '';

  }

  retirer() {
    this.medicamentsSelect.pop();
  }

  chargerMedicaments() {
    this.servicesComponent.chargerMedicaments(this.nomMedicament)
    .subscribe(
      (data) => {this.lesMedicaments = data ; },
      (error) => {  }
      );
   }

  choisirMedicament(medicament) {
    this.medicament = medicament;
    this.nomMedicament = this.medicament.nomCommercial;
    this.lesMedicaments = null;

  }
  ngOnInit() {
  }

}
