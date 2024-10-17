export interface insertCompraModel{
    id: number;
    idProveedor: number;
    FechaLegada: Date;
    idSucursal: number;
    idComprador: number;
    Fecha: Date;
    Total: number;
}

export interface updateCompraModel{
    id: number;
    idProveedor: number;
    FechaLegada: Date;
    idSucursal: number;
    idComprador: number;
    Fecha: Date;
    Total: number;
    usuarioActualiza: number;
}

export interface OrdenCompraModel {
    id: number;
    idProveedor: number;
    FechaLlegada: string;
    idSucursal: number;
    idComprador: number;
    FechaRegistro: string;
    UsuarioActualiza: string;
    Total: number;
}