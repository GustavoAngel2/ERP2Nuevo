import { Component, OnInit } from '@angular/core';
import { AuthService, currentUser } from '../auth.service';
import { UsusariosService } from '../data.service';
import Swal from 'sweetalert2';

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
    Swal.fire('¡Hola!', 'Este es un mensaje de alerta simple', 'info');
    if (this.profile?.Id) {
      this.cargarImagenUsuario(+this.profile.Id); // Convierte a número si Id es string
    }
  }

  cargarImagenUsuario(id: number): void {
    this.usuariosService.obtenerImagenUsuario(id).subscribe(
      (response: Blob) => {
        const reader = new FileReader();
        reader.onload = () => this.imagenUrl = reader.result;
        reader.readAsDataURL(response);
      },
      error => {
        console.error("Error al cargar la imagen del usuario", error);
      }
    );
  }
}
