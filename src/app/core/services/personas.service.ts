import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { defaultApiResponse } from '../models/response.model';
import { AuthService } from '../../features/auth/auth.service';
import { InsertPersonasModel, UpdatePersonasModel } from '../models/personas.model';
import { ERP } from '../../erp-settings';


@Injectable({
  providedIn: "root",
})
export class PersonasService {
  //Se especifica la url base de la API

  constructor(private http: HttpClient,private authService: AuthService, private erp:ERP) {}

  getPersonas(): Observable<defaultApiResponse> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    console.log(this.http.get<defaultApiResponse>(`${this.erp.apiUrl}/Personas/Get`,{headers}))
    return this.http.get<defaultApiResponse>(`${this.erp.apiUrl}/Personas/Get`,{headers});
  }

  insertarPersona(PersonaData:InsertPersonasModel): Observable<defaultApiResponse> {
    const body = {
      nombre: PersonaData.Nombre,
      apPaterno: PersonaData.ApPaterno,
      apMaterno: PersonaData.ApMaterno,
      direccion: PersonaData.Direccion,
      usuario: PersonaData.Usuario
    };
    return this.http.post<defaultApiResponse>(`${this.erp.apiUrl}/Personas/Insert`, body);
  }

  deletePersonas(Id: number): Observable<any> {
    return this.http.put(`${this.erp.apiUrl}/Personas/Delete`, { Id });
  }

  updatePersonas(PersonaData: UpdatePersonasModel): Observable<defaultApiResponse> {
    const body = {
      id: PersonaData.Id,
      nombre: PersonaData.Nombre,
      apPaterno: PersonaData.ApPaterno,
      apMaterno: PersonaData.ApMaterno,
      direccion: PersonaData.Direccion,
      usuario: PersonaData.Usuario
    };

    return this.http.put<defaultApiResponse>(`${this.erp.apiUrl}/Personas/Update`, body);
  }
}
