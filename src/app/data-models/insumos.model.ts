export interface insertInsumosModel{
    insumo: string;
    descripcionInsumo: string;
    costo: number;
    unidadMedida: number;
    usuarioActualiza: number;
    insumosUP: string;
  }

export interface updateInsumosModel{
    id: number;
    insumo: string;
    descripcionInsumo: string;
    costo: number;
    unidadMedida: number;
    usuarioActualiza: number;
    insumosUP: string;
}

export interface insumosModel {
    Costo: number;
    Descripcion: string;
    FechaActualiza: string;
    FechaRegistro: string;
    Id: number;
    Insumo: string;
    UnidadMedida: string;
    UsuarioActualiza: string;
    InsumosUP: string;
}