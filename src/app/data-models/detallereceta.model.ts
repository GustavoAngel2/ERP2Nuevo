export interface insertDetRecetaModel{
    IdReceta: number ;
    Insumo: string;
    cantidad:number;
    usuarioActualiza: number;
}

export interface updateDetRecetasModel{
    id: number;
    nombre: string;
    usuarioActualiza: number;
}

export interface recetaDetModel{
    Id: number;
    IdReceta: number;
    Insumo: string;
    Descripcion: string;
    Cantidad: number
    FechaReg: string;
    FechaAct: string;
    UsuarioAct: string;
}