export interface traspasoModel {
    Id: number;
    AlmacenOrigen: string;
    AlmacenDestino: string;
    FechaRegistro: string;
    FechaRecibido: string;
    FechaActualiza: string;
    UsuarioEnvia: string;
    UsuarioRecibe: string;
    UsuarioActualiza: string;
}

export interface getTraspasosModel{
    pAlmacenOrigen: number;
    pAlmacenDestino: number;
    pFechaInicio:string;
    pFechaFinal:string;
}

export interface insertTraspasoModel{
    idAlmacenOrigen: number;
    idAlmacenDestino: number;
    usuarioEnvia: number;
    usuarioActualiza: number;
}