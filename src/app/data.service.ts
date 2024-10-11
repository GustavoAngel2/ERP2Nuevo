import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { defaultApiResponse } from './data-models/response.model';
import { AuthService } from './auth.service';
import { UpdatePersonasModel } from './data-models/personas.model';
import { updateUsuarioModel } from './data-models/usuario.model';
import { insertProveedorModel, updateProveedorModel } from './data-models/proveedores.model';
import { entradasInsertModel } from './data-models/entradas.model';
import { sucursalInsertModel, sucursalUpdateModel } from './data-models/sucursales.model';
import { insertCompraModel, updateCompraModel } from './data-models/orden-compra.model';
import { insertInsumosModel, updateInsumosModel } from './data-models/insumos.model';
import { insertRecetaModel, updateRecetasModel } from './data-models/resetas.model';
import { UsuariosComponent } from './usuarios/usuarios.component';


@Injectable({
  providedIn: "root",
})
export class PersonasService {
  //Se especifica la url base de la API
  private apiUrl = "http://localhost:5020/api";
  constructor(private http: HttpClient,private authService: AuthService) {}

  getPersonas(): Observable<defaultApiResponse> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<defaultApiResponse>(`${this.apiUrl}/Personas/Get`,{headers});
  }

  insertarPersona(PersonaData: {
    nombre: string;
    ApPaterno: string;
    ApMaterno: string;
    direccion: string;
    usuario: number;
  }): Observable<defaultApiResponse> {
    const body = {
      nombre: PersonaData.nombre,
      ApPaterno: PersonaData.ApPaterno,
      ApMaterno: PersonaData.ApMaterno,
      direccion: PersonaData.direccion,
      usuario: PersonaData.usuario,
      Direccion: PersonaData.direccion,
      Usuario: PersonaData.usuario,
    };
    return this.http.post<defaultApiResponse>(`${this.apiUrl}/Personas/Insert`, body);
  }
  deletePersonas(Id: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/Personas/Delete`, { Id });
  }
  updatePersonas(PersonaData: UpdatePersonasModel): Observable<defaultApiResponse> {
    const body = {
      id: PersonaData.Id,
      nombre: PersonaData.Nombre,
      apPaterno: PersonaData.ApPaterno,
      apMaterno: PersonaData.ApMaterno,
      direccion: PersonaData.Direccion,
      usuario: PersonaData.Usuario
    };
    console.log("Enviando solicitud con el siguiente cuerpo:", body);
    return this.http.put<defaultApiResponse>(`${this.apiUrl}/Personas/Update`, body);
  }
}
  //----------------------------------------------------------------------------------------------
  @Injectable({
    providedIn: "root",
  })
  export class ProveedoresService {
    //Se especifica la url base de la API
    private apiUrl = "http://localhost:5020/api";
    constructor(private http: HttpClient,private authService: AuthService) {}
  
    getProveedores(): Observable<defaultApiResponse> {
      const token = this.authService.getToken();
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
      });
      return this.http.get<defaultApiResponse>(`${this.apiUrl}/Proveedores/Get`,{headers});
    }
  
    insertarProovedor(ProveedorData: insertProveedorModel): Observable<defaultApiResponse> {
      const body = {
        nombre: ProveedorData.nombre,
        direccion: ProveedorData.direccion,
        telefono: ProveedorData.telefono,
        idBanco: ProveedorData.idBanco,
        plazoPago: ProveedorData.plazoPago,
        correo: ProveedorData.correo,
        rfc: ProveedorData.rfc,
        razonSocial: ProveedorData.razonSocial,
        clabe: ProveedorData.clabe,
        usuarioActualiza: ProveedorData.usuarioActualiza
      };
      return this.http.post<defaultApiResponse>(`${this.apiUrl}/Proveedores/Insert`, body);
    }
    deleteProveedor(Id: number): Observable<any> {
      return this.http.put(`${this.apiUrl}/Proveedores/Delete`, { Id });
    }
    updateProveedor(ProveedorData: updateProveedorModel): Observable<defaultApiResponse> {
      const body = {
        id: ProveedorData.id,
        nombre: ProveedorData.nombre,
        direccion: ProveedorData.direccion,
        telefono: ProveedorData.telefono,
        idBanco: ProveedorData.idBanco,
        plazoPago: ProveedorData.plazoPago,
        correo: ProveedorData.correo,
        rfc: ProveedorData.rfc,
        razonSocial: ProveedorData.razonSocial,
        clabe: ProveedorData.clabe,
        usuarioActualiza: ProveedorData.usuarioActualiza
      };
      console.log("Enviando solicitud con el siguiente cuerpo:", body);
      return this.http.put<defaultApiResponse>(`${this.apiUrl}/Proveedores/Update`, body);
    }
  }
    //----------------------------------------------------------------------------------------------

  @Injectable({
    providedIn: "root",
  })
  export class UsusariosService {
    //Se especifica la url base de la API
    private apiUrl = "http://localhost:5020/api";
    constructor(private http: HttpClient,private authService: AuthService) {}
  
    getUsuarios(): Observable<defaultApiResponse> {
      const token = this.authService.getToken();
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
      });
      return this.http.get<defaultApiResponse>(`${this.apiUrl}/Usuarios/Get`,{headers});
    }
  
    // insertarPersona(PersonaData: {
    //   nombre: string;
    //   ApPaterno: string;
    //   ApMaterno: string;
    //   direccion: string;
    //   usuario: number;
    // }): Observable<defaultApiResponse> {
    //   const body = {
    //     nombre: PersonaData.nombre,
    //     ApPaterno: PersonaData.ApPaterno,
    //     ApMaterno: PersonaData.ApMaterno,
    //     direccion: PersonaData.direccion,
    //     usuario: PersonaData.usuario,
    //     Direccion: PersonaData.direccion,
    //     Usuario: PersonaData.usuario,
    //   };
    //   return this.http.post<defaultApiResponse>(`${this.apiUrl}/Personas/Insert`, body);
    // }
    
    // deleteUsuario(Id: number): Observable<any> {
    //   return this.http.put(`${this.apiUrl}/Usuarios/Delete`, { Id });
    // }
    
    updateUsuario(UsuarioData: updateUsuarioModel): Observable<defaultApiResponse> {
      const body = {
        id: UsuarioData.id,
        usuario: UsuarioData.usuario,
        contrasena: UsuarioData.contrasena
      };
      console.log("Enviando solicitud con el siguiente cuerpo:", body);
      return this.http.put<defaultApiResponse>(`${this.apiUrl}/Usuarios/Update`, body);
    }
}
    //----------------------------------------------------------------------------------------------

    @Injectable({
      providedIn: "root",
    })
    export class SucursalesService {
      //Se especifica la url base de la API
      private apiUrl = "http://localhost:5020/api";
      constructor(private http: HttpClient,private authService: AuthService) {}
    
      getSucursales(): Observable<defaultApiResponse> {
        const token = this.authService.getToken();
        const headers = new HttpHeaders({
          'Authorization': `Bearer ${token}`
        });
        return this.http.get<defaultApiResponse>(`${this.apiUrl}/Sucursales/Get`,{headers});
      }
    
      insertarSucursal(SucursalData: sucursalInsertModel): Observable<defaultApiResponse> {
        const body = {
          nombre: SucursalData.nombre,
          direccion: SucursalData.direccion,
          idUsuario: SucursalData.idUsuario
        };
        return this.http.post<defaultApiResponse>(`${this.apiUrl}/Sucursales/Insert`, body);
      }
      deleteSucursal(Id: number): Observable<any> {
        return this.http.put(`${this.apiUrl}/Sucursales/Delete`, { Id });
      }
      updateSucursal(SucursalData: sucursalUpdateModel): Observable<defaultApiResponse> {
        const body = {
          id: SucursalData.id,
          nombre: SucursalData.nombre,
          direccion: SucursalData.direccion,
          idUsuario: SucursalData.idUsuario
        };
        console.log("Enviando solicitud con el siguiente cuerpo:", body);
        return this.http.put<defaultApiResponse>(`${this.apiUrl}/Sucursales/Update`, body);
      }
    }
      //----------------------------------------------------------------------------------------------

      @Injectable({
        providedIn: "root",
      })
      export class EntradasService {
        //Se especifica la url base de la API
        private apiUrl = "http://localhost:5020/api";
        constructor(private http: HttpClient,private authService: AuthService) {}
      
        getEntradas(): Observable<defaultApiResponse> {
          const token = this.authService.getToken();
          const headers = new HttpHeaders({
            'Authorization': `Bearer ${token}`
          });
          return this.http.get<defaultApiResponse>(`${this.apiUrl}/Entradas/Get`,{headers});
        }
      
        insertarEntrada(EntradaData: entradasInsertModel): Observable<defaultApiResponse> {
          const body = {
            idProveedor: EntradaData.idProveedor,
            factura: EntradaData.factura,
            idSurcursal: EntradaData.idSurcursal,
            usuarioActualiza: EntradaData.usuarioActualiza
          };
          return this.http.post<defaultApiResponse>(`${this.apiUrl}/Entradas/Insert`, body);
        }
        deleteEntrada(Id: number): Observable<any> {
          return this.http.put(`${this.apiUrl}/Entradas/Delete`, { Id });
        }
        updateProveedor(ProveedorData: updateProveedorModel): Observable<defaultApiResponse> {
          const body = {
            id: ProveedorData.id,
            nombre: ProveedorData.nombre,
            direccion: ProveedorData.direccion,
            telefono: ProveedorData.telefono,
            idBanco: ProveedorData.idBanco,
            plazoPago: ProveedorData.plazoPago,
            correo: ProveedorData.correo,
            rfc: ProveedorData.rfc,
            razonSocial: ProveedorData.razonSocial,
            clabe: ProveedorData.clabe,
            usuarioActualiza: ProveedorData.usuarioActualiza
          };
          console.log("Enviando solicitud con el siguiente cuerpo:", body);
          return this.http.put<defaultApiResponse>(`${this.apiUrl}/Entradas/Update`, body);
        }
      }
        //----------------------------------------------------------------------------------------------
        @Injectable({
          providedIn: "root",
        })
        export class InsumosService {
          //Se especifica la url base de la API
          private apiUrl = "http://localhost:5020/api";
          constructor(private http: HttpClient,private authService: AuthService) {}
          
          getInsumos(): Observable<defaultApiResponse> {
            const token = this.authService.getToken();
            const headers = new HttpHeaders({
              'Authorization': `Bearer ${token}`
            });
            return this.http.get<defaultApiResponse>(`${this.apiUrl}/Insumos/Get`,{headers});
          }
        
          insertarInsumo(ProveedorData: insertInsumosModel): Observable<defaultApiResponse> {
            const body = {
              costo: ProveedorData.costo,
              insumo:ProveedorData.insumo,
              descripcionInsumo: ProveedorData.descripcionInsumo,
              unidadMedida: ProveedorData.unidadMedida,
              usuarioActualiza: ProveedorData.usuarioActualiza
            };
            return this.http.post<defaultApiResponse>(`${this.apiUrl}/Insumos/Insert`, body);
          }
          deleteInsumo(Id: number): Observable<any> {
            return this.http.put(`${this.apiUrl}/Insumos/Delete`, { Id });
          }
          updateInsumo(ProveedorData: updateInsumosModel): Observable<defaultApiResponse> {
            const body = {
              id: ProveedorData.id,
              costo: ProveedorData.costo,
              insumo:ProveedorData.insumo,
              descripcionInsumo: ProveedorData.descripcionInsumo,
              unidadMedida: ProveedorData.unidadMedida,
              usuarioActualiza: ProveedorData.usuarioActualiza
            };
            console.log("Enviando solicitud con el siguiente cuerpo:", body);
            return this.http.put<defaultApiResponse>(`${this.apiUrl}/Insumos/Update`, body);
          }
        }
            //----------------------------------------------------------------------------------------------
            @Injectable({
              providedIn: "root",
            })
            export class OrdenComprasService {
              //Se especifica la url base de la API
              private apiUrl = "http://localhost:5020/api";
              constructor(private http: HttpClient,private authService: AuthService) {}
            
              getOrdenCompras(): Observable<defaultApiResponse> {
                const token = this.authService.getToken();
                const headers = new HttpHeaders({
                  'Authorization': `Bearer ${token}`
                });
                return this.http.get<defaultApiResponse>(`${this.apiUrl}/OrdenCompras/Get`,{headers});
              }
            
              insertarOrdenCompra(OrdenComprasData:insertCompraModel): Observable<defaultApiResponse> {
                const body = {
                  idProveedor: OrdenComprasData.idProveedor,
                  idSucursal: OrdenComprasData.idSucursal,
                  idComprador: OrdenComprasData.idComprador,
                  usuarioActualiza: OrdenComprasData.usuarioActualiza
                };
                return this.http.post<defaultApiResponse>(`${this.apiUrl}/OrdenCompra/Insert`, body);
              }
              deleteOrdenCompra(Id: number): Observable<any> {
                return this.http.put(`${this.apiUrl}/OrdenCompra/Delete`, { Id });
              }
              updateOrdenCompra(OrdenCompraData: updateCompraModel): Observable<defaultApiResponse> {
                const body = {
                  idOrden: OrdenCompraData.id,
                  idProveedor: OrdenCompraData.idProveedor,
                  fechaLegada: OrdenCompraData.FechaLegada,
                  idSucursal: OrdenCompraData.idSucursal,
                  idComprador: OrdenCompraData.idComprador,
                  usuarioActualiza: OrdenCompraData.usuarioActualiza
                };
                console.log("Enviando solicitud con el siguiente cuerpo:", body);
                return this.http.put<defaultApiResponse>(`${this.apiUrl}/OrdenCompra/Update`, body);
              }
            }
            @Injectable({
              providedIn: "root",
            })
            export class RecetasService {
              //Se especifica la url base de la API
              private apiUrl = "http://localhost:5020/api";
              constructor(private http: HttpClient,private authService: AuthService) {}
            
              getRecetas(): Observable<defaultApiResponse> {
                const token = this.authService.getToken();
                const headers = new HttpHeaders({
                  'Authorization': `Bearer ${token}`
                });
                return this.http.get<defaultApiResponse>(`${this.apiUrl}/Recetas/Get`,{headers});
              }
            
              insertarReceta(PersonaData: insertRecetaModel): Observable<defaultApiResponse> {
                const body = {
                  nombre: PersonaData.nombre,
                  usuarioRegistra: PersonaData.usuarioRegistra,
                  usuarioActualiza: PersonaData.usuarioActualiza
                };
                return this.http.post<defaultApiResponse>(`${this.apiUrl}/Recetas/Insert`, body);
              }
              deletePersonas(Id: number): Observable<any> {
                return this.http.put(`${this.apiUrl}/Personas/Delete`, { Id });
              }
              updatePersonas(PersonaData: updateRecetasModel): Observable<defaultApiResponse> {
                const body = {
                  id: PersonaData.id,
                  nombre: PersonaData.nombre,
                  usuarioActualiza: PersonaData.usuarioActualiza
                };
                console.log("Enviando solicitud con el siguiente cuerpo:", body);
                return this.http.put<defaultApiResponse>(`${this.apiUrl}/Personas/Update`, body);
              }
            }
      