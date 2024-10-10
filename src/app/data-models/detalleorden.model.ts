export interface detallecomprasInsertModel
{
    idOrdenCompra : number,
    insumo: string,
    cantidad: number,
    usuarioActualiza: number;
  }

  export interface detallecomprasGetModel
  {
    Id: number,
    IdOrdenCompra: number,
    Insumo: number,
    Cantidad: number,
    CantidadRecibida: number,
    Costo: number,
    CostoRenglon: number,
    FechaRegistro: number,
    FechaActualiza: number,
    UsuarioActualiza: string,
    Mensaje: string;
  }

  export interface detallecoprasUpdateModel
  {
    id: number,
    insumo: string,
    cantidad: number,
    usuarioActualiza: number,
    estatus: number;
  }