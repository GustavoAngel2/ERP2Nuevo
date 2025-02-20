import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { defaultApiResponse } from '../models/response.model';
import { AuthService } from '../../features/auth/auth.service';
import { ERP } from '../../erp-settings';
import { insertRol, updateRol } from '../models/roles.model';


@Injectable({
  providedIn: "root",
})
export class RolesService {

  constructor(private http: HttpClient,private authService: AuthService,private erp:ERP) {}

  deleterol(Id: number): Observable<any> {
    return this.http.put(`${this.erp.apiUrl}/Rol/Delete`, { Id });
  }

  updateRol(data:updateRol): Observable<defaultApiResponse> {
   const body = {
    id: data.id,
    rol: data.rol,
    descripcion: data.descripcion,
    usuarioActualiza: data.usuarioActualiza
  }
  console.log("Enviando solicitud con el siguiente cuerpo:", body);
  return this.http.put<defaultApiResponse>(`${this.erp.apiUrl}/Rol/Update`, body);
  }

  getRoles(): Observable<defaultApiResponse> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<defaultApiResponse>(`${this.erp.apiUrl}/Rol/Get`,{headers});
  }

  InsertarRol(data: insertRol): Observable<defaultApiResponse> {
    const body = {
      rol: data.rol,
      descripcion: data.descripcion,
      usuarioActualiza: data.usuarioActualiza
    };
    return this.http.post<defaultApiResponse>(`${this.erp.apiUrl}/Rol/Insert`, body);
  }
}
