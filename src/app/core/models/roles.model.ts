export interface roles {
  Id: number;
  Rol: string;
  Descripcion: string;
  FechaRegistro: string;
  FechaActualiza: string;
  UsuarioActualiza: string;
}

export interface insertRol{
  rol: string;
  descripcion: string;
  usuarioActualiza: number;
}

export interface updateRol{
  id:number;
  rol: string;
  descripcion: string;
  usuarioActualiza: number;
}