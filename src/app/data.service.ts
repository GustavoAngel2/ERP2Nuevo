import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { defaultApiResponse } from './data-models/response.model';
import { AuthService } from './auth.service';
import { InsertPersonasModel, UpdatePersonasModel } from './data-models/personas.model';
import { updateUsuarioModel } from './data-models/usuario.model';
import { insertProveedorModel, updateProveedorModel } from './data-models/proveedores.model';
import { entradasInsertModel } from './data-models/entradas.model';
import { sucursalInsertModel, sucursalUpdateModel } from './data-models/sucursales.model';
import { insertCompraModel, updateCompraModel } from './data-models/orden-compra.model';
import { insertInsumosModel, updateInsumosModel } from './data-models/insumos.model';
import { detallecomprasInsertModel, detallecoprasUpdateModel } from './data-models/detalleorden.model';
import { insertRecetaModel, updateRecetasModel } from './data-models/recetas.model';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { insertDetRecetaModel } from './data-models/detallereceta.model';
import { insertArticuloModel, updateArticuloModel } from './data-models/articulos.model';



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

  insertarPersona(PersonaData:InsertPersonasModel): Observable<defaultApiResponse> {
    const body = {
      nombre: PersonaData.Nombre,
      apPaterno: PersonaData.ApPaterno,
      apMaterno: PersonaData.ApMaterno,
      direccion: PersonaData.Direccion,
      usuario: PersonaData.Usuario
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
      usuarioActualiza: ProveedorData.usuarioActualiza,
      insumosUP: ProveedorData.insumosUP
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
      usuarioActualiza: ProveedorData.usuarioActualiza,
      insumosUP: ProveedorData.insumosUP
    };
    
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
    return this.http.get<defaultApiResponse>(`${this.apiUrl}/OrdenCompra/Get`,{headers});
  }

  insertarOrdenCompra(OrdenComprasData:insertCompraModel): Observable<defaultApiResponse> {
    const body = {
      idProveedor: OrdenComprasData.idProveedor,
      fechaLlegada:OrdenComprasData.fechaLlegada,
      idSurcursal: OrdenComprasData.idSucursal,
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
      fechaLlegada: OrdenCompraData.fechaLlegada,
      idSurcursal: OrdenCompraData.idSucursal,
      idComprador: OrdenCompraData.idComprador,
      usuarioActualiza: OrdenCompraData.usuarioActualiza
    };
    
    return this.http.put<defaultApiResponse>(`${this.apiUrl}/OrdenCompra/Update`, body);
  }
}

@Injectable({
  providedIn: "root",
})
export class DetalleOrdenComprasService {
  //Se especifica la url base de la API
  private apiUrl = "http://localhost:5020/api";
  constructor(private http: HttpClient,private authService: AuthService) {}

  getDetalleOrdenCompras(Id:number): Observable<defaultApiResponse> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<defaultApiResponse>(`${this.apiUrl}/DetalleOrdenCompra/Get?idOrdenCompra=${Id}`,{headers});
  }

  insertarDetalleOrdenCompra(OrdenComprasData:detallecomprasInsertModel): Observable<defaultApiResponse> {
    const body = {
      idOrdenCompra: OrdenComprasData.idOrdenCompra,
      insumo: OrdenComprasData.insumo,
      cantidad: OrdenComprasData.cantidad,
      usuarioActualiza: OrdenComprasData.usuarioActualiza
    };
    return this.http.post<defaultApiResponse>(`${this.apiUrl}/DetalleOrdenCompra/Insert`, body);
  }
  deleteDetalleOrdenCompra(Id: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/DetalleOrdenCompra/Delete`, { Id });
  }
  updateDetalleOrdenCompra(OrdenCompraData: detallecoprasUpdateModel): Observable<defaultApiResponse> {
    const body = {
      id: OrdenCompraData.id,
      idOrdenCompra: OrdenCompraData.idOrdenCompra,
      cantidadRecibida: OrdenCompraData.cantidadRecibida,
      estatus: OrdenCompraData.estatus,
      usuarioActualiza: OrdenCompraData.usuarioActualiza
    };
    
    return this.http.put<defaultApiResponse>(`${this.apiUrl}/DetalleOrdenCompra/Update`, body);
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

  insertarReceta(RecetasData: insertRecetaModel): Observable<defaultApiResponse> {
    const body = {
      nombre: RecetasData.nombre,
      usuarioRegistra: RecetasData.usuarioRegistra,
      usuarioActualiza: RecetasData.usuarioActualiza
    };
    return this.http.post<defaultApiResponse>(`${this.apiUrl}/Recetas/Insert`, body);
  }

  deleteRecetas(Id: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/recetas/Delete`, { Id });
  }

  updateRecetas(RecetasData: updateRecetasModel): Observable<defaultApiResponse> {
    const body = {
      id: RecetasData.id,
      nombre: RecetasData.nombre,
      usuarioActualiza: RecetasData.usuarioActualiza
    };
    console.log("Enviando solicitud con el siguiente cuerpo:", body);
    return this.http.put<defaultApiResponse>(`${this.apiUrl}/recetas/Update`, body);
  }
}
/* ----------------------------------------------------------------------------------------------------------------- */
@Injectable({
  providedIn: "root",
  })
  export class DetalleRecetasService {
  //Se especifica la url base de la API
  private apiUrl = "http://localhost:5020/api";
  constructor(private http: HttpClient,private authService: AuthService) {}
  
  getDetRecetas(Id: number): Observable<defaultApiResponse> {
  const token = this.authService.getToken();
  const headers = new HttpHeaders({
  'Authorization': `Bearer ${token}`
  });
  return this.http.get<defaultApiResponse>(`${this.apiUrl}/DetalleReceta/Get?idReceta=${Id}`,{headers}, );
  }
  
    insertDetReceta(DetRecetasData: insertDetRecetaModel): Observable<defaultApiResponse> {
      const body = {
        idReceta: DetRecetasData.idReceta,
        insumo:DetRecetasData.insumo,
        cantidad:DetRecetasData.cantidad,
        usuarioActualiza: DetRecetasData.usuarioActualiza
      };
      return this.http.post<defaultApiResponse>(`${this.apiUrl}/DetalleReceta/Insert`, body);
    }
    deleteDetRecetas(Id: number): Observable<any> {
      return this.http.put(`${this.apiUrl}/DetalleReceta/Delete`, { Id });
    }


  updateDetRecetas(RecetasData: updateRecetasModel): Observable<defaultApiResponse> {
      const body = {
      id: RecetasData.id,
      nombre: RecetasData.nombre,
      usuarioActualiza: RecetasData.usuarioActualiza
      };
      console.log("Enviando solicitud con el siguiente cuerpo:", body);
      return this.http.put<defaultApiResponse>(`${this.apiUrl}/recetas/Update`, body);
      }
  }


/* ----------------------------------------------------------------------------------------------------------------- */
@Injectable({
  providedIn: "root",
  })
  export class ArticulosService {
  //Se especifica la url base de la API
  private apiUrl = "http://localhost:5020/api";
  constructor(private http: HttpClient,private authService: AuthService) {}
  
  getArticulos(): Observable<defaultApiResponse> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<defaultApiResponse>(`${this.apiUrl}/Articulos/Get`,{headers}, );
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
    return this.http.post<defaultApiResponse>(`${this.apiUrl}/Articulos/Insert`, body);
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
    return this.http.put<defaultApiResponse>(`${this.apiUrl}/Articulos/Update`, body);
    }

    deleteArticulo(Id: number): Observable<any> {
      return this.http.put(`${this.apiUrl}/Articulos/Delete`, { Id });
    }
}   
/* ---------------------------------------------------------------------------------------------------------------------------------- */
@Injectable({
  providedIn: "root",
})
export class UMservice {
  //Se especifica la url base de la API
  private apiUrl = "http://localhost:5020/api";
  constructor(private http: HttpClient,private authService: AuthService) {}

  getUM(): Observable<defaultApiResponse> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<defaultApiResponse>(`${this.apiUrl}/UnidadMedida/Get`,{headers});
  }
}