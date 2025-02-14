export interface entradasInsertModel{
  idProveedor: number;
  factura: string;
  idSurcursal: number;
  usuarioActualiza: number;
}

export interface entradasUpdateModel{
  id : number;
  idProveedor: string;
  factura: string;
  idSurcursal: number;
  fechaEntrega: Date;
  usuarioActualiza: number;
}

export interface entradasModel{
  Estatus: number;
  Factura: number;
  FechaActualiza: string;
  FechaEntrega: string;
  FechaRegistro: string;
  Id: number;
  Mensaje: string;
  nullProveedor: string;
  Surcursal: string;
  UsuarioActualiza: string
}