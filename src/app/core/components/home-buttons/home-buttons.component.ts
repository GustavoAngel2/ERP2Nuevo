import { Component,Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'home-buttons',
  templateUrl: './home-buttons.component.html',
  styleUrl: './home-buttons.component.css'
})
export class HomeButtonsComponent {



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
        { path: '/compras', name: 'Ordenes de compras' },
        { path: '/movimientos', name: 'Movimientos' },
        { path: '/articulos', name: 'Artículos' }
      ]
    },
    {
      name: 'Administración',
      items:[
        { path: '/bancos', name: 'Bancos' },
        { path: '/recetas', name: 'Recetas' },
        { path: '/reportes', name: 'Reportes' },
        { path: '/entradas', name: 'Entradas' }
      ]
    }
  ];

  constructor(private router:Router){}

  navigateTo(path: string): void {
    this.router.navigate([path]);
  }
}
