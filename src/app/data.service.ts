import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UpdateAlmacen } from './models/almacen.model';
import { defaultApiResponse } from './data-models/response.model';
import { AuthService } from './auth.service';


@Injectable({
  providedIn: "root",
})
export class AlmacenesService {
  //Se especifica la url base de la API
  private apiUrl = "http://localhost:5020/api";
  constructor(private http: HttpClient,private authService: AuthService) {}
  
  getAlmacenes(): Observable<any> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<any>(`${this.apiUrl}/Almacenes/Get`, { headers });
  }

  //esta funcion se utiliza para insertar un almacen, contiene un cuerpo de nombre, direccion y el usuario (su id) que lo crea
  insertarAlmacenes(AlmacenesData: {
    nombre: string;
    direccion: string;
    usuario: number;
    encargado: number;
  }): Observable<ApiResponse> {
    const body = {
      nombre: AlmacenesData.nombre,
      direccion: AlmacenesData.direccion,
      usuario: AlmacenesData.usuario,
      encargado: AlmacenesData.encargado
    };
    return this.http.post<ApiResponse>(`${this.apiUrl}/Almacenes/Insert`, body);
  }
  //esta funcion borra un almacen pidiendo el id del almacen a borrar
  deleteAlmacenes(Id: number): Observable<any> {
    
    return this.http.put(`${this.apiUrl}/Almacenes/Delete`, { Id });
  }
  //esta funcion sirve para modificar la informacion de un almacen
  updateAlmacenes(AlmacenesData: UpdateAlmacen): Observable<ApiResponse> {
    const body = {
      id: AlmacenesData.Id,
      nombre: AlmacenesData.Nombre,
      direccion: AlmacenesData.Direccion,
      usuario: AlmacenesData.Usuario,
      encargado: AlmacenesData.Encargado
    };
    console.log("Enviando solicitud con el siguiente cuerpo:", body);
    return this.http.put<ApiResponse>(`${this.apiUrl}/Almacenes/Update`, body);
  }
}