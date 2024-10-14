export interface detallecomprasInsertModel
{
  idOrdenCompra : number,
  insumo: string,
  cantidad: number,
  usuarioActualiza: number;
}

export interface detallecomprasGetModel
{
  Id: number;
  IdOrdenCompra: number;
  Insumo: string;
  Cantidad: number;
  CantidadRecibida: number;
  Costo: number;
  CostoRenglon: string;
  FechaRegistro: string;
  FechaActualiza: string;
  UsuarioActualiza: string;
}

export interface detallecoprasUpdateModel
{
  id: number,
  idOrdenCompra: number,
  cantidadRecibida: number,
  estatus: number,
  usuarioActualiza: number
}