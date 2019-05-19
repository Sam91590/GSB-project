import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServicesComponent } from '../services/services.component';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.scss']
})
export class ConnexionComponent implements OnInit {
  estCache = true;
  user: string;
  mdp: string;
  lblMessage = 'erreur';

  constructor(private servicesComponent: ServicesComponent, private router: Router) {

  }

  Valider(): void {
    this.servicesComponent.connexion(this.user, this.mdp)
    .subscribe(
      (data) => {this.servicesComponent.visiteur = data; this.router.navigate(['accueil']); },
      (error) => { this.estCache = false ; }
      );
  }

  ngOnInit() {
  }

}
