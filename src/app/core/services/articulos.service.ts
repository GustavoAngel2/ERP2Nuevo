import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { defaultApiResponse } from '../models/response.model';
import { AuthService } from '../../features/auth/auth.service';
import { insertArticuloModel, updateArticuloModel } from '../models/articulos.model';
import { ERP } from '../../erp-settings';

@Injectable({
  providedIn: "root",
  })
  export class ArticulosService {
  //Se especifica la url base de la API

  constructor(private http: HttpClient,private authService: AuthService, private erp:ERP) {}

  getArticulos(): Observable<defaultApiResponse> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<defaultApiResponse>(`${this.erp.apiUrl}/Articulos/Get`,{headers}, );
  }
  InsertArticulo(ArticuloData: insertArticuloModel): Observable<defaultApiResponse> {
    const body = {
      codigo: ArticuloData.Codigo,
      descripcion:ArticuloData.Descripcion,
      idFamilia: ArticuloData.Familia,
      idUm: ArticuloData.UM,
      ultimoCosto:ArticuloData.UltimoCosto,
      precioVenta:ArticuloData.PrecioVenta,
      iva:ArticuloData.Iva,
      ieps: ArticuloData.Ieps,
      idUsuario: ArticuloData.Usuario
    };
    return this.http.post<defaultApiResponse>(`${this.erp.apiUrl}/Articulos/Insert`, body);
  }

  updateArticulo(ArticuloData: updateArticuloModel): Observable<defaultApiResponse> {
    const body = {
      id: ArticuloData.Id,
      codigo: ArticuloData.Codigo,
      descripcion:ArticuloData.Descripcion,
      idFamilia: ArticuloData.Familia,
      idUm: ArticuloData.UM,
      ultimoCosto:ArticuloData.UltimoCosto,
      precioVenta:ArticuloData.PrecioVenta,
      iva:ArticuloData.Iva,
      ieps: ArticuloData.Ieps,
      idUsuario: ArticuloData.Usuario
    };
    console.log("Enviando solicitud con el siguiente cuerpo:", body);
    return this.http.put<defaultApiResponse>(`${this.erp.apiUrl}/Articulos/Update`, body);
    }

    deleteArticulo(Id: number): Observable<any> {
      return this.http.put(`${this.erp.apiUrl}/Articulos/Delete`, { Id });
    }
}