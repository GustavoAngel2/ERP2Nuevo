import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { defaultApiResponse } from '../models/response.model';
import { AuthService } from '../../features/auth/auth.service';
import { insertCompraModel, updateCompraModel } from '../models/orden-compra.model';
import { ERP } from '../../erp-settings';

@Injectable({
  providedIn: "root",
})
export class OrdenComprasService {
  //Se especifica la url base de la API

  constructor(private http: HttpClient,private authService: AuthService, private erp:ERP) {}

  getOrdenCompras(): Observable<defaultApiResponse> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<defaultApiResponse>(`${this.erp.apiUrl}/OrdenCompra/Get`,{headers});
  }

  insertarOrdenCompra(OrdenComprasData:insertCompraModel): Observable<defaultApiResponse> {
    const body = {
      idProveedor: OrdenComprasData.idProveedor,
      fechaLlegada:OrdenComprasData.fechaLlegada,
      idSucursal: OrdenComprasData.idSucursal,
      idComprador: OrdenComprasData.idComprador,
      usuarioActualiza: OrdenComprasData.usuarioActualiza
    };
    return this.http.post<defaultApiResponse>(`${this.erp.apiUrl}/OrdenCompra/Insert`, body);
  }
  deleteOrdenCompra(Id: number): Observable<any> {
    return this.http.put(`${this.erp.apiUrl}/OrdenCompra/Delete`, { Id });
  }
  updateOrdenCompra(OrdenCompraData: updateCompraModel): Observable<defaultApiResponse> {
    const body = {
      idOrden: OrdenCompraData.id,
      idProveedor: OrdenCompraData.idProveedor,
      fechaLlegada: OrdenCompraData.fechaLlegada,
      idSurcursal: OrdenCompraData.idSucursal,
      idComprador: OrdenCompraData.idComprador,
      usuarioActualiza: OrdenCompraData.usuarioActualiza
    };

    return this.http.put<defaultApiResponse>(`${this.erp.apiUrl}/OrdenCompra/Update`, body);
  }
}