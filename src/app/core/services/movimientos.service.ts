import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { defaultApiResponse } from '../models/response.model';
import { AuthService } from '../../features/auth/auth.service';
import { insertMovModel } from '../models/Movimiento.model';
import { DetMovInsertModel } from '../models/detallemovimiento.model';
import { ERP } from '../../erp-settings';

@Injectable({
  providedIn: "root",
})
export class MovimientosService {
  //Se especifica la url base de la API

  constructor(private http: HttpClient,private authService: AuthService, private erp:ERP) {}

  getMovimiento(): Observable<defaultApiResponse> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<defaultApiResponse>(`${this.erp.apiUrl}/Movimientos/Get`,{headers});
  }

  ExportarMovimiento(): Observable<Blob> { // Actualiza el tipo de retorno a Blob para el manejo de archivos
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
    });
    return this.http.get(`${this.erp.apiUrl}/Movimientos/ExportarMovimientosAExcel`, { headers, responseType: 'blob' });
  }



  InsertMovimiento(MovData: insertMovModel): Observable<defaultApiResponse> {
    const body = {
    idAlmacen: MovData.idAlmacen,
    tipoMovimiento: MovData.tipoMovimiento,
    usuarioRegistra: MovData.usuarioRegistra,
    usuarioAutoriza: MovData.usuarioAutoriza,
    usuarioActualiza:MovData.usuarioActualiza
    };
    return this.http.post<defaultApiResponse>(`${this.erp.apiUrl}/Movimientos/Insert`, body);
  }
}
/* -------------------------------------------------------------------------------------------------------------------------------------------- */
@Injectable({
  providedIn: "root",
})
export class DetMovimientosService {
  //Se especifica la url base de la API

  constructor(private http: HttpClient,private authService: AuthService, private erp:ERP) {}

  getDetalleMov(Id:number): Observable<defaultApiResponse> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<defaultApiResponse>(`${this.erp.apiUrl}/DetalleMovimientos/Get?idMovimiento=${Id}`,{headers});
  }

  InsertDetMovimiento(DetMovData: DetMovInsertModel): Observable<defaultApiResponse> {
    const body = {
     idMovimiento: DetMovData.IdMovimiento,
     insumo: DetMovData.insumo,
     cantidad: DetMovData.cantidad,
     usuarioActualiza:DetMovData.usuarioActualiza
    };
    return this.http.post<defaultApiResponse>(`${this.erp.apiUrl}/DetalleMovimientos/Insert`, body);
  }
}

/* --------------------------------------------------------------------------------------------------------------------------------------------------- */
@Injectable({
  providedIn: "root",
})
export class tipoMovimiento {
  //Se especifica la url base de la API

  constructor(private http: HttpClient,private authService: AuthService, private erp:ERP) {}

  getTipoMov(): Observable<defaultApiResponse> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<defaultApiResponse>(`${this.erp.apiUrl}/TipoMovimiento/Get`,{headers});
  }
}