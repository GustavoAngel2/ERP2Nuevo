export interface bancos {
    Id: number;
    nombre: string;
    Direccion: string;
    UsuarioActualiza: String;
  }

  export interface insertbancosModel{
    nombre: string;
    Direccion: string;
    UsuarioActualiza: number;
  }

  export interface updatebancosModel{
    Id:number;
    nombre: string;
    Direccion: string;
    UsuarioActualiza: number;
  }

   export interface deletebancosModel{
     Id: number;
   }
  