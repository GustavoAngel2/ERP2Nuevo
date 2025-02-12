import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { defaultApiResponse } from '../models/response.model';
import { AuthService } from '../../features/auth/auth.service';
import { insertProveedorModel, updateProveedorModel } from '../models/proveedores.model';
import { ERP } from '../../erp-settings';


@Injectable({
  providedIn: "root",
})
export class ProveedoresService {
  //Se especifica la url base de la API

  constructor(private http: HttpClient,private authService: AuthService, private erp:ERP) {}

  getProveedores(): Observable<defaultApiResponse> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<defaultApiResponse>(`${this.erp.apiUrl}/Proveedores/Get`,{headers});
  }

  insertarProovedor(ProveedorData: insertProveedorModel): Observable<defaultApiResponse> {
    const body = {
      nombre: ProveedorData.nombre,
      direccion: ProveedorData.direccion,
      telefono: ProveedorData.telefono,
      idBanco: ProveedorData.idBanco,
      plazoPago: ProveedorData.plazoPago,
      correo: ProveedorData.correo,
      rfc: ProveedorData.rfc,
      razonSocial: ProveedorData.razonSocial,
      clabe: ProveedorData.clabe,
      usuarioActualiza: ProveedorData.usuarioActualiza
    };
    return this.http.post<defaultApiResponse>(`${this.erp.apiUrl}/Proveedores/Insert`, body);
  }
  deleteProveedor(Id: number): Observable<any> {
    return this.http.put(`${this.erp.apiUrl}/Proveedores/Delete`, { Id });
  }
  updateProveedor(ProveedorData: updateProveedorModel): Observable<defaultApiResponse> {
    const body = {
      id: ProveedorData.id,
      nombre: ProveedorData.nombre,
      direccion: ProveedorData.direccion,
      telefono: ProveedorData.telefono,
      idBanco: ProveedorData.idBanco,
      plazoPago: ProveedorData.plazoPago,
      correo: ProveedorData.correo,
      rfc: ProveedorData.rfc,
      razonSocial: ProveedorData.razonSocial,
      clabe: ProveedorData.clabe,
      usuarioActualiza: ProveedorData.usuarioActualiza
    };

    return this.http.put<defaultApiResponse>(`${this.erp.apiUrl}/Proveedores/Update`, body);
  }
}
