import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { defaultApiResponse } from '../models/response.model';
import { AuthService } from '../../features/auth/auth.service';
import { ERP } from '../../erp-settings';
import { UsuariosDetComponent } from '../../features/usuarios-det/usuarios-det.component';

@Injectable({
  providedIn: "root",
})
export class DetalleUsuariosService {

  constructor(private http: HttpClient,private authService: AuthService,private erp:ERP) {}

  DeleteDetalleUsuarios(Id: number): Observable<any> {
    return this.http.put(`${this.erp.apiUrl}/usuarios_det/Delete`, { Id });
  }

  UpdateDetalleUsuarios(DetalleUsuariosData: UpdateDetalleUsuariosModel): Observable<defaultApiResponse> {
   const body = {
    Id:DetalleUsuariosData: Id,
    IDUSUARIO:DetalleUsuariosData: IDUSUARIO,
    IDMODULO: DetalleUsuariosData: IDMODULO,
    IDCATEGORIA:DetalleUsuariosData: IDCATEGORIA,
    SOLOSUCURSAL:DetalleUsuariosData: SOLOSUCURSAL,
    REGISTROS_PROPIOS:DetalleUsuariosData: REGISTROS_PROPIOS,
    SOLOLECTURA:DetalleUsuariosData: SOLOLECTURA,
    ACTIVO:DetalleUsuariosData: ACTIVO
  }
  console.log("Enviando solicitud con el siguiente cuerpo:", body);
  return this.http.put<defaultApiResponse>(`${this.erp.apiUrl}/usuarios_det/Update`, body);
  }

  getBancos(): Observable<defaultApiResponse> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<defaultApiResponse>(`${this.erp.apiUrl}/usuarios_det/Get`,{headers});
  }

  Insertarbancos(bancosData: {
    nombre: string;
    Direccion: string;
    UsuarioActualiza: number;
  }): Observable<defaultApiResponse> {
    const body = {
      nombre:bancosData.nombre,
      Direccion:bancosData.Direccion,
      UsuarioActualiza:bancosData.UsuarioActualiza,
    };
    return this.http.post<defaultApiResponse>(`${this.erp.apiUrl}/usuarios_det/Insert`, body);
  }
}
