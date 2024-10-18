export interface bancos {
    Id: number;
    nombre: string;
    Descripcion: string;
    UsuarioActualiza: String;
  }

  export interface insertBancosModel{
    nombre: string;
    Descripcion: string;
    UsuarioActualiza: String;
  }

  export interface updateBancosModel{
    Id:number;
    nombre: string;
    Descripcion: string;
    UsuarioActualiza: number;
  }

   export interface deleteBancosModel{
     Id: number;
   }
  