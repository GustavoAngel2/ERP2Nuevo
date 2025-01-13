import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { defaultApiResponse } from '../models/response.model';
import { AuthService } from '../../features/auth/auth.service';
import { ERP } from '../../erp-settings';
import { insertbancosModel,updatebancosModel,deletebancosModel } from '../models/bancos.model';


@Injectable({
  providedIn: "root",
})
export class bancosService {

  constructor(private http: HttpClient,private authService: AuthService,private erp:ERP) {}

  deletebancos(Id: number): Observable<any> {
    return this.http.put(`${this.erp.apiUrl}/bancos/Delete`, { Id });
  }

  updatebancos(bancosData: updatebancosModel): Observable<defaultApiResponse> {
   const body = {
    id: bancosData.Id,
    nombre: bancosData.nombre,
    Direccion: bancosData.Direccion,
    UsuarioActualiza: bancosData.UsuarioActualiza
  }
  console.log("Enviando solicitud con el siguiente cuerpo:", body);
  return this.http.put<defaultApiResponse>(`${this.erp.apiUrl}/bancos/Update`, body);
  }

  getBancos(): Observable<defaultApiResponse> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<defaultApiResponse>(`${this.erp.apiUrl}/bancos/Get`,{headers});
  }

  Insertarbancos(bancosData: {
    nombre: string;
    Direccion: string;
    UsuarioActualiza: number;
  }): Observable<defaultApiResponse> {
    const body = {
      nombre:bancosData.nombre,
      Direccion:bancosData.Direccion,
      UsuarioActualiza:bancosData.UsuarioActualiza,
    };
    return this.http.post<defaultApiResponse>(`${this.erp.apiUrl}/bancos/Insert`, body);
  }
}
