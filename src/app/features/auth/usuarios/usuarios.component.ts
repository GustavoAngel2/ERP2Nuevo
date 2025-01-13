import { Component, OnInit } from '@angular/core';
import { PersonasService, UsusariosService } from '../../../core/services/data.service';
import { getUsuariosModel } from '../../../core/models/usuario.model'; // Ajusta la ruta según tu proyecto
import Swal from 'sweetalert2';


@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.css'
})
export class UsuariosComponent implements OnInit {
  usuarios:getUsuariosModel[] = [];
  loaded:boolean = false;

  constructor(private usuariosService: UsusariosService, private personasService:PersonasService) {}

  ngOnInit(): void {
    this.getData()
  }

  deleteUsuario(id:number, nombre:String){
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-outline-danger",
        cancelButton: "btn btn-outline-success"
      },
      buttonsStyling: true
    });
    swalWithBootstrapButtons.fire({
      title: 'Seguro que desea borrar al usuario ' + nombre + " de forma permanente?",
      text: "eso es mucho tiempo!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: 'Borrar <i class="bi bi-trash-fill"></i>',
      cancelButtonText: "Mantener ",
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.personasService.deletePersonas(id).subscribe({
          next: (response) => {
            console.log(response)
            if(response.StatusCode == 200){
              swalWithBootstrapButtons.fire({
                title: "Eliminado!",
                text: "Se ha borrado a " + nombre,
                icon: "success"
              });
            } else {
              swalWithBootstrapButtons.fire({
                title: "Ha ocurrido un error!",
                text: response.response.data,
                icon: "error"
              });
            }
            this.getData();
          },
          error: (error) => {
            console.error('Hubo un error al eliminar el almacén', error);
          }
        });

      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire({
          title: "Acción cancelada",
          text: "no se borró a " + nombre,
          icon: "error"
        });
      }
    });
  }

  getData(){
    this.usuariosService.getUsuarios().subscribe({
      next: (response) => {
        this.loaded = true
        console.log('Respuesta del servidor:', response);
        this.usuarios = response.Response.data; // Asigna los datos al atributo 'data' de dataSource
      },
      error: (err) => {
        console.error('Error al obtener usuarios:', err); // Manejo de errores
      }
    });
  }
}
