import { ServicesComponent } from './../services/services.component';
import { Component, OnInit } from '@angular/core';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-medecins',
  templateUrl: './medecins.component.html',
  styleUrls: ['./medecins.component.scss']
})
export class MedecinsComponent implements OnInit {
  nomMedecin: string;
  estCacheMenu = true;
  lesMedecins: any;
  medecin: any;
  afficherRapports = false;
  afficherMedecin = false;
  idMedecin: any;
  lesRapports: any;
  urlDomaine: string;
  http: any;
  afficherMessage = false;
  lblMessage = '';
  url: string;




  constructor(private servicesComponent: ServicesComponent) { }
  derniersRapports() {
    this.afficherRapports = true;
    this.afficherMedecin = false;
    this.servicesComponent.chargerRapports(this.medecin.id)
                                  .subscribe(
                                      (data) => {this.lesRapports = data;
                                         }
                                      , (error) => {}
                                              );
  }

  majMedecin(): void {
    this.afficherRapports = false;
    this.afficherMedecin = true;
    this.afficherMessage = false;

}
valider(): void {
  this.afficherMessage = true;
  this.afficherRapports = false;
  this.afficherMedecin = true;
  this.servicesComponent.majMedecin(this.medecin.id, this.medecin.adresse, this.medecin.tel, this.medecin.specialitecomplementaire)
                                  .subscribe(
                                      (data) => { this.lblMessage = 'Enregistrement effectué';
                                         }
                                      , (data) => {this.lblMessage = 'Enregistrement effectué'; }
                                              );
}

  charger(): void {
    this.servicesComponent.chargerMedecins(this.nomMedecin)
    .subscribe(
      (data) => {this.lesMedecins = data ; },
      (error) => {  }
      );
  }

  selectionner(med): void {
    this.medecin = med;
    this.estCacheMenu = false;
    this.nomMedecin = this.medecin.nom + ' ' + this.medecin.prenom + ' dep:' + this.medecin.departement;
    this.lesMedecins = null;

  }

  ngOnInit() {
  }

}
