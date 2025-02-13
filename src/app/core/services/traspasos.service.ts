import { insertDetalleTraspasoModel, updateDetalleTraspasoModel } from '../models/detalletraspaso.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { defaultApiResponse } from '../models/response.model';
import { AuthService } from '../../features/auth/auth.service';
import { insertTraspasoModel,getTraspasosModel } from '../models/traspasos.model';
import { ERP } from '../../erp-settings';

@Injectable({
  providedIn: "root",
})
export class TraspasosService {
  //Se especifica la url base de la API

  constructor(private http: HttpClient,private authService: AuthService, private erp:ERP) {}

  getTraspasos(search:getTraspasosModel): Observable<defaultApiResponse> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    console.log(search)
    return this.http.get<defaultApiResponse>(`${this.erp.apiUrl}/Traspasos/Get?pAlmacenOrigen=${search.pAlmacenOrigen}&pAlmacenDestino=${search.pAlmacenDestino}&pFechaInicio=${encodeURIComponent(search.pFechaInicio.replace(/-/g, '/'))}&pFechaFinal=${encodeURIComponent(search.pFechaFinal.replace(/-/g, '/'))}`,{headers});
  }
  insertTraspaso(ArticuloData: insertTraspasoModel): Observable<defaultApiResponse> {
    const body = {
      idAlmacenOrigen: ArticuloData.idAlmacenOrigen,
      idAlmacenDestino: ArticuloData.idAlmacenDestino,
      usuarioEnvia: ArticuloData.usuarioEnvia,
      usuarioActualiza: ArticuloData.usuarioActualiza
    };
    return this.http.post<defaultApiResponse>(`${this.erp.apiUrl}/Traspasos/Insert`, body);
  }
  deleteTraspaso(Id: number): Observable<any> {
    return this.http.put(`${this.erp.apiUrl}/Traspasos/Delete`, { Id });
  }
}
  /* ---------------------------------------------------------------------------------------------------------------------------------- */
@Injectable({
  providedIn: "root",
})
export class DetalleTraspasosService {
  //Se especifica la url base de la API

  constructor(private http: HttpClient,private authService: AuthService, private erp:ERP) {}

  getDetalleTraspaso(search:number): Observable<defaultApiResponse> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    console.log(search)
    return this.http.get<defaultApiResponse>(`${this.erp.apiUrl}/DetalleTraspaso/Get?idTraspaso=${search}`,{headers});
  }
  insertDetalleTraspaso(ArticuloData: insertDetalleTraspasoModel): Observable<defaultApiResponse> {
    const body = {
      insumo:ArticuloData.insumo,
      idTraspaso:ArticuloData.idTraspaso,
      cantidadEnviada:ArticuloData.cantidadEnviada,
      usuarioActualiza:ArticuloData.usuarioActualiza
    };
    return this.http.post<defaultApiResponse>(`${this.erp.apiUrl}/DetalleTraspaso/Insert`, body);
  }

  updateDetalleTraspaso(ArticuloData: updateDetalleTraspasoModel): Observable<defaultApiResponse> {
    const body = {
      id: ArticuloData.id,
      insumo:ArticuloData.insumo,
      cantidadEnviada: ArticuloData.cantidadEnviada,
      cantidadRecibida:ArticuloData.cantidadRecibida,
      usuarioActualiza:ArticuloData.usuarioActualiza
    };
    return this.http.put<defaultApiResponse>(`${this.erp.apiUrl}/DetalleTraspaso/Update`, body);
  }

  deleteDetalleTraspaso(Id: number): Observable<any> {
    return this.http.put(`${this.erp.apiUrl}/DetalleTraspaso/Delete`, { Id });
  }
}