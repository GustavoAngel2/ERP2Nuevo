import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { defaultApiResponse } from '../models/response.model';
import { AuthService } from '../../features/auth/auth.service';
import { entradasInsertModel } from '../models/entradas.model';
import { updateCantSinCargo,insertDetalleEntradaModel, updateDetalleEntradaModel, getReportEntradasSearch } from '../models/detalleentrada.model';
import { ERP } from '../../erp-settings';

@Injectable({
  providedIn: "root",
})
export class EntradasService {
  //Se especifica la url base de la API

  constructor(private http: HttpClient,private authService: AuthService, private erp:ERP) {}

  getEntradas(): Observable<defaultApiResponse> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<defaultApiResponse>(`${this.erp.apiUrl}/Entradas/Get`,{headers});
  }

  insertarEntrada(EntradaData: entradasInsertModel): Observable<defaultApiResponse> {
    const body = {
      idProveedor: EntradaData.idProveedor,
      factura: EntradaData.factura,
      idSurcursal: EntradaData.idSurcursal,
      usuarioActualiza: EntradaData.usuarioActualiza
    };
    return this.http.post<defaultApiResponse>(`${this.erp.apiUrl}/Entradas/Insert`, body);
  }
  deleteEntrada(Id: number): Observable<any> {
    return this.http.put(`${this.erp.apiUrl}/Entradas/Delete`, { Id });
  }

  // updateProveedor(ProveedorData: updateProveedorModel): Observable<defaultApiResponse> {
  //   const body = {
  //     id: ProveedorData.id,
  //     nombre: ProveedorData.nombre,
  //     direccion: ProveedorData.direccion,
  //     telefono: ProveedorData.telefono,
  //     idBanco: ProveedorData.idBanco,
  //     plazoPago: ProveedorData.plazoPago,
  //     correo: ProveedorData.correo,
  //     rfc: ProveedorData.rfc,
  //     razonSocial: ProveedorData.razonSocial,
  //     clabe: ProveedorData.clabe,
  //     usuarioActualiza: ProveedorData.usuarioActualiza
  //   };

  //   return this.http.put<defaultApiResponse>(`${this.erp.apiUrl}/Entradas/Update`, body);
  // }
}
//--------------------------------------------------------------------------------------------------------
@Injectable({
  providedIn: "root",
})
export class DetalleEntradasService{
  //Se especifica la url base de la API

  constructor(private http: HttpClient,private authService: AuthService, private erp:ERP) {}

  getDetalleEntrada(id:number): Observable<defaultApiResponse> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<defaultApiResponse>(`${this.erp.apiUrl}/DetalleEntrada/Get?idEntrada=${id}`,{headers});
  }

  insertDetalleEntrada(ArticuloData: insertDetalleEntradaModel): Observable<defaultApiResponse> {
    const body = {
      idEntrada: ArticuloData.idEntrada,
      codigo: ArticuloData.codigo,
      cantidad: ArticuloData.cantidad,
      costo: ArticuloData.costo,
      descuento: ArticuloData.descuento,
      usuarioActualiza:ArticuloData.usuarioActualiza
    };
    return this.http.post<defaultApiResponse>(`${this.erp.apiUrl}/DetalleEntrada/Insert`, body);
  }

  deleteDetalleEntrada(Id: number): Observable<any> {
    return this.http.put(`${this.erp.apiUrl}/DetalleEntrada/Delete`, { Id });
  }

  updateCatSinCargo(cantCar:updateCantSinCargo): Observable<defaultApiResponse>{
    const body:updateCantSinCargo = {
      id: cantCar.id,
      cantidad: cantCar.cantidad
    }
    return this.http.put<defaultApiResponse>(`${this.erp.apiUrl}/DetalleEntrada/UpdateCantSinCArgo`,body);
  }

  getDetalleEntradaReport(search:getReportEntradasSearch): Observable<any> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<any>(`${this.erp.apiUrl}/DetalleEntrada/GetReportEntradas?FechaInicio=${search.FechaInicio}&FechaFinal=${search.FechaFinal}`,{headers});
  }

  ExportarReporte(): Observable<Blob> { // Actualiza el tipo de retorno a Blob para el manejo de archivos
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
    });
    return this.http.get(`${this.erp.apiUrl}/DetalleEntrada/ExportarReportEntradasAExcel`, { headers, responseType: 'blob' });
  }

}