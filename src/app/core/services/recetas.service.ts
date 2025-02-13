import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { defaultApiResponse } from '../models/response.model';
import { AuthService } from '../../features/auth/auth.service';
import { insertRecetaModel, updateRecetasModel } from '../models/recetas.model';
import { insertDetRecetaModel } from '../models/detallereceta.model';
import { ERP } from '../../erp-settings';

@Injectable({
  providedIn: "root",
})
export class RecetasService {
  //Se especifica la url base de la API

  constructor(private http: HttpClient,private authService: AuthService, private erp:ERP) {}

  getRecetas(): Observable<defaultApiResponse> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<defaultApiResponse>(`${this.erp.apiUrl}/Recetas/Get`,{headers});
  }

  insertarReceta(RecetasData: insertRecetaModel): Observable<defaultApiResponse> {
    const body = {
      nombre: RecetasData.nombre,
      usuarioRegistra: RecetasData.usuarioRegistra,
      usuarioActualiza: RecetasData.usuarioActualiza
    };
    return this.http.post<defaultApiResponse>(`${this.erp.apiUrl}/Recetas/Insert`, body);
  }

  deleteRecetas(Id: number): Observable<any> {
    return this.http.put(`${this.erp.apiUrl}/recetas/Delete`, { Id });
  }

  updateRecetas(RecetasData: updateRecetasModel): Observable<defaultApiResponse> {
    const body = {
      id: RecetasData.id,
      nombre: RecetasData.nombre,
      usuarioActualiza: RecetasData.usuarioActualiza
    };
    console.log("Enviando solicitud con el siguiente cuerpo:", body);
    return this.http.put<defaultApiResponse>(`${this.erp.apiUrl}/recetas/Update`, body);
  }
}
/* ----------------------------------------------------------------------------------------------------------------- */
@Injectable({
  providedIn: "root",
  })
  export class DetalleRecetasService {
  //Se especifica la url base de la API

  constructor(private http: HttpClient,private authService: AuthService, private erp:ERP) {}

  getDetRecetas(Id: number): Observable<defaultApiResponse> {
  const token = this.authService.getToken();
  const headers = new HttpHeaders({
  'Authorization': `Bearer ${token}`
  });
  return this.http.get<defaultApiResponse>(`${this.erp.apiUrl}/DetalleReceta/Get?idReceta=${Id}`,{headers}, );
  }

    insertDetReceta(DetRecetasData: insertDetRecetaModel): Observable<defaultApiResponse> {
      const body = {
        idReceta: DetRecetasData.idReceta,
        insumo:DetRecetasData.insumo,
        cantidad:DetRecetasData.cantidad,
        usuarioActualiza: DetRecetasData.usuarioActualiza
      };
      return this.http.post<defaultApiResponse>(`${this.erp.apiUrl}/DetalleReceta/Insert`, body);
    }
    deleteDetRecetas(Id: number): Observable<any> {
      return this.http.put(`${this.erp.apiUrl}/DetalleReceta/Delete`, { Id });
    }


  updateDetRecetas(RecetasData: updateRecetasModel): Observable<defaultApiResponse> {
      const body = {
      id: RecetasData.id,
      nombre: RecetasData.nombre,
      usuarioActualiza: RecetasData.usuarioActualiza
      };
      console.log("Enviando solicitud con el siguiente cuerpo:", body);
      return this.http.put<defaultApiResponse>(`${this.erp.apiUrl}/recetas/Update`, body);
      }
  }
