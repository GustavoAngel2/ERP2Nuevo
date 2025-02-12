import { Component, OnInit } from '@angular/core';
import { AuthService, currentUser } from '../auth/auth.service';
import { UsusariosService } from '../../core/services/data.service';
import { Router } from '@angular/router';
import { ERP } from '../../erp-settings';

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

  test:string = 'lds';
  modules:any;

  constructor(
    private authService: AuthService,
    private usuariosService: UsusariosService,
    private router:Router,
    private erp:ERP
  ) {

  }

  ngOnInit() {
    this.profile = this.authService.getCurrentUser();
    this.modules = this.erp.modules
  }

  navigateTo(path: string): void {
    this.router.navigate([path]);
  }
}
