import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { defaultApiResponse } from '../models/response.model';
import { AuthService } from '../../features/auth/auth.service';
import { ERP } from '../../erp-settings';
import { insertCfgPuestos,updateCfgPuestos } from '../models/cfgPuestos.model';

@Injectable({
  providedIn: "root",
})
export class PuestosService {

  constructor(private http: HttpClient,private authService: AuthService,private erp:ERP) {}

  deletebancos(Id: number): Observable<any> {
    return this.http.put(`${this.erp.apiUrl}/CfgPuestos/Delete`, { Id });
  }

  updatebancos(Data: updateCfgPuestos): Observable<defaultApiResponse> {
   const body = {
    id:Data.id,
    puesto:Data.puesto,
    descripcion:Data.descripcion,
    usuario:Data.usuario
}
  console.log("Enviando solicitud con el siguiente cuerpo:", body);
  return this.http.put<defaultApiResponse>(`${this.erp.apiUrl}/CfgPuestos/Update`, body);
  }

  getBancos(): Observable<defaultApiResponse> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<defaultApiResponse>(`${this.erp.apiUrl}/CfgPuestos/Get`,{headers});
  }

  Insertarbancos(Data: insertCfgPuestos): Observable<defaultApiResponse> {
    const body = {
        puesto:Data.puesto,
        descripcion:Data.descripcion,
        usuario:Data.usuario
    }
    return this.http.post<defaultApiResponse>(`${this.erp.apiUrl}/CfgPuestos/Insert`, body);
  }
}