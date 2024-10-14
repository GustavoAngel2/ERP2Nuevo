export interface insertInsumosModel{
    insumo: string;
    descripcionInsumo: string;
    costo: number;
    unidadMedida: number;
    usuarioActualiza: number;
}

export interface updateInsumosModel{
    id: number;
    insumo: string;
    descripcionInsumo: string;
    costo: number;
    unidadMedida: number;
    usuarioActualiza: number;
}

export interface insumosModel {
    Costo: number
    DescripcionInsumo: string
    FechaActualiza: string
    FechaRegistro: string
    Id: number
    Insumo: string
    UnidadMedida: string
    UsuarioActualiza: string
}