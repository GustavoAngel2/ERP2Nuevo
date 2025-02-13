import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../../features/auth/auth.service';
import { ERP } from '../../erp-settings';
import { ReporteKardexMovSearch } from '../models/reportes.model';

@Injectable({
  providedIn:"root",
})
export class reportes{
  constructor(private http: HttpClient,private authService: AuthService, private erp:ERP) {}

  ExportarReporte(): Observable<Blob> { // Actualiza el tipo de retorno a Blob para el manejo de archivos
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
    });
    return this.http.get(`${this.erp.apiUrl}/ReportKardexMov/ExportarReportKardexMovAExcel`, { headers, responseType: 'blob' });
  }

  getKardex(search:ReporteKardexMovSearch): Observable<any> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    console.log(search)
    return this.http.get<any>(`${this.erp.apiUrl}/ReportKardexMov/Get?${encodeURIComponent(search.FechaInicio.replace(/-/g, '/'))}&pFechaFinal=${encodeURIComponent(search.FechaFin.replace(/-/g, '/'))}`,{headers});
  }
}
