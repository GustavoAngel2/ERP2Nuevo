export interface detalleEntradaModel{
  Id: number;
  IdEntrada: number;
  Codigo: string;
  Articulo: string;
  Cantidad: number;
  Costo: number;
  Descuento: number;
  MontoDescuento: number;
  CantidadSinCargo: number;
  Total: number;
  FechaReg: string;
  FechaAct: string;
  UsuarioAct: string
}

export interface insertDetalleEntradaModel{
  idEntrada: number;
  codigo: string;
  cantidad: number;
  costo: number;
  descuento: number;
  usuarioActualiza: number;
}

export interface updateDetalleEntradaModel {
  id:number;
  usuarioActualiza:number;
  estatus:number
}

export interface updateCantSinCargo{
  id:number;
  cantidad:number;
}

export interface getReportEntradas{
  Id: number;
  Entrada_Ligada: number;
  Codigo: string;
  NombreProveedor: string;
  NombreSucursal: string;
  Cantidad: number;
  Costo: number;
  Descuento: number;
  MontoDescuento: number;
  CantidadSinCargo: number;
  Total: number;
  Estatus: string;
  UsuarioActualiza: string;
  FechaRegistro: string;
}

export interface getReportEntradasSearch {
  FechaInicio:string;
  FechaFinal:string;
}
