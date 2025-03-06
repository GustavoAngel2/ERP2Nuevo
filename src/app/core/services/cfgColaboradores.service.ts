import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { defaultApiResponse } from '../models/response.model';
import { AuthService } from '../../features/auth/auth.service';
import { ERP } from '../../erp-settings';
import { insertCfgColaboradores,updateCfgColaboradores } from '../models/cfgColaboradores.model';

@Injectable({
  providedIn: "root",
})
export class ColaboradoresService {

  constructor(private http: HttpClient,private authService: AuthService,private erp:ERP) {}

  deletebancos(Id: number): Observable<any> {
    return this.http.put(`${this.erp.apiUrl}/api/CfgColaboradores/Delete/Delete`, { Id });
  }

  updatebancos(Data: updateCfgColaboradores): Observable<defaultApiResponse> {
   const body = {
    id:Data.id,
    numEmpleado: Data.numEmpleado,
    idPersona: Data.idPersona,
    idSede: Data.idSede,
    idPeriodo: Data.idPeriodo,
    idDepartamento: Data.idDepartamento,
    idPuesto: Data.idPuesto,
    tipoPersona: Data.tipoPersona,
    usuarioActualiza: Data.usuarioActualiza
}
  console.log("Enviando solicitud con el siguiente cuerpo:", body);
  return this.http.put<defaultApiResponse>(`${this.erp.apiUrl}/api/CfgColaboradores/Delete/Update`, body);
  }

  getBancos(): Observable<defaultApiResponse> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<defaultApiResponse>(`${this.erp.apiUrl}/api/CfgColaboradores/Delete/Get`,{headers});
  }

  Insertarbancos(Data: insertCfgColaboradores): Observable<defaultApiResponse> {
    const body = {
        numEmpleado: Data.numEmpleado,
    idPersona: Data.idPersona,
    idSede: Data.idSede,
    idPeriodo: Data.idPeriodo,
    idDepartamento: Data.idDepartamento,
    idPuesto: Data.idPuesto,
    tipoPersona: Data.tipoPersona,
    usuarioActualiza: Data.usuarioActualiza
    }
    return this.http.post<defaultApiResponse>(`${this.erp.apiUrl}/api/CfgColaboradores/Delete/Insert`, body);
  }
}
