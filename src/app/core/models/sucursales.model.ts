export interface sucursalUpdateModel{
    id: number;
    nombre: string;
    direccion: string;
    usuarioAct: number;
    abreviatura: string;
}

export interface sucursalInsertModel{
    nombre: string;
    direccion: string;
    usuarioReg: number;
    usuarioAct: number;
    abreviatura: string;
}

export interface sucursalModel{
    Direccion: string;
    FechaAct: string;
    FechaReg: string;
    Id: number;
    Nombre: string;
    UsuarioReg: string;
    UsuarioAct: string;
    Abreviatura: string;
}