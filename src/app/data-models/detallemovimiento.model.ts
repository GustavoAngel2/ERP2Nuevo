export interface DetMovInsertModel
{
  IdMovimiento : number,
  insumo: string,
  cantidad: number,
  usuarioActualiza: number;
}

export interface DetMovGetModel
{
  Id: number;
  IdMovimiento: number;
  Insumo: string;
  Descripcion :string;
  Cantidad: number;
  FechaRegistro: string;
  FechaActualiza: string;
  UsuarioActualiza: string;
}

export interface DetMovUpdateModel
{
  Id: number,
  insumo: string,
  cantidad:number,
  estatus: number,
  usuarioActualiza: number
}