export interface detalleTraspasoModel {
    Id: number;
    IdTraspaso: number;
    Insumo: number;
    CantidadEnviada: number;
    CatidadRecibida: number;
    FechaRegistro: string;
    FechaActualiza: string;
    UsuarioActualiza: string;
}

export interface insertDetalleTraspasoModel {
    idTraspaso: number;
    insumo: string;
    cantidadEnviada: number;
    usuarioActualiza: number;
}

export interface updateDetalleTraspasoModel {
  id: number;
  insumo: string,
  cantidadEnviada: number;
  cantidadRecibida: number;
  usuarioActualiza: number;
}
