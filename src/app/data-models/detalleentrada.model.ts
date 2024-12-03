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