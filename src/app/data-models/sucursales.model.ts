export interface sucursalUpdateModel{
    id: number;
    nombre: string;
    direccion: string;
    idUsuario: number;
}

export interface sucursalInsertModel{
    nombre: string;
    direccion: string;
    idUsuario: number;
}

export interface sucursalModel{
    Direccion: string;
    FechaAct: string;
    FechaReg: string;
    Id: number;
    Nombre: string;
    Usuario: string;
}