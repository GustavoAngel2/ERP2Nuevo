export interface    entradasInsert{
    idProveedor: number;
    factura: string;
    idSurcursal: number;
    usuarioActualiza: number;
  }

  export interface entradasUpdate{
    id : number;
    idProveedor: string;
    factura: string;
    idSurcursal: number;
    fechaEntrega: Date;
    usuarioActualiza: number;
    fechaActualiza: Date;
  }

  export interface entradas{
    Estatus: number;
    Factura: number;
    FechaActualiza: Date;
    FechaEntrega: Date;
     FechaRegistro: Date;
     Id: number;
     Mensaje: string;
     nullProveedor: string;
     Surcursal: string;
     UsuarioActualiza: string
  }