import { Component, OnInit } from '@angular/core';
import { AuthService, currentUser } from '../auth.service';
import { UsusariosService } from '../data.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css'],
})
export class InicioComponent implements OnInit {
  imagenUrl: string | ArrayBuffer | null = null;
  profile: currentUser = {
    Id: "",
    IdRol: "",
    NombreUsuario: "",
    NombrePersona: ""
  };

  constructor(private authService: AuthService, private usuariosService: UsusariosService) {}

  ngOnInit() {
    this.profile = this.authService.getCurrentUser();
  }
}
