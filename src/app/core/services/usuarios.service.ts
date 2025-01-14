import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { defaultApiResponse } from '../models/response.model';
import { AuthService } from '../../features/auth/auth.service';
import { updateUsuarioModel } from '../models/usuario.model';
import { ERP } from '../../erp-settings';

@Injectable({
  providedIn: "root",
})
export class UsusariosService {
  //Se especifica la url base de la API

  constructor(private http: HttpClient,private authService: AuthService, private erp:ERP) {}

  getUsuarios(): Observable<defaultApiResponse> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<defaultApiResponse>(`${this.erp.apiUrl}/Usuarios/Get`,{headers});
  }
  obtenerImagenUsuario(id: number): Observable<Blob> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    // Endpoint de la API para obtener la imagen del usuario
    return this.http.get(`${this.erp.apiUrl}/Imagen/VerImagen/${id}`, { headers, responseType: 'blob' });
  }
  // insertarPersona(PersonaData: {
  //   nombre: string;
  //   ApPaterno: string;
  //   ApMaterno: string;
  //   direccion: string;
  //   usuario: number;
  // }): Observable<defaultApiResponse> {
  //   const body = {
  //     nombre: PersonaData.nombre,
  //     ApPaterno: PersonaData.ApPaterno,
  //     ApMaterno: PersonaData.ApMaterno,
  //     direccion: PersonaData.direccion,
  //     usuario: PersonaData.usuario,
  //     Direccion: PersonaData.direccion,
  //     Usuario: PersonaData.usuario,
  //   };
  //   return this.http.post<defaultApiResponse>(`${this.erp.apiUrl}/Personas/Insert`, body);
  // }

  // deleteUsuario(Id: number): Observable<any> {
  //   return this.http.put(`${this.erp.apiUrl}/Usuarios/Delete`, { Id });
  // }

  updateUsuario(UsuarioData: updateUsuarioModel): Observable<defaultApiResponse> {
    const body = {
      id: UsuarioData.id,
      usuario: UsuarioData.usuario,
      contrasena: UsuarioData.contrasena
    };

    return this.http.put<defaultApiResponse>(`${this.erp.apiUrl}/Usuarios/Update`, body);
  }
}
