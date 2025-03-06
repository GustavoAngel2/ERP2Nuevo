import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { defaultApiResponse } from '../models/response.model';
import { AuthService } from '../../features/auth/auth.service';
import { ERP } from '../../erp-settings';
import { insertCfgDeptos,updateCfgDeptos } from '../models/cfgDeptos.model';

@Injectable({
  providedIn: "root",
})
export class DepartamentosService {

  constructor(private http: HttpClient,private authService: AuthService,private erp:ERP) {}

  deletebancos(Id: number): Observable<any> {
    return this.http.put(`${this.erp.apiUrl}/CfgDepartamentos/Delete`, { Id });
  }

  updatebancos(Data: updateCfgDeptos): Observable<defaultApiResponse> {
   const body = {
    id:Data.id,
    nombre: Data.nombre,
    extension: Data.extension,
    idPersona: Data.idPersona,
    abreviatura: Data.abreviatura,
    usuarioActualiza: Data.usuarioActualiza
}
  console.log("Enviando solicitud con el siguiente cuerpo:", body);
  return this.http.put<defaultApiResponse>(`${this.erp.apiUrl}/CfgDepartamentos/Update`, body);
  }

  getBancos(): Observable<defaultApiResponse> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<defaultApiResponse>(`${this.erp.apiUrl}/CfgDepartamentos/Get`,{headers});
  }

  Insertarbancos(Data: insertCfgDeptos): Observable<defaultApiResponse> {
    const body = {
        nombre: Data.nombre,
        extension: Data.extension,
        idPersona: Data.idPersona,
        abreviatura: Data.abreviatura,
        usuarioActualiza: Data.usuarioActualiza
    }
    return this.http.post<defaultApiResponse>(`${this.erp.apiUrl}/CfgDepartamentos/Insert`, body);
  }
}
