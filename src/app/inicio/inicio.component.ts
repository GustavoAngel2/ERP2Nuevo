import { Component, OnInit } from '@angular/core';
import { AuthService, currentUser } from '../auth.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css'], // Corrige 'styleUrl' a 'styleUrls'
})
export class InicioComponent implements OnInit {
  profile: currentUser = {
    Id: "",
    IdRol: "",
    NombreUsuario: "",
    NombrePersona: ""
  };

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.profile = this.authService.getCurrentUser();
  }
}
