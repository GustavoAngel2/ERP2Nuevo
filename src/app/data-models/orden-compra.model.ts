export interface insertCompraModel{
    id: number;
    idProveedor: number;
    idSucursal: number;
    idComprador: number;
    fechaLlegada: string;
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
    FechaLegada: Date;
    idSucursal: number;
    idComprador: number;
    Fecha: Date;
    Total: number;
}