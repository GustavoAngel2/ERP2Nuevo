export interface getProveedoresModel{
    Id:number;
    Nombre:string;
    Direccion:string;
    Telefono:string;
    IdBanco:number;
    PlazoPago:number
    Correo:string;
    RFC:string;
    RazonSocial:string;
    CLABE:string;
    FechaRegistro:string;
    FechaActualiza:string;
    UsuarioActualiza:string;
}

export interface insertProveedorModel {
    nombre: string;
    direccion: string;
    telefono: string;
    idBanco: number;
    plazoPago: number;
    correo: string;
    rfc: string;
    razonSocial: string;
    clabe: string;
    usuarioActualiza: number;
}

export interface updateProveedorModel {
    id: number;
    nombre: string;
    direccion: string;
    telefono: string;
    idBanco: number;
    plazoPago: number;
    correo: string;
    rfc: string;
    razonSocial: string;
    clabe: string;
    usuarioActualiza: number;
}