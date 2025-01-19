import { Component, OnInit } from '@angular/core';
import { AuthService, currentUser } from '../auth/auth.service';
import { UsusariosService } from '../../core/services/data.service';
import { Router } from '@angular/router';

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

  modules = [
    {
      name: 'Sistema',
      items: [
        { path: '/personas', name: 'Personas' },
        { path: '/usuarios', name: 'Usuarios' },
        { path: '/roles', name: 'Roles' },
        { path: '/permisos', name: 'Permisos' }
      ]
    },
    {
      name: 'Ventas',
      items: [
        { path: '/compras', name: 'Compras' },
        { path: '/movimientos', name: 'Movimientos' },
        { path: '/reportes', name: 'Reportes' },
        { path: '/articulos', name: 'Artículos' }
      ]
    },
    {
      name: 'Administración',
      items: [
        { path: '/ajustes', name: 'Ajustes' },
        { path: '/bancos', name: 'Bancos' },
        { path: '/recetas', name: 'Recetas' },
        { path: '/entradas', name: 'Entradas' }
      ]
    }
  ];

  constructor(private authService: AuthService, private usuariosService: UsusariosService, private router:Router) { }

  ngOnInit() {
    this.profile = this.authService.getCurrentUser();
  }

  navigateTo(path: string): void {
    this.router.navigate([path]);
  }
}
