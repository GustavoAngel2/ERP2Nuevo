import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { UsusariosService } from '../data.service'; // Ajusta la ruta según tu proyecto
import { getUsuariosModel } from '../data-models/usuario.model'; // Ajusta la ruta según tu proyecto
import Swal from 'sweetalert2';

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
        this.dataSource.data = response.Response.data; // Asigna los datos al atributo 'data' de dataSource
      },
      error: (err) => {
        console.error('Error al obtener usuarios:', err); // Manejo de errores
      }
    });
  }

  deleteUsuario(id:number){
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-outline-success",
        cancelButton: "btn btn-outline-danger"
      },
      buttonsStyling: true
    });
    swalWithBootstrapButtons.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        swalWithBootstrapButtons.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success"
        });
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire({
          title: "Cancelled",
          text: "Your imaginary file is safe :)",
          icon: "error"
        });
      }
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
