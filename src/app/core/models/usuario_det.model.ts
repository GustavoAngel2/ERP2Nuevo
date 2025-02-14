export interface DeleteDetalleUsuariosModel{
    Id:number;
}

export interface GetDetalleUsuariosModel
{
    Id:number;
    Usuario:String;
    Modulo: String;
    Categoria:string;
    SOLO_SUCURSAL:string;
    REGISTROS_PROPIOS:string;
    SOLO_LECTURAio:string;
    FechaRegistro:string;
    Estado:string;
    UsuarioActualiza:string;
}

export interface UpdateDetalleUsuariosModel
{
    Id:number;
    IDUSUARIO:number;
    IDMODULO: number;
    IDCATEGORIA:number;
    SOLOSUCURSAL:number;
    REGISTROS_PROPIOS:number;
    SOLOLECTURA:number;
    ACTIVO:number;
}

export interface InsertDetalleUsuariosModel
{
    IdUsuario:number;
    IdModulo:number;
    IdCategoria: number;
    SoloSucursal:number;
    RegistrosPropios:number;
    SoloLectura:number;
    UsuarioActualiza:number;
}