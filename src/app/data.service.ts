import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { defaultApiResponse } from './data-models/response.model';
import { AuthService } from './auth.service';


@Injectable({
  providedIn: "root",
})
export class PersonasService {
  //Se especifica la url base de la API
  private apiUrl = "http://localhost:5020/api";
  constructor(private http: HttpClient,private authService: AuthService) {}

  getPersonas(): Observable<defaultApiResponse> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<defaultApiResponse>(`${this.apiUrl}/Personas/Get`,{headers});
  }
  insertarPersona(PersonaData: {
    nombre: string;
    ApPaterno: string;
    ApMaterno: string;
    direccion: string;
    usuario: number;
  }): Observable<defaultApiResponse> {
    const body = {
      nombre: PersonaData.nombre,
      ApPaterno: PersonaData.ApPaterno,
      ApMaterno: PersonaData.ApMaterno,
      direccion: PersonaData.direccion,
      usuario: PersonaData.usuario,
      Direccion: PersonaData.direccion,
      Usuario: PersonaData.usuario,
    };
    return this.http.post<defaultApiResponse>(`${this.apiUrl}/Personas/Insert`, body);
  }
  deletePersonas(Id: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/Personas/Delete`, { Id });
  }
  // updatePersonas(PersonaData: UpdatePersonas): Observable<defaultApiResponse> {
  //   const body = {
  //     id: PersonaData.Id,
  //     nombre: PersonaData.Nombre,
  //     apPaterno: PersonaData.ApPaterno,
  //     apMaterno: PersonaData.ApMaterno,
  //     direccion: PersonaData.Direccion,
  //     usuario: PersonaData.Usuario
  //   };
  //   console.log("Enviando solicitud con el siguiente cuerpo:", body);
  //   return this.http.put<defaultApiResponse>(`${this.apiUrl}/Personas/Update`, body);
  // }
}