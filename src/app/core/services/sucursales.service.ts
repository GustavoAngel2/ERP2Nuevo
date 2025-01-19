import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { defaultApiResponse } from '../models/response.model';
import { AuthService } from '../../features/auth/auth.service';
import { sucursalInsertModel, sucursalUpdateModel } from '../models/sucursales.model';
import { ERP } from '../../erp-settings';

@Injectable({
  providedIn: "root",
})
export class SucursalesService {
  //Se especifica la url base de la API

  constructor(private http: HttpClient,private authService: AuthService, private erp:ERP) {}

  getSucursales(): Observable<defaultApiResponse> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<defaultApiResponse>(`${this.erp.apiUrl}/Sucursales/Get`,{headers});
  }

  insertarSucursal(SucursalData: sucursalInsertModel): Observable<defaultApiResponse> {
    const body = {
      nombre: SucursalData.nombre,
      direccion: SucursalData.direccion,
      idUsuario: SucursalData.idUsuario
    };
    return this.http.post<defaultApiResponse>(`${this.erp.apiUrl}/Sucursales/Insert`, body);
  }
  deleteSucursal(Id: number): Observable<any> {
    return this.http.put(`${this.erp.apiUrl}/Sucursales/Delete`, { Id });
  }
  updateSucursal(SucursalData: sucursalUpdateModel): Observable<defaultApiResponse> {
    const body = {
      id: SucursalData.id,
      nombre: SucursalData.nombre,
      direccion: SucursalData.direccion,
      idUsuario: SucursalData.idUsuario
    };

    return this.http.put<defaultApiResponse>(`${this.erp.apiUrl}/Sucursales/Update`, body);
  }
}
