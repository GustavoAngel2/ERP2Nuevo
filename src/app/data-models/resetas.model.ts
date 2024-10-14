export interface insertRecetaModel{
    nombre: string;
    usuarioRegistra: number;
    usuarioActualiza: number;
}

export interface updateRecetasModel{
    id: number;
    nombre: string;
    usuarioActualiza: number;
}

export interface recetaModel{
    Id: number;
    Nombre: string;
    FechaCreacion: string;
    FechaActualiza: string;
    Estatus: number;
    UsuarioRegistra: string;
    UsuarioActualiza: string;
}