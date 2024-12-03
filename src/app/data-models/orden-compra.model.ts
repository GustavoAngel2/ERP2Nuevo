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
    fechaLlegada: string;
    idSucursal: number;
    idComprador: number;
    usuarioActualiza: number;
}

export interface OrdenCompraModel {
    Id: number;
    IdProveedor: number;
    FechaLegada: string;
    IdSucursal: number;
    IdComprador: number;
    Estatus: number;
    Fecha: Date;
    Total: number;
}