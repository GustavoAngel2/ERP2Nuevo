export interface insertCompraModel{
    id: number;
    idProveedor: number;
    idSucursal: number;
    idComprador: number;
    usuarioActualiza: number;
}

export interface updateCompraModel{
    id: number;
    idProveedor: number;
    FechaLegada: string;
    idSucursal: number;
    idComprador: number;
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