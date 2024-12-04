import { insertDetalleTraspasoModel, detalleTraspasoModel } from './data-models/detalletraspaso.model';
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
import { insertDetRecetaModel } from './data-models/detallereceta.model';
import { insertArticuloModel, updateArticuloModel } from './data-models/articulos.model';
import { insertMovModel } from './data-models/Movimiento.model';
import { DetMovInsertModel } from './data-models/detallemovimiento.model';
import { insertTraspasoModel,getTraspasosModel } from './data-models/traspasos.model';
import { ERP } from './erp-settings';
import { ReporteKardexMov, ReporteKardexMovSearch } from './data-models/reportes.model';
import { updatebancosModel } from './data-models/bancos.model';


@Injectable({
  providedIn: "root",
})
export class PersonasService {
  //Se especifica la url base de la API

  constructor(private http: HttpClient,private authService: AuthService, private erp:ERP) {}

  getPersonas(): Observable<defaultApiResponse> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    console.log(this.http.get<defaultApiResponse>(`${this.erp.apiUrl}/Personas/Get`,{headers}))
    return this.http.get<defaultApiResponse>(`${this.erp.apiUrl}/Personas/Get`,{headers});
  }

  insertarPersona(PersonaData:InsertPersonasModel): Observable<defaultApiResponse> {
    const body = {
      nombre: PersonaData.Nombre,
      apPaterno: PersonaData.ApPaterno,
      apMaterno: PersonaData.ApMaterno,
      direccion: PersonaData.Direccion,
      usuario: PersonaData.Usuario
    };
    return this.http.post<defaultApiResponse>(`${this.erp.apiUrl}/Personas/Insert`, body);
  }

  deletePersonas(Id: number): Observable<any> {
    return this.http.put(`${this.erp.apiUrl}/Personas/Delete`, { Id });
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

    return this.http.put<defaultApiResponse>(`${this.erp.apiUrl}/Personas/Update`, body);
  }
}

//----------------------------------------------------------------------------------------------
@Injectable({
  providedIn: "root",
})
export class ProveedoresService {
  //Se especifica la url base de la API

  constructor(private http: HttpClient,private authService: AuthService, private erp:ERP) {}

  getProveedores(): Observable<defaultApiResponse> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<defaultApiResponse>(`${this.erp.apiUrl}/Proveedores/Get`,{headers});
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
    return this.http.post<defaultApiResponse>(`${this.erp.apiUrl}/Proveedores/Insert`, body);
  }
  deleteProveedor(Id: number): Observable<any> {
    return this.http.put(`${this.erp.apiUrl}/Proveedores/Delete`, { Id });
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

    return this.http.put<defaultApiResponse>(`${this.erp.apiUrl}/Proveedores/Update`, body);
  }
}
  //----------------------------------------------------------------------------------------------
@Injectable({
  providedIn: "root",
})
export class UsusariosService {
  //Se especifica la url base de la API

  constructor(private http: HttpClient,private authService: AuthService, private erp:ERP) {}

  getUsuarios(): Observable<defaultApiResponse> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<defaultApiResponse>(`${this.erp.apiUrl}/Usuarios/Get`,{headers});
  }
  obtenerImagenUsuario(id: number): Observable<Blob> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    // Endpoint de la API para obtener la imagen del usuario
    return this.http.get(`${this.erp.apiUrl}/Imagen/VerImagen/${id}`, { headers, responseType: 'blob' });
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
  //   return this.http.post<defaultApiResponse>(`${this.erp.apiUrl}/Personas/Insert`, body);
  // }

  // deleteUsuario(Id: number): Observable<any> {
  //   return this.http.put(`${this.erp.apiUrl}/Usuarios/Delete`, { Id });
  // }

  updateUsuario(UsuarioData: updateUsuarioModel): Observable<defaultApiResponse> {
    const body = {
      id: UsuarioData.id,
      usuario: UsuarioData.usuario,
      contrasena: UsuarioData.contrasena
    };

    return this.http.put<defaultApiResponse>(`${this.erp.apiUrl}/Usuarios/Update`, body);
  }
}
//----------------------------------------------------------------------------------------------
@Injectable({
  providedIn: "root",
})
export class SucursalesService {
  //Se especifica la url base de la API

  constructor(private http: HttpClient,private authService: AuthService, private erp:ERP) {}

  getSucursales(): Observable<defaultApiResponse> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<defaultApiResponse>(`${this.erp.apiUrl}/Sucursales/Get`,{headers});
  }

  insertarSucursal(SucursalData: sucursalInsertModel): Observable<defaultApiResponse> {
    const body = {
      nombre: SucursalData.nombre,
      direccion: SucursalData.direccion,
      idUsuario: SucursalData.idUsuario
    };
    return this.http.post<defaultApiResponse>(`${this.erp.apiUrl}/Sucursales/Insert`, body);
  }
  deleteSucursal(Id: number): Observable<any> {
    return this.http.put(`${this.erp.apiUrl}/Sucursales/Delete`, { Id });
  }
  updateSucursal(SucursalData: sucursalUpdateModel): Observable<defaultApiResponse> {
    const body = {
      id: SucursalData.id,
      nombre: SucursalData.nombre,
      direccion: SucursalData.direccion,
      idUsuario: SucursalData.idUsuario
    };

    return this.http.put<defaultApiResponse>(`${this.erp.apiUrl}/Sucursales/Update`, body);
  }
}
    //----------------------------------------------------------------------------------------------
@Injectable({
  providedIn: "root",
})
export class EntradasService {
  //Se especifica la url base de la API

  constructor(private http: HttpClient,private authService: AuthService, private erp:ERP) {}

  getEntradas(): Observable<defaultApiResponse> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<defaultApiResponse>(`${this.erp.apiUrl}/Entradas/Get`,{headers});
  }

  insertarEntrada(EntradaData: entradasInsertModel): Observable<defaultApiResponse> {
    const body = {
      idProveedor: EntradaData.idProveedor,
      factura: EntradaData.factura,
      idSurcursal: EntradaData.idSurcursal,
      usuarioActualiza: EntradaData.usuarioActualiza
    };
    return this.http.post<defaultApiResponse>(`${this.erp.apiUrl}/Entradas/Insert`, body);
  }
  deleteEntrada(Id: number): Observable<any> {
    return this.http.put(`${this.erp.apiUrl}/Entradas/Delete`, { Id });
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

    return this.http.put<defaultApiResponse>(`${this.erp.apiUrl}/Entradas/Update`, body);
  }
}
//----------------------------------------------------------------------------------------------
@Injectable({
  providedIn: "root",
})
export class InsumosService {
  //Se especifica la url base de la API

  constructor(private http: HttpClient,private authService: AuthService, private erp:ERP) {}
  getInsumos(): Observable<defaultApiResponse> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<defaultApiResponse>(`${this.erp.apiUrl}/Insumos/Get`,{headers});
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
    return this.http.post<defaultApiResponse>(`${this.erp.apiUrl}/Insumos/Insert`, body);
  }
  deleteInsumo(Id: number): Observable<any> {
    return this.http.put(`${this.erp.apiUrl}/Insumos/Delete`, { Id });
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

    return this.http.put<defaultApiResponse>(`${this.erp.apiUrl}/Insumos/Update`, body);
  }
}
//----------------------------------------------------------------------------------------------
@Injectable({
  providedIn: "root",
})
export class OrdenComprasService {
  //Se especifica la url base de la API

  constructor(private http: HttpClient,private authService: AuthService, private erp:ERP) {}

  getOrdenCompras(): Observable<defaultApiResponse> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<defaultApiResponse>(`${this.erp.apiUrl}/OrdenCompra/Get`,{headers});
  }

  insertarOrdenCompra(OrdenComprasData:insertCompraModel): Observable<defaultApiResponse> {
    const body = {
      idProveedor: OrdenComprasData.idProveedor,
      fechaLlegada:OrdenComprasData.fechaLlegada,
      idSucursal: OrdenComprasData.idSucursal,
      idComprador: OrdenComprasData.idComprador,
      usuarioActualiza: OrdenComprasData.usuarioActualiza
    };
    return this.http.post<defaultApiResponse>(`${this.erp.apiUrl}/OrdenCompra/Insert`, body);
  }
  deleteOrdenCompra(Id: number): Observable<any> {
    return this.http.put(`${this.erp.apiUrl}/OrdenCompra/Delete`, { Id });
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

    return this.http.put<defaultApiResponse>(`${this.erp.apiUrl}/OrdenCompra/Update`, body);
  }
}
/* --------------------------------------------------------------------------------------------------------------------- */
@Injectable({
  providedIn: "root",
})
export class DetalleOrdenComprasService {
  //Se especifica la url base de la API

  constructor(private http: HttpClient,private authService: AuthService, private erp:ERP) {}

  getDetalleOrdenCompras(Id:number): Observable<defaultApiResponse> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<defaultApiResponse>(`${this.erp.apiUrl}/DetalleOrdenCompra/Get?idOrdenCompra=${Id}`,{headers});
  }

  insertarDetalleOrdenCompra(OrdenComprasData:detallecomprasInsertModel): Observable<defaultApiResponse> {
    const body = {
      idOrdenCompra: OrdenComprasData.idOrdenCompra,
      insumo: OrdenComprasData.insumo,
      cantidad: OrdenComprasData.cantidad,
      usuarioActualiza: OrdenComprasData.usuarioActualiza
    };
    return this.http.post<defaultApiResponse>(`${this.erp.apiUrl}/DetalleOrdenCompra/Insert`, body);
  }
  deleteDetalleOrdenCompra(Id: number): Observable<any> {
    return this.http.put(`${this.erp.apiUrl}/DetalleOrdenCompra/Delete`, { Id });
  }
  updateDetalleOrdenCompra(OrdenCompraData: detallecoprasUpdateModel): Observable<defaultApiResponse> {
    const body = {
      id: OrdenCompraData.id,
      idOrdenCompra: OrdenCompraData.idOrdenCompra,
      cantidadRecibida: OrdenCompraData.cantidadRecibida,
      estatus: OrdenCompraData.estatus,
      usuarioActualiza: OrdenCompraData.usuarioActualiza
    };

    return this.http.put<defaultApiResponse>(`${this.erp.apiUrl}/DetalleOrdenCompra/Update`, body);
  }
}
/* --------------------------------------------------------------------------------------------------------------------- */
@Injectable({
  providedIn: "root",
})
export class RecetasService {
  //Se especifica la url base de la API

  constructor(private http: HttpClient,private authService: AuthService, private erp:ERP) {}

  getRecetas(): Observable<defaultApiResponse> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<defaultApiResponse>(`${this.erp.apiUrl}/Recetas/Get`,{headers});
  }

  insertarReceta(RecetasData: insertRecetaModel): Observable<defaultApiResponse> {
    const body = {
      nombre: RecetasData.nombre,
      usuarioRegistra: RecetasData.usuarioRegistra,
      usuarioActualiza: RecetasData.usuarioActualiza
    };
    return this.http.post<defaultApiResponse>(`${this.erp.apiUrl}/Recetas/Insert`, body);
  }

  deleteRecetas(Id: number): Observable<any> {
    return this.http.put(`${this.erp.apiUrl}/recetas/Delete`, { Id });
  }

  updateRecetas(RecetasData: updateRecetasModel): Observable<defaultApiResponse> {
    const body = {
      id: RecetasData.id,
      nombre: RecetasData.nombre,
      usuarioActualiza: RecetasData.usuarioActualiza
    };
    console.log("Enviando solicitud con el siguiente cuerpo:", body);
    return this.http.put<defaultApiResponse>(`${this.erp.apiUrl}/recetas/Update`, body);
  }
}
/* ----------------------------------------------------------------------------------------------------------------- */
@Injectable({
  providedIn: "root",
  })
  export class DetalleRecetasService {
  //Se especifica la url base de la API

  constructor(private http: HttpClient,private authService: AuthService, private erp:ERP) {}

  getDetRecetas(Id: number): Observable<defaultApiResponse> {
  const token = this.authService.getToken();
  const headers = new HttpHeaders({
  'Authorization': `Bearer ${token}`
  });
  return this.http.get<defaultApiResponse>(`${this.erp.apiUrl}/DetalleReceta/Get?idReceta=${Id}`,{headers}, );
  }

    insertDetReceta(DetRecetasData: insertDetRecetaModel): Observable<defaultApiResponse> {
      const body = {
        idReceta: DetRecetasData.idReceta,
        insumo:DetRecetasData.insumo,
        cantidad:DetRecetasData.cantidad,
        usuarioActualiza: DetRecetasData.usuarioActualiza
      };
      return this.http.post<defaultApiResponse>(`${this.erp.apiUrl}/DetalleReceta/Insert`, body);
    }
    deleteDetRecetas(Id: number): Observable<any> {
      return this.http.put(`${this.erp.apiUrl}/DetalleReceta/Delete`, { Id });
    }


  updateDetRecetas(RecetasData: updateRecetasModel): Observable<defaultApiResponse> {
      const body = {
      id: RecetasData.id,
      nombre: RecetasData.nombre,
      usuarioActualiza: RecetasData.usuarioActualiza
      };
      console.log("Enviando solicitud con el siguiente cuerpo:", body);
      return this.http.put<defaultApiResponse>(`${this.erp.apiUrl}/recetas/Update`, body);
      }
  }
/* ----------------------------------------------------------------------------------------------------------------- */
@Injectable({
  providedIn: "root",
  })
  export class ArticulosService {
  //Se especifica la url base de la API

  constructor(private http: HttpClient,private authService: AuthService, private erp:ERP) {}

  getArticulos(): Observable<defaultApiResponse> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<defaultApiResponse>(`${this.erp.apiUrl}/Articulos/Get`,{headers}, );
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
    return this.http.post<defaultApiResponse>(`${this.erp.apiUrl}/Articulos/Insert`, body);
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
    return this.http.put<defaultApiResponse>(`${this.erp.apiUrl}/Articulos/Update`, body);
    }

    deleteArticulo(Id: number): Observable<any> {
      return this.http.put(`${this.erp.apiUrl}/Articulos/Delete`, { Id });
    }
}
/* ---------------------------------------------------------------------------------------------------------------------------------- */
@Injectable({
  providedIn: "root",
})
export class UMservice {
  //Se especifica la url base de la API

  constructor(private http: HttpClient,private authService: AuthService, private erp:ERP) {}

  getUM(): Observable<defaultApiResponse> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<defaultApiResponse>(`${this.erp.apiUrl}/UnidadMedida/Get`,{headers});
  }
}
/* ----------------------------------------------------------------------------------------------------------------------------------------- */
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
/* ----------------------------------------------------------------------------------------------------------------------------------- */

@Injectable({
  providedIn: "root",
})
export class TraspasosService {
  //Se especifica la url base de la API

  constructor(private http: HttpClient,private authService: AuthService, private erp:ERP) {}

  getTraspasos(search:getTraspasosModel): Observable<defaultApiResponse> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    console.log(search)
    return this.http.get<defaultApiResponse>(`${this.erp.apiUrl}/Traspasos/Get?pAlmacenOrigen=${search.pAlmacenOrigen}&pAlmacenDestino=${search.pAlmacenDestino}&pFechaInicio=${encodeURIComponent(search.pFechaInicio.replace(/-/g, '/'))}&pFechaFinal=${encodeURIComponent(search.pFechaFinal.replace(/-/g, '/'))}`,{headers});
  }
  insertTraspaso(ArticuloData: insertTraspasoModel): Observable<defaultApiResponse> {
    const body = {
      idAlmacenOrigen: ArticuloData.idAlmacenOrigen,
      idAlmacenDestino: ArticuloData.idAlmacenDestino,
      usuarioEnvia: ArticuloData.usuarioEnvia,
      usuarioActualiza: ArticuloData.usuarioActualiza
    };
    return this.http.post<defaultApiResponse>(`${this.erp.apiUrl}/Traspasos/Insert`, body);
  }
  deleteTraspaso(Id: number): Observable<any> {
    return this.http.put(`${this.erp.apiUrl}/Traspasos/Delete`, { Id });
  }
}
  /* ---------------------------------------------------------------------------------------------------------------------------------- */
@Injectable({
  providedIn: "root",
})
export class DetalleTraspasosService {
  //Se especifica la url base de la API

  constructor(private http: HttpClient,private authService: AuthService, private erp:ERP) {}

  getDetalleTraspaso(search:number): Observable<defaultApiResponse> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    console.log(search)
    return this.http.get<defaultApiResponse>(`${this.erp.apiUrl}/DetalleTraspaso/Get?idTraspaso=${search}`,{headers});
  }
  insertDetalleTraspaso(ArticuloData: insertDetalleTraspasoModel): Observable<defaultApiResponse> {
    const body = {
      insumo:ArticuloData.insumo,
      idTraspaso:ArticuloData.idTraspaso,
      cantidadEnviada:ArticuloData.cantidadEnviada,
      usuarioActualiza:ArticuloData.usuarioActualiza
    };
    return this.http.post<defaultApiResponse>(`${this.erp.apiUrl}/DetalleTraspaso/Insert`, body);
  }
  deleteDetalleTraspaso(Id: number): Observable<any> {
    return this.http.put(`${this.erp.apiUrl}/DetalleTraspaso/Delete`, { Id });
  }
}
/*-------------------------------------------------------*/

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
 /*---------------------------------------*/
 @Injectable({
  providedIn: "root",
})
export class bancosService {

  constructor(private http: HttpClient,private authService: AuthService,private erp:ERP) {}

  deletebancos(Id: number): Observable<any> {
    return this.http.put(`${this.erp.apiUrl}/bancos/Delete`, { Id });
  }

  updatebancos(bancosData: updatebancosModel): Observable<defaultApiResponse> {
   const body = {
    id: bancosData.Id,
    nombre: bancosData.nombre,
    Direccion: bancosData.Direccion,
    UsuarioActualiza: bancosData.UsuarioActualiza
  }
  console.log("Enviando solicitud con el siguiente cuerpo:", body);
  return this.http.put<defaultApiResponse>(`${this.erp.apiUrl}/bancos/Update`, body);
  }

  getBancos(): Observable<defaultApiResponse> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<defaultApiResponse>(`${this.erp.apiUrl}/bancos/Get`,{headers});
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
    return this.http.post<defaultApiResponse>(`${this.erp.apiUrl}/bancos/Insert`, body);
  }
}
