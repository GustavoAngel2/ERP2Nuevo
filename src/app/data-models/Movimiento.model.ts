export interface MovModel {
    Id: number;
    NombreAlmacen: string;
    TipoMovimiento: string;
    FechaCreacion: Date;
    FechaAutorizacion: Date;
    UsuarioRegistra:string;
    UsuarioAutoriza: string;
    UsuarioActualiza: string;
    FechaActualiza: Date;
  }

  export interface insertMovModel{
    idAlmacen: number;
    tipoMovimiento: number;
    usuarioRegistra: number;
    usuarioAutoriza: number;
    usuarioActualiza: number;
  }

  export interface updateMovModel{
    id:number;
    idAlmacen: number;
    tipoMovimiento: number;
    usuarioRegistra: number;
    usuarioAutoriza: number;
    usuarioActualiza: number;
    estatus: number;
  }
  