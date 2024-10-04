import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { UsusariosService } from '../data.service'; // Ajusta la ruta según tu proyecto
import { getUsuariosModel } from '../data-models/usuario.model'; // Ajusta la ruta según tu proyecto

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.css'
})
export class UsuariosComponent implements OnInit {
  dataSource = new MatTableDataSource<getUsuariosModel>([]);

  constructor(private usuariosService: UsusariosService) {}

  ngOnInit(): void {
    this.usuariosService.getUsuarios().subscribe({
      next: (response) => {
        console.log('Respuesta del servidor:', response); 
        if (response && Array.isArray(response) && response.length > 0) {
          this.dataSource.data = response; // Asigna los datos al atributo 'data' de dataSource
        } else {
          console.log('No contiene datos');
        }
      },
      error: (err) => {
        console.error('Error al obtener usuarios:', err); // Manejo de errores
      }
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
