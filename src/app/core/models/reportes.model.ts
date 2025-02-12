export interface ReporteKardexMov {
    Id: number;
    Movimiento_Ligado: number;
    TipoMovimiento: string;
    Sucursal: string;
    Insumo: string;
    Cantidad: number;
    Estatus: string;
    UsuarioActualiza: string;
    FechaRegistro: string;
    FechaActualiza: string;
}

export interface ReporteKardexMovSearch{
    FechaInicio: string;
    FechaFin:string;
}