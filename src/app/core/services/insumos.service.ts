import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { defaultApiResponse } from '../models/response.model';
import { AuthService } from '../../features/auth/auth.service';
import { insertInsumosModel, updateInsumosModel } from '../models/insumos.model';
import { ERP } from '../../erp-settings';

@Injectable({
  providedIn: "root",
})
export class InsumosService {
  //Se especifica la url base de la API

  constructor(private http: HttpClient,private authService: AuthService, private erp:ERP) {}
  getInsumos(): Observable<defaultApiResponse> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<defaultApiResponse>(`${this.erp.apiUrl}/Insumos/Get`,{headers});
  }
  insertarInsumo(ProveedorData: insertInsumosModel): Observable<defaultApiResponse> {
    const body = {
      costo: ProveedorData.costo,
      insumo:ProveedorData.insumo,
      descripcionInsumo: ProveedorData.descripcionInsumo,
      unidadMedida: ProveedorData.unidadMedida,
      usuarioActualiza: ProveedorData.usuarioActualiza,
      insumosUP: ProveedorData.insumosUP
    };
    return this.http.post<defaultApiResponse>(`${this.erp.apiUrl}/Insumos/Insert`, body);
  }
  deleteInsumo(Id: number): Observable<any> {
    return this.http.put(`${this.erp.apiUrl}/Insumos/Delete`, { Id });
  }
  updateInsumo(ProveedorData: updateInsumosModel): Observable<defaultApiResponse> {
    const body = {
      id: ProveedorData.id,
      costo: ProveedorData.costo,
      insumo:ProveedorData.insumo,
      descripcionInsumo: ProveedorData.descripcionInsumo,
      unidadMedida: ProveedorData.unidadMedida,
      usuarioActualiza: ProveedorData.usuarioActualiza,
      insumosUP: ProveedorData.insumosUP
    };

    return this.http.put<defaultApiResponse>(`${this.erp.apiUrl}/Insumos/Update`, body);
  }
}
